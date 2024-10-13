"use client";

import React, { useEffect, useRef, useState } from "react";
import { OpenSheetMusicDisplay as OSMD } from "opensheetmusicdisplay";
import { Button } from "@/app/components/ui/button";
import { PlayCircle, PauseCircle, StopCircle } from "lucide-react";
import * as Tone from "tone";
import { Slider } from "@/app/components/ui/slider";

interface OpenSheetMusicDisplayProps {
  file: string;
}

const OpenSheetMusicDisplay: React.FC<OpenSheetMusicDisplayProps> = ({
  file,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const osmdRef = useRef<OSMD | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = useRef<Tone.PolySynth | null>(null);
  const [tempo, setTempo] = useState(120);
  const [volume, setVolume] = useState(75);

  useEffect(() => {
    if (divRef.current) {
      osmdRef.current = new OSMD(divRef.current, {
        autoResize: true,
        drawTitle: true,
        drawSubtitle: true,
        drawComposer: true,
        drawLyricist: true,
      });

      const loadAndRenderScore = async () => {
        try {
          await osmdRef.current?.load(file);
          osmdRef.current?.render();
        } catch (error) {
          console.error("Error loading or rendering score:", error);
        }
      };

      loadAndRenderScore();
      synth.current = new Tone.PolySynth().toDestination();
    }

    return () => {
      osmdRef.current?.clear();
      synth.current?.dispose();
    };
  }, [file]);

  useEffect(() => {
    if (synth.current) {
      synth.current.volume.value = Tone.gainToDb(volume / 100);
    }
  }, [volume]);

  const playNote = (frequency: number, duration: number) => {
    if (synth.current) {
      synth.current.triggerAttackRelease(frequency, duration);
    }
  };

  const handlePlay = async () => {
    if (osmdRef.current) {
      await Tone.start();
      osmdRef.current.cursor.show();
      osmdRef.current.cursor.reset();
      setIsPlaying(true);

      const playbackLoop = () => {
        if (isPlaying && osmdRef.current) {
          if (osmdRef.current.cursor.iterator.EndReached) {
            handleStop();
          } else {
            const currentNotes = osmdRef.current.cursor.NotesUnderCursor();
            currentNotes.forEach((note) => {
              const pitch = note.halfTone ? note.halfTone + 12 : undefined;
              if (pitch !== undefined) {
                const frequency = Tone.Frequency(pitch, "midi").toFrequency();
                playNote(frequency, 60 / tempo);
              }
            });
            osmdRef.current.cursor.next();
            setTimeout(playbackLoop, (60 / tempo) * 1000);
          }
        }
      };

      playbackLoop();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    if (osmdRef.current) {
      osmdRef.current.cursor.reset();
      osmdRef.current.cursor.hide();
    }
    synth.current?.releaseAll();
  };

  return (
    <div>
      <div ref={divRef} />
      <div className="flex flex-col items-center space-y-4 mt-4">
        <div className="flex justify-center space-x-4">
          <Button onClick={handlePlay} disabled={isPlaying}>
            <PlayCircle className="mr-2 h-4 w-4" /> Play
          </Button>
          <Button onClick={handlePause} disabled={!isPlaying}>
            <PauseCircle className="mr-2 h-4 w-4" /> Pause
          </Button>
          <Button onClick={handleStop}>
            <StopCircle className="mr-2 h-4 w-4" /> Stop
          </Button>
        </div>
        <div className="flex items-center space-x-4 w-full max-w-md">
          <span>Tempo: {tempo} BPM</span>
          <Slider
            value={[tempo]}
            onValueChange={(value) => setTempo(value[0])}
            min={40}
            max={240}
            step={1}
            className="w-[200px]"
          />
        </div>
        <div className="flex items-center space-x-4 w-full max-w-md">
          <span>Volumen: {volume}%</span>
          <Slider
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            min={0}
            max={100}
            step={1}
            className="w-[200px]"
          />
        </div>
      </div>
    </div>
  );
};

export default OpenSheetMusicDisplay;
