"use client";

import React, { useEffect, useRef, useState } from "react";
import { Vex } from "vexflow";
import JSZip from "jszip";

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
      if (!divRef.current) return;

      try {
        console.log(`Loading file: ${file}`);
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let xmlContent: string;

        if (file.endsWith(".mxl")) {
          console.log("Processing MXL file");
          const arrayBuffer = await response.arrayBuffer();
          const zip = new JSZip();
          const contents = await zip.loadAsync(arrayBuffer);
          const musicXMLFile = Object.keys(contents.files).find(
            (filename) =>
              filename.endsWith(".xml") || filename.endsWith(".musicxml")
          );

          if (!musicXMLFile) {
            throw new Error(
              "No se encontró un archivo MusicXML en el archivo MXL."
            );
          }

          xmlContent = await contents.file(musicXMLFile)!.async("string");
        } else {
          console.log("Processing XML/MusicXML file");
          xmlContent = await response.text();
        }

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
        renderer.resize(500, 200);
        const context = renderer.getContext();

        const stave = new Vex.Flow.Stave(10, 40, 400);
        stave.addClef("treble").addTimeSignature("4/4");
        stave.setContext(context).draw();

        const notes = Array.from(xmlDoc.getElementsByTagName("note")).map(
          (noteElement) => {
            const step =
              noteElement.getElementsByTagName("step")[0]?.textContent;
            const octave =
              noteElement.getElementsByTagName("octave")[0]?.textContent;
            const duration =
              noteElement.getElementsByTagName("type")[0]?.textContent;

            console.log(`Note: ${step}${octave}, Duration: ${duration}`);

            return new Vex.Flow.StaveNote({
              clef: "treble",
              keys: [`${step}/${octave}`],
              duration: duration === "quarter" ? "q" : "w",
            });
          }
        );

        console.log(`Number of notes: ${notes.length}`);

        if (notes.length > 0) {
          Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
        } else {
          throw new Error("No se encontraron notas en el archivo MusicXML.");
        }

        setError(null);
      } catch (error) {
        console.error("Error rendering score:", error);
        setError(`Error al renderizar la partitura: ${error}`);
      }
    };

    loadAndRenderScore();
  }, [file]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <div ref={divRef} />;
};

export default OpenSheetMusicDisplay;
