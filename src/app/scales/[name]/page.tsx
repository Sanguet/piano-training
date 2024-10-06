"use client";

import { useState } from "react";
import Link from "next/link";
import { Slider } from "@/app/components/ui/slider";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Play, Pause, Volume2, ArrowLeft } from "lucide-react";
import OpenSheetMusicDisplay from "../../components/OpenSheetMusicDisplay";

export default function ScaleDetail({ params }: { params: { name: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(60);
  const [volume, setVolume] = useState(50);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const scaleName = decodeURIComponent(params.name);

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/scales"
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a la lista de escalas
      </Link>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {scaleName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <OpenSheetMusicDisplay
            file={`/scales/${scaleName
              .toLowerCase()
              .replace(" ", "_")}_scale.musicxml`}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <Button onClick={togglePlay} className="w-full sm:w-auto">
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
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Volume2 className="h-4 w-4" />
              <Slider
                value={[volume]}
                onValueChange={(value: number[]) => setVolume(value[0])}
                max={100}
                min={0}
                step={1}
                className="w-[150px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
