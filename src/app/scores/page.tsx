import React from "react";
import Link from "next/link";

const Scores: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Partituras para Practicar</h1>
      <p className="mb-6">
        Aquí encontrarás una selección de partituras populares para practicar.
        Haz clic en una partitura para verla en detalle.
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
  );
};

const ScoreCard: React.FC<{
  title: string;
  difficulty: string;
  link: string;
}> = ({ title, difficulty, link }) => (
  <Link
    href={link}
    className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p>Dificultad: {difficulty}</p>
  </Link>
);

export default Scores;
