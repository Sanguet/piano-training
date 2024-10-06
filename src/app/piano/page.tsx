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
  setMasterVolume,
  initializeAudio,
} from "../utils/audio";

const PianoPage: React.FC = () => {
  const [activeNotes, setActiveNotes] = useState<number[]>([]);
  const [volume, setVolume] = useState<number>(0.5);
  const [audioInitialized, setAudioInitialized] = useState<boolean>(false);
  const [noteLog, setNoteLog] = useState<string[]>([]); // Reintroducimos noteLog
  const initializingRef = useRef<boolean>(false);
  const audioInitializedRef = useRef<boolean>(false);

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
    const initializeMIDI = async () => {
      try {
        await navigator.requestMIDIAccess();
        // Removed unused midiInputs setup
      } catch (err) {
        console.error("No se pudo acceder al MIDI:", err);
      }
    };

    initializeMIDI();
  }, []);

  const handleNoteOn = useCallback((note: number) => {
    setActiveNotes((prev) => [...prev, note]);
    setNoteLog((prev) => [`Nota ${note} presionada`, ...prev.slice(0, 9)]); // Actualizamos noteLog
  }, []);

  const handleNoteOff = useCallback((note: number) => {
    setActiveNotes((prev) => prev.filter((n) => n !== note));
    setNoteLog((prev) => [`Nota ${note} liberada`, ...prev.slice(0, 9)]); // Actualizamos noteLog
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
