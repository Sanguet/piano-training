import React from "react";

interface NoteLogProps {
  log: { id: number; text: string }[];
}

const NoteLog: React.FC<NoteLogProps> = ({ log }) => {
  return (
    <div className="max-h-60 overflow-y-auto">
      {log.map(({ id, text }) => (
        <div key={id} className="mb-2 text-sm">
          <span className="font-semibold mr-2">{id}.</span>
          {text}
        </div>
      ))}
    </div>
  );
};

export default NoteLog;
