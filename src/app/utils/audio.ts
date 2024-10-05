import * as Tone from "tone";

let player: Tone.Player | null = null;
let lastNoteTime = 0;
let audioContextStarted = false;

export const loadPianoSample = async () => {
  try {
    player = new Tone.Player({
      url: "/piano-samples/piano-note.wav",
      loop: false,
      autostart: false,
    }).toDestination();

    await player.load("/piano-samples/piano-note.wav");
    console.log("Piano sample loaded successfully");
    return true;
  } catch (error) {
    console.error("Error loading piano sample:", error);
    return false;
  }
};

export const playNote = (note: number, volume: number) => {
  if (!player || !player.loaded) {
    console.error("Player not initialized or sample not loaded");
    return;
  }

  const now = Tone.now();
  if (now - lastNoteTime < 0.05) {
    // If less than 50ms have passed since the last note, delay this note slightly
    lastNoteTime += 0.05;
  } else {
    lastNoteTime = now;
  }

  const baseNote = 60; // Assuming the sample is C4 (MIDI note 60)
  const semitonesDifference = note - baseNote;
  const playbackRate = Math.pow(2, semitonesDifference / 12);

  player.volume.value = Tone.gainToDb(volume);
  player.playbackRate = playbackRate;
  player.start(lastNoteTime);

  // Stop the player after a short duration to allow for repeated notes
  player.stop(lastNoteTime + 0.5); // Stop after 0.5 seconds
};

export const setMasterVolume = (volume: number) => {
  Tone.Destination.volume.value = Tone.gainToDb(volume);
};

export const initializeAudio = async () => {
  if (!audioContextStarted) {
    await Tone.start();
    audioContextStarted = true;
    console.log("Audio context started");
  }
};
