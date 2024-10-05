import React from "react";
import Image from "next/image";

const HappyBirthday: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Happy Birthday</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Image
          src="/images/happy-birthday-score.png"
          alt="Partitura de Happy Birthday"
          width={800}
          height={600}
          layout="responsive"
        />
      </div>
      <p className="mt-4">
        Esta es la partitura de "Happy Birthday". Practica tocando esta melodía
        simple pero icónica. Presta atención al ritmo y a las notas repetidas.
      </p>
    </div>
  );
};

export default HappyBirthday;
