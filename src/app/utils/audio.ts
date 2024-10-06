import * as Tone from "tone";

let pianoSampler: Tone.Sampler | null = null;

export const initializeAudio = async () => {
  await Tone.start();
  console.log("Audio is ready");
};

export const loadPianoSample = async () => {
  try {
    pianoSampler = new Tone.Sampler({
      urls: {
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
      },
      baseUrl: "/samples/piano/",
    }).toDestination();

    await Tone.loaded();
    console.log("Piano sample loaded successfully");
    return true;
  } catch (error) {
    console.error("Failed to load piano sample:", error);
    return false;
  }
};

export const setMasterVolume = (volume: number) => {
  Tone.Destination.volume.value = Tone.gainToDb(volume);
};

export const playNote = (note: number, velocity: number) => {
  if (pianoSampler) {
    const freq = Tone.Frequency(note, "midi").toFrequency();
    pianoSampler.triggerAttackRelease(freq, "8n", undefined, velocity);
  }
};
