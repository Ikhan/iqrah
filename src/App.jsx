import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import AudioPlayerSection from "./components/AudioSelection";
import SelectDropDown from "./components/SelectDropDown";
import { data } from "./data/quran";
import { QuranContext } from "./QuranContext";
export default function App() {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurahIdx, setSelectedSurahIdx] = useState("");

  const [selectedAyah, setSelectedAyah] = useState("");

  const audioRef = useRef(null);

  useEffect(() => {
    setSurahs(data);
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

    return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verse}.mp3`;
  }, [selectedSurahIdx, selectedAyah, surahs]);

  const handleSurahChange = useCallback((e) => {
    setSelectedSurahIdx(e.target.value);
    setSelectedAyah("");
  }, []);

  const handleAyahChange = useCallback((e) => {
    setSelectedAyah(e.target.value);
  }, []);

  const contextValue = {
    surahs,
    selectedSurahIdx,
    selectedAyah,
    ayahs,
    audioUrl,
    audioRef,
    handleSurahChange,
    handleAyahChange,
  };

  return (
    <QuranContext.Provider value={contextValue}>
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

        {audioUrl && <AudioPlayerSection />}
      </div>
    </QuranContext.Provider>
  );
}
