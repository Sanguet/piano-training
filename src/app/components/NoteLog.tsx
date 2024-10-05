import React from "react";

interface NoteLogProps {
  log: string[];
}

const NoteLog: React.FC<NoteLogProps> = ({ log }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-2">Registro de Notas</h2>
      <ul className="bg-gray-100 p-4 rounded-lg max-h-60 overflow-y-auto">
        {log.map((entry, index) => (
          <li key={index} className="mb-1">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteLog;
