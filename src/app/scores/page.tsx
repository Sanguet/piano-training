import React from "react";
import Link from "next/link";
import { FileMusic } from "lucide-react";
import { Button } from "../components/ui/button";

const Scores: React.FC = () => {
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
          Partituras para Practicar
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FileMusic className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-semibold">Selección de Partituras</h2>
          </div>
          <p className="mb-6">
            Aquí encontrarás una selección de partituras populares para
            practicar. Haz clic en una partitura para verla en detalle.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScoreCard
              title="Happy Birthday"
              difficulty="Fácil"
              link="/scores/happy-birthday"
            />
            {/* Agrega más ScoreCards aquí para otras partituras */}
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

const ScoreCard: React.FC<{
  title: string;
  difficulty: string;
  link: string;
}> = ({ title, difficulty, link }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">Dificultad: {difficulty}</p>
      <Link href={link}>
        <Button variant="outline" className="w-full">
          Ver Partitura
        </Button>
      </Link>
    </div>
  </div>
);

export default Scores;
