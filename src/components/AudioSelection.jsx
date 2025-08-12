// components/AudioPlayerSection.js
import { useContext, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { QuranContext } from "../QuranContext";

export default function AudioPlayerSection() {
  const { audioUrl, audioRef } = useContext(QuranContext);

  useEffect(() => {
    const audioEl = audioRef?.current?.audio?.current; // actual <audio> element
    if (audioEl && audioUrl) {
      audioEl.load();
      // Optional: auto play when URL changes
      // audioEl.play().catch(() => {});
    }
  }, [audioUrl, audioRef]);

  if (!audioUrl) return null; // No audio to play

  return (
    <AudioPlayer
      ref={audioRef}
      autoPlay={false}
      src={audioUrl}
      showJumpControls={false}
      showSkipControls={false}
      customAdditionalControls={[]}
    />
  );
}
