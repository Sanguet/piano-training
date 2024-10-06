"use client";

import Link from "next/link";
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Aprende Escalas de Piano
      </h1>

      <Tabs defaultValue="major" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="major">Escalas Mayores</TabsTrigger>
          <TabsTrigger value="minor">Escalas Menores</TabsTrigger>
        </TabsList>

        {["major", "minor"].map((scaleType) => (
          <TabsContent key={scaleType} value={scaleType}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {Object.entries(
                scalesByLevel[scaleType as keyof typeof scalesByLevel]
              ).map(([level, scales]) => (
                <AccordionItem key={level} value={level}>
                  <AccordionTrigger>
                    <h2 className="text-xl font-semibold">{level}</h2>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardHeader>
                        <CardTitle>{level}</CardTitle>
                        <CardDescription>
                          Escalas{" "}
                          {scaleType === "major" ? "mayores" : "menores"} para
                          nivel {level.toLowerCase()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {scales.map((scale) => (
                            <li key={scale}>
                              <Link
                                href={`/scales/${encodeURIComponent(scale)}`}
                                className="text-blue-600 hover:underline"
                              >
                                {scale}
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
    </div>
  );
}