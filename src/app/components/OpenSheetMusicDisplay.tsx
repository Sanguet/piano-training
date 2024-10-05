import React, { useEffect, useRef, useState } from "react";
import { OpenSheetMusicDisplay as OSMD } from "opensheetmusicdisplay";

interface OpenSheetMusicDisplayProps {
  file: ArrayBuffer;
}

const OpenSheetMusicDisplay: React.FC<OpenSheetMusicDisplayProps> = ({
  file,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (divRef.current && file) {
      const osmd = new OSMD(divRef.current, {
        autoResize: true,
        drawTitle: true,
      });

      const uint8Array = new Uint8Array(file);

      osmd
        .load(uint8Array)
        .then(() => {
          osmd.render();
          setError(null);
        })
        .catch((err) => {
          console.error("Error loading or rendering sheet music:", err);
          setError(
            "Error al cargar o renderizar la partitura. Por favor, verifica el archivo MXL."
          );
        });
    }
  }, [file]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <div ref={divRef} />;
};

export default OpenSheetMusicDisplay;
