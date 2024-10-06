import React, { useEffect, useCallback, useRef, useState } from "react";
import * as Tone from "tone";

interface PianoProps {
  activeNotes: number[];
  onNotesChange: (notes: number[], isNoteOn: boolean) => void;
}

const Piano: React.FC<PianoProps> = ({ activeNotes, onNotesChange }) => {
  const keys = Array.from({ length: 88 }, (_, i) => i + 21);
  const activeNotesRef = useRef<Set<number>>(new Set());
  const synthRef = useRef<Tone.Synth | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioEnabledRef = useRef(false);

  const initializeAudio = async () => {
    try {
      await Tone.start();
      console.log("Tone.js iniciado");
      synthRef.current = new Tone.Synth().toDestination();
      console.log("Sintetizador creado");
    } catch (error) {
      console.error("Error al inicializar el audio:", error);
    }
  };

  const toggleAudio = async () => {
    if (audioEnabled) {
      setAudioEnabled(false);
      audioEnabledRef.current = false;
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = null;
      }
      console.log("Audio desactivado");
    } else {
      await initializeAudio();
      setAudioEnabled(true);
      audioEnabledRef.current = true;
      console.log("Audio activado");
    }
  };

  const isBlackKey = (note: number) => {
    const noteInOctave = note % 12;
    return [1, 3, 6, 8, 10].includes(noteInOctave);
  };

  const getNoteName = (note: number) => {
    return Tone.Frequency(note, "midi").toNote();
  };

  const playNote = useCallback((note: number) => {
    console.log("Estado actual de audioEnabled:", audioEnabledRef.current);
    if (synthRef.current && audioEnabledRef.current) {
      console.log("Intentando reproducir nota:", note);
      const frequency = Tone.Frequency(note, "midi").toFrequency();
      synthRef.current.triggerAttackRelease(frequency, "8n");
      console.log("Nota reproducida:", note);
    } else {
      console.log(
        "No se puede reproducir la nota. Audio habilitado:",
        audioEnabledRef.current
      );
    }
  }, []);

  const handleNoteOn = useCallback(
    (note: number) => {
      if (!activeNotesRef.current.has(note)) {
        activeNotesRef.current.add(note);
        onNotesChange(Array.from(activeNotesRef.current), true);
        playNote(note);
      }
    },
    [onNotesChange, playNote]
  );

  const handleNoteOff = useCallback(
    (note: number) => {
      if (activeNotesRef.current.has(note)) {
        activeNotesRef.current.delete(note);
        onNotesChange(Array.from(activeNotesRef.current), false);
      }
    },
    [onNotesChange]
  );

  useEffect(() => {
    const handleMIDIMessage = (event: WebMidi.MIDIMessageEvent) => {
      const [status, note, velocity] = Array.from(event.data);
      const isNoteOn = (status & 0xf0) === 0x90;
      const isNoteOff =
        (status & 0xf0) === 0x80 || (isNoteOn && velocity === 0);

      if (isNoteOn && velocity > 0) {
        handleNoteOn(note);
      } else if (isNoteOff) {
        handleNoteOff(note);
      }
    };

    const setupMIDI = async () => {
      try {
        const access = await navigator.requestMIDIAccess();
        access.inputs.forEach((input) => {
          input.onmidimessage = handleMIDIMessage;
        });
        console.log("MIDI configurado correctamente");
      } catch (err) {
        console.error("No se pudo acceder al MIDI:", err);
      }
    };

    setupMIDI();
  }, [handleNoteOn, handleNoteOff]);

  return (
    <div className="piano-container overflow-x-auto p-4 bg-gray-100 rounded-lg shadow-inner">
      <button
        onClick={toggleAudio}
        className={`mb-4 px-4 py-2 rounded transition-colors ${
          audioEnabled
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {audioEnabled ? "Desactivar Audio" : "Activar Audio"}
      </button>
      <div className="piano flex relative" style={{ width: "fit-content" }}>
        {keys.map((note) => (
          <div
            key={note}
            className={`
              ${isBlackKey(note) ? "black-key" : "white-key"}
              ${activeNotes.includes(note) ? "active" : ""}
              relative transition-all duration-100 ease-in-out cursor-pointer
            `}
            onMouseDown={() => handleNoteOn(note)}
            onMouseUp={() => handleNoteOff(note)}
            onMouseLeave={() => handleNoteOff(note)}
          >
            <span className="absolute bottom-1 left-1 text-[8px] text-gray-600">
              {getNoteName(note)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Piano;
