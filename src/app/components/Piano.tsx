import React from "react";
import * as Tone from "tone";

interface PianoProps {
  activeNotes: number[];
  onNoteOn: (note: number, velocity: number) => void;
  onNoteOff: (note: number) => void;
  isAudioInitialized: boolean;
}

const Piano: React.FC<PianoProps> = ({
  activeNotes,
  onNoteOn,
  onNoteOff,
  isAudioInitialized,
}) => {
  const keys = Array.from({ length: 88 }, (_, i) => i + 21); // 88 keys, starting from A0 (MIDI note 21)

  const isBlackKey = (note: number) => {
    const noteInOctave = note % 12;
    return [1, 3, 6, 8, 10].includes(noteInOctave);
  };

  const getNoteName = (note: number) => {
    return Tone.Frequency(note, "midi").toNote();
  };

  const handleNoteOn = (note: number) => {
    if (isAudioInitialized) {
      onNoteOn(note, 1);
    } else {
      console.warn("Audio not initialized yet. Please wait.");
    }
  };

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
              ${!isAudioInitialized ? "opacity-50" : ""}
            `}
            onMouseDown={() => handleNoteOn(note)}
            onMouseUp={() => onNoteOff(note)}
            onMouseLeave={() => onNoteOff(note)}
            onTouchStart={(e) => {
              e.preventDefault();
              handleNoteOn(note);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              onNoteOff(note);
            }}
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
