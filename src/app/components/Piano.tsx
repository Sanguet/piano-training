import React, { useEffect, useCallback, useRef } from "react";
import * as Tone from "tone";

interface PianoProps {
  activeNotes: number[];
  onNotesChange: (notes: number[], isNoteOn: boolean) => void;
}

const Piano: React.FC<PianoProps> = ({ activeNotes, onNotesChange }) => {
  const keys = Array.from({ length: 88 }, (_, i) => i + 21);
  const activeNotesRef = useRef<Set<number>>(new Set());

  const isBlackKey = (note: number) => {
    const noteInOctave = note % 12;
    return [1, 3, 6, 8, 10].includes(noteInOctave);
  };

  const getNoteName = (note: number) => {
    return Tone.Frequency(note, "midi").toNote();
  };

  const handleNoteOn = useCallback(
    (note: number) => {
      if (!activeNotesRef.current.has(note)) {
        activeNotesRef.current.add(note);
        onNotesChange(Array.from(activeNotesRef.current), true);
      }
    },
    [onNotesChange]
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
      } catch (err) {
        console.error("No se pudo acceder al MIDI:", err);
      }
    };

    setupMIDI();
  }, [handleNoteOn, handleNoteOff]);

  return (
    <div className="piano-container overflow-x-auto p-4 bg-gray-100 rounded-lg shadow-inner">
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
