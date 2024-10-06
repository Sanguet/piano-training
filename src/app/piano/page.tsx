"use client";

import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import * as Tone from "tone";
import { Music } from "lucide-react";
import Piano from "../components/Piano";
import NoteLog from "../components/NoteLog";

const PianoPage: React.FC = () => {
  const [activeNotes, setActiveNotes] = useState<number[]>([]);
  const [noteLog, setNoteLog] = useState<{ id: number; text: string }[]>([]);
  const logIdCounterRef = useRef<number>(0);

  const handleNotesChange = useCallback(
    (notes: number[], isNoteOn: boolean) => {
      setActiveNotes(notes);

      if (isNoteOn) {
        const notesNames = notes.map((n) => Tone.Frequency(n, "midi").toNote());
        const logEntry =
          notes.length > 1
            ? `Acorde: ${notesNames.join(", ")} presionado`
            : `Nota ${notesNames[notesNames.length - 1]} presionada`;

        setNoteLog((prevLog) => {
          logIdCounterRef.current += 1;
          const newId = Math.ceil(logIdCounterRef.current / 2);
          return [{ id: newId, text: logEntry }, ...prevLog.slice(0, 19)];
        });
      }
    },
    []
  );

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
          <div className="flex items-center mb-4">
            <Music className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-semibold">Teclado</h2>
          </div>

          <Piano activeNotes={activeNotes} onNotesChange={handleNotesChange} />
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
    </div>
  );
};

export default PianoPage;