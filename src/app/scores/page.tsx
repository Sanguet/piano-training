"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { FileMusic, Upload } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import OpenSheetMusicDisplay from "@/app/components/OpenSheetMusicDisplay";
import ScoreCard from "@/app/components/ScoreCard";

const Scores: React.FC = () => {
  const [uploadedScore, setUploadedScore] = useState<File | null>(null);
  const [scoreUrl, setScoreUrl] = useState<string | null>(null);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.name.endsWith(".musicxml")) {
        setUploadedScore(file);
        const url = URL.createObjectURL(file);
        setScoreUrl(url);
      } else {
        alert("Por favor, sube un archivo .musicxml válido.");
      }
    },
    []
  );

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
            <Upload className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-semibold">Cargar Partitura</h2>
          </div>
          <p className="mb-4">
            Sube tu propia partitura en formato .musicxml para practicar.
          </p>
          <Input
            type="file"
            accept=".musicxml"
            onChange={handleFileUpload}
            className="mb-4"
          />
          {scoreUrl && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Partitura Cargada: {uploadedScore?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <OpenSheetMusicDisplay file={scoreUrl} />
              </CardContent>
            </Card>
          )}
        </div>

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

export default Scores;
