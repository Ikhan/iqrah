# Iqrah Quran Reciter Chrome Extension

A lightweight Chrome extension that lets you quickly browse any of the 114 Surahs of the Qur’an, pick an Ayah, and listen to a high-quality recitation straight from your browser toolbar.

## Features

- **Surah & Ayah Dropdowns**  
  Dynamically populate Surah and Ayah lists from a local JSON dataset.
- **Continuous Audio Playback**  
  Builds the correct “absolute” verse number (cumulative across all Surahs) and loads the matching `*.mp3` file from the Islamic Network CDN.
- **Pure React UI**  
  Fast, responsive controls with React hooks and a custom `<SelectDropDown>` component.
- **Zero Dependencies in Production**  
  Audio is streamed directly from `https://cdn.islamic.network/quran/audio/128/ar.alafasy/<verse>.mp3`—no backend or API keys required.

## Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/quran-reciter-chrome-extension.git
   cd quran-reciter-chrome-extension

