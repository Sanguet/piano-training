import React from "react";
import Link from "next/link";
import { Music, BookOpen, Scale, Sliders } from "lucide-react";

const Technique: React.FC = () => {
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
        <h1 className="text-4xl font-bold text-center mb-12">
          Práctica de Técnica
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="mb-6">
            La técnica es fundamental para desarrollar tu habilidad en el piano.
            Aquí encontrarás ejercicios para mejorar tu destreza, fuerza y
            control.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Próximamente</h2>
          <ul className="list-disc pl-5">
            <li className="mb-2 flex items-center">
              <Music className="w-5 h-5 mr-2 text-blue-500" />
              Ejercicios de Hanon
            </li>
            <li className="mb-2 flex items-center">
              <Scale className="w-5 h-5 mr-2 text-blue-500" />
              Práctica de arpegios
            </li>
            <li className="mb-2 flex items-center">
              <Sliders className="w-5 h-5 mr-2 text-blue-500" />
              Ejercicios de independencia de dedos
            </li>
            <li className="mb-2 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
              Técnicas de pedal
            </li>
          </ul>
          <p className="mt-6">
            Estamos trabajando para traerte una serie de ejercicios interactivos
            que te ayudarán a mejorar tu técnica pianística. ¡Vuelve pronto para
            ver las actualizaciones!
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

export default Technique;
