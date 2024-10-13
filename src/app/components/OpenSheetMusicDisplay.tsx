"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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
  const [audioContextStarted, setAudioContextStarted] = useState(false);

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
          console.log("Score loaded and rendered successfully");
        } catch (error) {
          console.error("Error loading or rendering score:", error);
        }
      };

      loadAndRenderScore();
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

  const initAudio = async () => {
    if (!audioContextStarted) {
      await Tone.start();
      synth.current = new Tone.PolySynth(Tone.Synth).toDestination();
      setAudioContextStarted(true);
      console.log("Audio context started and synth created");
    }
  };

  const playNotes = useCallback((notes: any[], duration: number) => {
    if (synth.current) {
      const notesToPlay = notes.map((note) => {
        const pitch = Tone.Frequency(note.halfTone + 12, "midi").toNote();
        return pitch;
      });
      console.log(
        `Playing notes: ${notesToPlay.join(", ")}, duration: ${duration}`
      );
      synth.current.triggerAttackRelease(notesToPlay, duration);
    } else {
      console.error("Synth is not initialized");
    }
  }, []);

  const handlePlay = useCallback(async () => {
    console.log("Play button clicked");
    await initAudio();
    if (osmdRef.current && !isPlaying) {
      setIsPlaying(true);
      osmdRef.current.cursor.show();
      osmdRef.current.cursor.reset();

      console.log("Starting playback loop");
      const playbackLoop = () => {
        if (osmdRef.current && isPlaying) {
          const iterator = osmdRef.current.cursor.iterator;
          if (iterator.EndReached) {
            console.log("End of score reached");
            handleStop();
          } else {
            const currentNotes = osmdRef.current.cursor.NotesUnderCursor();
            console.log("Current notes:", currentNotes);
            if (currentNotes.length > 0) {
              const duration =
                (60 / tempo) * (currentNotes[0].Length.RealValue / 4);
              playNotes(currentNotes, duration);
            }
            osmdRef.current.cursor.next();
            setTimeout(playbackLoop, (60 / tempo) * 1000);
          }
        }
      };

      playbackLoop();
    } else {
      console.log(
        "Cannot start playback: OSMD not initialized or already playing"
      );
    }
  }, [isPlaying, tempo, playNotes]);

  const handlePause = useCallback(() => {
    console.log("Pause button clicked");
    setIsPlaying(false);
  }, []);

  const handleStop = useCallback(() => {
    console.log("Stop button clicked");
    setIsPlaying(false);
    if (osmdRef.current) {
      osmdRef.current.cursor.reset();
      osmdRef.current.cursor.hide();
    }
    synth.current?.releaseAll();
  }, []);

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
