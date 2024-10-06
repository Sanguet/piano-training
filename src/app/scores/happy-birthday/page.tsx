"use client";

import React from "react";
import Link from "next/link";
import { FileMusic, ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import OpenSheetMusicDisplay from "@/app/components/OpenSheetMusicDisplay";

const HappyBirthdayScore: React.FC = () => {
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
              <Link
                href="/scores"
                className="text-gray-600 hover:text-blue-500"
              >
                Partituras
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Link
          href="/scores"
          className="flex items-center text-blue-600 hover:underline mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la lista de partituras
        </Link>

        <h1 className="text-4xl font-bold text-center mb-8">Happy Birthday</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FileMusic className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-semibold">Partitura</h2>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-4">
            <OpenSheetMusicDisplay file="/scores/happy_birthday.musicxml" />
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">
              Información de la partitura
            </h3>
            <p>
              <strong>Dificultad:</strong> Fácil
            </p>
            <p>
              <strong>Compás:</strong> 3/4
            </p>
            <p>
              <strong>Tonalidad:</strong> Do Mayor
            </p>
          </div>
          <div className="mt-6">
            <Button>Iniciar Práctica</Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Consejos de práctica</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Comienza practicando lentamente y aumenta gradualmente el tempo.
            </li>
            <li>
              Presta atención a las notas ligadas en los compases 3-4 y 7-8.
            </li>
            <li>
              Asegúrate de mantener un ritmo constante en el acompañamiento de
              la mano izquierda.
            </li>
            <li>Practica las manos por separado antes de juntarlas.</li>
          </ul>
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

export default HappyBirthdayScore;
