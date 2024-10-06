import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "../components/ui/button";

const SightReading: React.FC = () => {
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
          Lectura de Partituras
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-semibold">
              Práctica de Lectura a Primera Vista
            </h2>
          </div>
          <p className="mb-6">
            Practica tu lectura a primera vista con este ejercicio de acordes y
            melodía.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <Image
              src="/images/sight-reading-example.png"
              alt="Ejemplo de lectura a primera vista"
              width={800}
              height={200}
              layout="responsive"
            />
          </div>
          <p className="mt-4">
            Intenta tocar esta secuencia de acordes y melodía. Recuerda mantener
            un tempo constante y prestar atención a las dinámicas.
          </p>
          <div className="mt-6">
            <Button>Iniciar Práctica</Button>
          </div>
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

export default SightReading;
