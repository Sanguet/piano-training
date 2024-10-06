"use client";

import React from "react";
import Link from "next/link";
import { Music, BookOpen } from "lucide-react";
import OpenSheetMusicDisplay from "../components/OpenSheetMusicDisplay";

const ScalesPage: React.FC = () => {
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
        <h1 className="text-4xl font-bold text-center mb-8">
          Práctica de Escalas
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Music className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-semibold">Niveles de Dificultad</h2>
          </div>
          <ul className="list-disc pl-5 mb-6">
            <li>Principiante: Do mayor, La menor</li>
            <li>Intermedio: Sol mayor, Mi menor, Fa mayor, Re menor</li>
            <li>Avanzado: Re mayor, Si menor, Si♭ mayor, Sol menor</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-semibold">Escala de Do Mayor</h2>
          </div>
          <OpenSheetMusicDisplay file="/scales/c_major_scale.musicxml" />
          <p className="mt-4">
            Practica esta escala ascendente y descendente. Asegúrate de mantener
            una digitación consistente y un tempo estable.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-semibold">Escala de Sol Mayor</h2>
          </div>
          <OpenSheetMusicDisplay file="/scales/g_major_scale.musicxml" />
          <p className="mt-4">
            Esta escala tiene un sostenido (F♯). Practica la transición suave
            entre F♯ y G, manteniendo un ritmo constante.
          </p>
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

export default ScalesPage;