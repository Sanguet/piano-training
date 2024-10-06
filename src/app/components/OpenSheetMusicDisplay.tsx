"use client";

import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import { Vex } from "vexflow";

interface OpenSheetMusicDisplayProps {
  file: string;
}

const OpenSheetMusicDisplay: React.FC<OpenSheetMusicDisplayProps> = ({
  file,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAndRenderScore = async () => {
      if (!divRef.current) {
        console.log("divRef.current is null, retrying in 100ms");
        setTimeout(loadAndRenderScore, 100);
        return;
      }

      try {
        console.log(`Loading file: ${file}`);
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xmlContent = await response.text();
        console.log("XML Content:", xmlContent.substring(0, 100) + "...");

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, "text/xml");

        // Limpiar el div antes de renderizar
        while (divRef.current.firstChild) {
          divRef.current.removeChild(divRef.current.firstChild);
        }

        const renderer = new Vex.Flow.Renderer(
          divRef.current,
          Vex.Flow.Renderer.Backends.SVG
        );
        renderer.resize(800, 600);
        const context = renderer.getContext();

        const measures = xmlDoc.getElementsByTagName("measure");
        const staveWidth = 200;
        let currentX = 10;
        let currentY = 40;
        let isNewLine = true;

        const timeSignature = xmlDoc.querySelector("time");
        const beats = timeSignature?.querySelector("beats")?.textContent || "4";
        const beatType =
          timeSignature?.querySelector("beat-type")?.textContent || "4";
        const timeSignatureString = `${beats}/${beatType}`;

        // Obtener la armadura
        const keySignature = xmlDoc.querySelector("key");
        const fifths = keySignature?.querySelector("fifths")?.textContent || "0";
        const keySignatureString = getKeySignature(parseInt(fifths));

        for (let i = 0; i < measures.length; i++) {
          const measure = measures[i];

          // Crear pentagrama superior (clave de Sol)
          const staveUpper = new Vex.Flow.Stave(currentX, currentY, staveWidth);
          if (isNewLine) {
            staveUpper.addClef("treble");
            staveUpper.addKeySignature(keySignatureString);
            staveUpper.setMeasure(i + 1);
          }
          if (i === 0) {
            staveUpper.addTimeSignature(timeSignatureString);
          }
          staveUpper.setContext(context).draw();

          // Crear pentagrama inferior (clave de Fa)
          const staveLower = new Vex.Flow.Stave(
            currentX,
            currentY + 100,
            staveWidth
          );
          if (isNewLine) {
            staveLower.addClef("bass");
            staveLower.addKeySignature(keySignatureString);
          }
          if (i === 0) {
            staveLower.addTimeSignature(timeSignatureString);
          }
          staveLower.setContext(context).draw();

          // Procesar notas para el pentagrama superior
          const notesUpper = processNotes(measure, "1", "treble");
          if (notesUpper.length > 0) {
            Vex.Flow.Formatter.FormatAndDraw(context, staveUpper, notesUpper);
          }

          // Procesar notas para el pentagrama inferior
          const notesLower = processNotes(measure, "5", "bass");
          if (notesLower.length > 0) {
            Vex.Flow.Formatter.FormatAndDraw(context, staveLower, notesLower);
          }

          currentX += staveWidth;
          if (currentX > 700) {
            currentX = 10;
            currentY += 200;
            isNewLine = true;
          } else {
            isNewLine = false;
          }
        }

        setError(null);
      } catch (error) {
        console.error("Error rendering score:", error);
        setError(`Error al renderizar la partitura: ${error}`);
      }
    };

    loadAndRenderScore();
  }, [file]);

  const processNotes = (
    measure: Element,
    voice: string,
    clef: "treble" | "bass"
  ) => {
    return Array.from(measure.getElementsByTagName("note"))
      .filter((note) => note.querySelector(`voice`)?.textContent === voice)
      .map((noteElement) => {
        const isRest = noteElement.querySelector("rest") !== null;
        const duration = noteElement.querySelector("type")?.textContent;

        if (isRest) {
          let vexDuration = getDuration(duration || "");
          return new Vex.Flow.StaveNote({
            clef,
            keys: [clef === "treble" ? "b/4" : "d/3"],
            duration: vexDuration + "r",
          });
        }

        const step = noteElement.querySelector("step")?.textContent;
        const octave = noteElement.querySelector("octave")?.textContent;

        if (!step || !octave || !duration) {
          console.warn(`Nota incompleta encontrada, saltando...`);
          return null;
        }

        let vexDuration = getDuration(duration);

        return new Vex.Flow.StaveNote({
          clef,
          keys: [`${step.toLowerCase()}/${octave}`],
          duration: vexDuration,
        });
      })
      .filter((note): note is Vex.Flow.StaveNote => note !== null);
  };

  const getDuration = (duration: string): string => {
    switch (duration.toLowerCase()) {
      case "whole": return "w";
      case "half": return "h";
      case "quarter": return "q";
      case "eighth": return "8";
      case "16th": return "16";
      case "32nd": return "32";
      case "64th": return "64";
      default:
        console.warn(`Duración desconocida: ${duration}, usando quarter`);
        return "q";
    }
  };

  const getKeySignature = (fifths: number): string => {
    const keySignatures = [
      "Cb",
      "Gb",
      "Db",
      "Ab",
      "Eb",
      "Bb",
      "F",
      "C",
      "G",
      "D",
      "A",
      "E",
      "B",
      "F#",
      "C#",
    ];
    return keySignatures[fifths + 7] || "C";
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <div ref={divRef} />
    </div>
  );
};

export default OpenSheetMusicDisplay;