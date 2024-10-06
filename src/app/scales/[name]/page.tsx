"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Slider } from "@/app/components/ui/slider";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Play,
  Pause,
  Volume2,
  ArrowLeft,
  Music,
  AlertTriangle,
} from "lucide-react";
import OpenSheetMusicDisplay from "@/app/components/OpenSheetMusicDisplay";

export default function ScaleDetail({ params }: { params: { name: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(60);
  const [volume, setVolume] = useState(50);
  const [fileExists, setFileExists] = useState(true);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const scaleName = decodeURIComponent(params.name);

  // Siempre usamos g_major_scale.musicxml para depuración
  const filePath = `/scales/g_major_scale.musicxml`;

  useEffect(() => {
    const checkFileExists = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setFileExists(true);
      } catch (error) {
        console.error(`Error loading scale file: ${filePath}`, error);
        setFileExists(false);
      }
    };

    checkFileExists();
  }, [filePath]);

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
                href="/scales"
                className="text-gray-600 hover:text-blue-500"
              >
                Escalas
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Link
          href="/scales"
          className="flex items-center text-blue-600 hover:underline mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la lista de escalas
        </Link>

        <h1 className="text-4xl font-bold text-center mb-8">
          Escala: {scaleName} (Mostrando Sol Mayor para depuración)
        </h1>

        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-bold">
              <Music className="w-6 h-6 text-blue-500 mr-2" />
              {scaleName} (Sol Mayor)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {fileExists ? (
              <OpenSheetMusicDisplay file={filePath} />
            ) : (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                <p>
                  Lo sentimos, no se pudo cargar la partitura para esta escala.
                  Por favor, inténtelo de nuevo más tarde o contacte con soporte
                  si el problema persiste.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 bg-white p-4 rounded-lg shadow">
              <Button
                onClick={togglePlay}
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
                disabled={!fileExists}
              >
                {isPlaying ? (
                  <Pause className="mr-2 h-4 w-4" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                {isPlaying ? "Pausar" : "Reproducir"}
              </Button>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-sm w-24">Tempo: {tempo} BPM</span>
                <Slider
                  value={[tempo]}
                  onValueChange={(value: number[]) => setTempo(value[0])}
                  max={120}
                  min={40}
                  step={1}
                  className="w-[150px]"
                  disabled={!fileExists}
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Volume2 className="h-4 w-4 text-gray-600" />
                <Slider
                  value={[volume]}
                  onValueChange={(value: number[]) => setVolume(value[0])}
                  max={100}
                  min={0}
                  step={1}
                  className="w-[150px]"
                  disabled={!fileExists}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 PianoMaestro. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}