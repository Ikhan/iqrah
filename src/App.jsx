import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import SelectDropDown from "./components/SelectDropDown";

export default function App() {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurahIdx, setSelectedSurahIdx] = useState("");

  const [selectedAyah, setSelectedAyah] = useState("");

  const audioRef = useRef(null);

  useEffect(() => {
    import("./data/quran.json")
      .then(({ default: data }) => setSurahs(data))
      .catch((e) => console.error("Error loading surahs:", e));
  }, []);

  const selectedSurah = useMemo(
    () => surahs.find((s) => s.index === selectedSurahIdx) || null,
    [surahs, selectedSurahIdx]
  );

  const ayahs = useMemo(() => {
    if (!selectedSurah) return [];
    return Array.from({ length: selectedSurah.count }, (_, i) => String(i + 1));
  }, [selectedSurah]);

  const audioUrl = useMemo(() => {
    if (!selectedSurahIdx || !selectedAyah) return "";
    const surahIndex = surahs.findIndex((s) => s.index === selectedSurahIdx);
    const versesBefore = surahs
      .slice(0, surahIndex)
      .reduce((sum, s) => sum + s.count, 0);
    let verse = versesBefore + Number(selectedAyah);

    // Example: if you need special Fātiḥah shifting, uncomment:
    // if (surahIndex === 0) verse += 1;

    return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verse}.mp3`;
  }, [selectedSurahIdx, selectedAyah, surahs]);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.load();
      // audioRef.current.play().catch(() => {});
    }
  }, [audioUrl]);

  // 6) Handlers
  const handleSurahChange = useCallback((e) => {
    setSelectedSurahIdx(e.target.value);
    setSelectedAyah(""); // reset ayah when surah changes
  }, []);

  const handleAyahChange = useCallback((e) => {
    setSelectedAyah(e.target.value);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <SelectDropDown
        label="Surah"
        options={surahs.map((s) => ({
          value: s.index,
          label: `${s.index}. ${s.title}`,
        }))}
        value={selectedSurahIdx}
        onChange={handleSurahChange}
        placeholder="Select a Surah"
      />

      <SelectDropDown
        label="Ayah"
        options={ayahs.map((n) => ({ value: n, label: n }))}
        value={selectedAyah}
        onChange={handleAyahChange}
        placeholder="Select an Ayah"
        disabled={!ayahs.length}
      />

      {audioUrl && (
        <AudioPlayer
          autoPlay={false}
          src={audioUrl}
          showJumpControls={false}
          showSkipControls={false}
          customAdditionalControls={[]}
        />
      )}
    </div>
  );
}
