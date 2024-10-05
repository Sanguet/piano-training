"use client"; // Añadimos esta directiva al inicio del archivo

import React from "react";
import Head from "next/head";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Entrenamiento de Piano con MIDI</title>
        <meta
          name="description"
          content="Mejora tus habilidades de piano con nuestro entrenador MIDI"
        />
      </Head>

      <main className="py-8">
        <h1 className="text-4xl font-bold mb-6">
          Entrenamiento de Piano con MIDI
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Bienvenido</h2>
          <p className="mb-4">
            Esta aplicación te ayudará a mejorar tus habilidades de piano
            utilizando tecnología MIDI.
          </p>
          <Link href="/piano" className="text-blue-500 hover:underline">
            Ir al Piano Virtual
          </Link>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Características</h2>
          <ul className="list-disc pl-5">
            <li>Piano virtual interactivo</li>
            <li>Soporte para teclados MIDI</li>
            <li>Lecciones y ejercicios (próximamente)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Próximamente</h2>
          <ul className="list-disc pl-5">
            <li>Lecciones interactivas</li>
            <li>Ejercicios de técnica</li>
            <li>Seguimiento de progreso</li>
          </ul>
        </section>
      </main>

      <footer className="py-4 text-center">
        <p>
          &copy; 2024 Entrenamiento de Piano con MIDI. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default Home;
