"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import * as Tone from "tone";
import { Music, VolumeX, Volume2 } from "lucide-react";
import Piano from "../components/Piano";
import VolumeControl from "../components/VolumeControl";
import NoteLog from "../components/NoteLog";
import { Button } from "../components/ui/button";
import {
  loadPianoSample,
  playNote,
  setMasterVolume,
  initializeAudio,
} from "../utils/audio";

const PianoPage: React.FC = () => {
  const [activeNotes, setActiveNotes] = useState<number[]>([]);
  const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess | null>(null);
  const [volume, setVolume] = useState<number>(0.5);
  const [audioInitialized, setAudioInitialized] = useState<boolean>(false);
  const [noteLog, setNoteLog] = useState<string[]>([]);
  const initializingRef = useRef<boolean>(false);
  const audioInitializedRef = useRef<boolean>(false);
  const activeNotesRef = useRef<Set<number>>(new Set());
  const lastNoteTimeRef = useRef<{ [key: number]: number }>({});

  const initAudio = useCallback(async () => {
    if (!audioInitializedRef.current && !initializingRef.current) {
      initializingRef.current = true;
      try {
        await Tone.start();
        await initializeAudio();
        const sampleLoaded = await loadPianoSample();
        if (sampleLoaded) {
          setMasterVolume(volume);
          setAudioInitialized(true);
          audioInitializedRef.current = true;
          console.log("Audio initialized successfully");
        } else {
          throw new Error("Failed to load piano sample");
        }
      } catch (error) {
        console.error("Error initializing audio:", error);
        setAudioInitialized(false);
        audioInitializedRef.current = false;
      } finally {
        initializingRef.current = false;
      }
    }
  }, [volume]);

  useEffect(() => {
    const setup = async () => {
      await initAudio();
      const requestMIDIAccess = async () => {
        try {
          const access = await navigator.requestMIDIAccess();
          setMidiAccess(access);
          setupMIDIListeners(access);
        } catch (error) {
          console.error("No se pudo acceder al MIDI:", error);
        }
      };
      requestMIDIAccess();
    };
    setup();
  }, [initAudio]);

  useEffect(() => {
    if (audioInitialized) {
      setMasterVolume(volume);
    }
  }, [volume, audioInitialized]);

  const setupMIDIListeners = (midiAccess: WebMidi.MIDIAccess) => {
    midiAccess.inputs.forEach((input) => {
      input.onmidimessage = handleMIDIMessage;
    });
  };

  const handleMIDIMessage = useCallback((message: WebMidi.MIDIMessageEvent) => {
    const [status, note, velocity] = message.data;
    const now = performance.now();
    if (status === 144 && velocity > 0) {
      // Nota presionada
      if (
        !activeNotesRef.current.has(note) &&
        now - (lastNoteTimeRef.current[note] || 0) > 50
      ) {
        handleNoteOn(note, velocity / 127);
        lastNoteTimeRef.current[note] = now;
      }
    } else if (status === 128 || (status === 144 && velocity === 0)) {
      // Nota liberada
      handleNoteOff(note);
    }
  }, []);

  const handleNoteOn = useCallback(
    async (note: number, velocity: number = 1) => {
      if (!audioInitializedRef.current) {
        await initAudio();
      }
      if (!activeNotesRef.current.has(note)) {
        activeNotesRef.current.add(note);
        setActiveNotes(Array.from(activeNotesRef.current));
        logNoteEvent([note]);
        try {
          playNote(note, velocity * volume);
        } catch (error) {
          console.error("Error playing note:", error);
        }
      }
    },
    [volume, initAudio]
  );

  const handleNoteOff = useCallback((note: number) => {
    activeNotesRef.current.delete(note);
    setActiveNotes(Array.from(activeNotesRef.current));
  }, []);

  const logNoteEvent = useCallback((notes: number[]) => {
    const noteNames = notes.map((note) => {
      const noteName = Tone.Frequency(note, "midi").toNote();
      return noteName;
    });
    const eventType = notes.length > 1 ? "Acorde" : "Nota individual";
    const logEntry = `${eventType}: ${noteNames.join(", ")}`;
    setNoteLog((prev) => [logEntry, ...prev].slice(0, 10));
  }, []);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, []);

  const handleUserInteraction = useCallback(async () => {
    if (!audioInitializedRef.current) {
      await initAudio();
    }
  }, [initAudio]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-500">
              PianoMaestro
            </Link>
            <div className="space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-500">
                Inicio
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Piano Virtual</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Music className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-semibold">Teclado</h2>
            </div>
            <div className="flex items-center">
              <VolumeX className="w-5 h-5 text-gray-400 mr-2" />
              <VolumeControl volume={volume} setVolume={handleVolumeChange} />
              <Volume2 className="w-5 h-5 text-gray-400 ml-2" />
            </div>
          </div>

          <Piano
            activeNotes={activeNotes}
            onNoteOn={handleNoteOn}
            onNoteOff={handleNoteOff}
            isAudioInitialized={audioInitialized}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Registro de Notas</h2>
          <NoteLog log={noteLog} />
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 PianoMaestro. Todos los derechos reservados.
        </div>
      </footer>

      {!audioInitialized && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">Haz clic para inicializar el audio</p>
            <Button onClick={handleUserInteraction}>Inicializar Audio</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PianoPage;
