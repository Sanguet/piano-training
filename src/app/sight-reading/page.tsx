import React from "react";
import Image from "next/image";

const SightReading: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Lectura de Partituras</h1>
      <p className="mb-6">
        Practica tu lectura a primera vista con este ejercicio de acordes y
        melodía.
      </p>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Image
          src="/images/sight-reading-example.png"
          alt="Ejemplo de lectura a primera vista"
          width={800}
          height={200}
          layout="responsive"
        />
      </div>
      <p className="mt-4">
        Intenta tocar esta secuencia de acordes y melodía. Recuerda mantener un
        tempo constante y prestar atención a las dinámicas.
      </p>
    </div>
  );
};

export default SightReading;
