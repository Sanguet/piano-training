"use client";

import React from "react";
import Link from "next/link";
import { Music, BookOpen } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

const scalesByLevel = {
  major: {
    Principiante: ["Do mayor", "Sol mayor"],
    Intermedio: ["Re mayor", "La mayor", "Fa mayor"],
    Avanzado: ["Si♭ mayor", "Mi♭ mayor", "La♭ mayor"],
  },
  minor: {
    Principiante: ["La menor", "Mi menor"],
    Intermedio: ["Re menor", "Sol menor", "Do menor"],
    Avanzado: ["Fa♯ menor", "Si menor", "Fa menor"],
  },
};

export default function ScalesPage() {
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
          Práctica de Escalas
        </h1>

        <Tabs defaultValue="major" className="w-full">
          <TabsList className="flex w-full rounded-lg bg-gray-200 p-1">
            <TabsTrigger
              value="major"
              className="flex-1 rounded-md py-2 px-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-600 hover:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:scale-95"
            >
              Escalas Mayores
            </TabsTrigger>
            <TabsTrigger
              value="minor"
              className="flex-1 rounded-md py-2 px-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-600 hover:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:scale-95"
            >
              Escalas Menores
            </TabsTrigger>
          </TabsList>

          {["major", "minor"].map((scaleType) => (
            <TabsContent key={scaleType} value={scaleType}>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {Object.entries(
                  scalesByLevel[scaleType as keyof typeof scalesByLevel]
                ).map(([level, scales]) => (
                  <AccordionItem
                    key={level}
                    value={level}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <AccordionTrigger className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center w-full">
                        <Music className="w-6 h-6 text-blue-500 mr-3" />
                        <h2 className="text-xl font-semibold text-gray-800">
                          {level}
                        </h2>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-2 bg-gray-50">
                      <Card className="border-0 shadow-none">
                        <CardHeader className="pb-1 pt-2">
                          <CardDescription className="text-sm text-gray-600">
                            Escalas{" "}
                            {scaleType === "major" ? "mayores" : "menores"} para
                            este nivel
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-1">
                          <ul className="space-y-1">
                            {scales.map((scale) => (
                              <li
                                key={scale}
                                className="transition-colors hover:bg-gray-100 rounded-md"
                              >
                                <Link
                                  href={`/scales/${encodeURIComponent(scale)}`}
                                  className="text-blue-600 hover:text-blue-800 flex items-center p-1.5"
                                >
                                  <BookOpen className="w-4 h-4 mr-2" />
                                  <span className="text-sm">{scale}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 PianoMaestro. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}