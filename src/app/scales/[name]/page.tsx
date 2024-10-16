"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ArrowLeft, Music, AlertTriangle } from "lucide-react";
import OpenSheetMusicDisplay from "@/app/components/OpenSheetMusicDisplay";

const getScaleFileName = (name: string): string => {
  const normalizedName = name
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/♯/g, "sharp")
    .replace(/♭/g, "flat")
    .replace("mayor", "major")
    .replace("menor", "minor");

  // Mapeo específico para algunas escalas
  const scaleMap: { [key: string]: string } = {
    do_major: "c_major",
    re_major: "d_major",
    mi_major: "e_major",
    fa_major: "f_major",
    sol_major: "g_major",
    la_major: "a_major",
    si_major: "b_major",
    la_minor: "a_minor",
    si_minor: "b_minor",
    do_minor: "c_minor",
    re_minor: "d_minor",
    mi_minor: "e_minor",
    fa_minor: "f_minor",
    sol_minor: "g_minor",
  };

  return scaleMap[normalizedName] || normalizedName;
};

export default function ScaleDetail({ params }: { params: { name: string } }) {
  const [fileExists, setFileExists] = useState(true);

  const scaleName = decodeURIComponent(params.name);
  const scaleFileName = getScaleFileName(scaleName);
  const filePath = `/scales/${scaleFileName}_scale.musicxml`;

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
          Escala: {scaleName}
        </h1>

        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-bold">
              <Music className="w-6 h-6 text-blue-500 mr-2" />
              {scaleName}
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
