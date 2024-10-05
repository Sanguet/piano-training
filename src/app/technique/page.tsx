import React from "react";

const Technique: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Práctica de Técnica</h1>
      <p className="mb-6">
        La técnica es fundamental para desarrollar tu habilidad en el piano.
        Aquí encontrarás ejercicios para mejorar tu destreza, fuerza y control.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Próximamente</h2>
      <ul className="list-disc pl-5">
        <li>Ejercicios de Hanon</li>
        <li>Práctica de arpegios</li>
        <li>Ejercicios de independencia de dedos</li>
        <li>Técnicas de pedal</li>
      </ul>
      <p className="mt-6">
        Estamos trabajando para traerte una serie de ejercicios interactivos que
        te ayudarán a mejorar tu técnica pianística. ¡Vuelve pronto para ver las
        actualizaciones!
      </p>
    </div>
  );
};

export default Technique;
