import { useEffect, useMemo, useRef, useState } from "react";
import type { Song } from "../App";

type MusicPlayerProps = {
  songs: Song[];
};

export default function MusicPlayer({ songs }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [search, setSearch] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredSongs = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return songs;

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(value) ||
        (song.artist ?? "").toLowerCase().includes(value)
    );
  }, [songs, search]);

  const currentSong = songs[currentSongIndex];

  const playSong = async () => {
    try {
      if (!audioRef.current) return;
      await audioRef.current.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
    } catch {
      setIsPlaying(false);
      setAutoplayBlocked(true);
    }
  };

  const pauseSong = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = async () => {
    if (isPlaying) {
      pauseSong();
    } else {
      await playSong();
    }
  };

  const changeSongById = (id: number) => {
    const index = songs.findIndex((song) => song.id === id);
    if (index !== -1) setCurrentSongIndex(index);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    playSong();
  }, [currentSongIndex]);

  useEffect(() => {
    playSong();
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-pink-400/10 via-transparent to-cyan-400/10" />

      <div className="relative flex flex-1 flex-col">
        <div className="flex flex-col items-center">
          <div className={`relative mb-6 h-52 w-52 ${isPlaying ? "animate-spin-slow" : ""}`}>
            <div className="absolute inset-0 overflow-hidden rounded-full bg-[conic-gradient(from_0deg,rgba(255,255,255,0.18),rgba(0,0,0,0.7),rgba(255,255,255,0.12),rgba(0,0,0,0.82),rgba(255,255,255,0.18))] shadow-[0_0_35px_rgba(236,72,153,0.25)]" />
            <div className="absolute inset-[14px] overflow-hidden rounded-full border border-white/10 bg-[repeating-radial-gradient(circle,_#050505_0px,_#050505_5px,_#151515_6px,_#151515_8px)]" />

            <div className="absolute inset-[58px] overflow-hidden rounded-full border border-white/10 bg-black">
              {currentSong.cover ? (
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  className="h-full w-full rounded-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-pink-500/30 to-violet-500/30 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  {currentSong.title}
                </div>
              )}
            </div>

            <div className="absolute left-1/2 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
          </div>

          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-pink-100/60">
              Reproduciendo
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">{currentSong.title}</h2>
            <p className="mt-1 text-sm text-cyan-100/70">
              {currentSong.artist || "Sin artista"}
            </p>
          </div>

          <div className="mb-5 flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="rounded-full border border-pink-300/20 bg-gradient-to-r from-pink-500/30 to-violet-500/30 px-5 py-2 text-sm font-medium text-white transition hover:scale-105"
            >
              {isPlaying ? "Pausar" : "Reproducir"}
            </button>

            <button
              onClick={nextSong}
              className="rounded-full border border-cyan-300/20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-5 py-2 text-sm font-medium text-white transition hover:scale-105"
            >
              Siguiente
            </button>
          </div>

          {autoplayBlocked && (
            <div className="mb-5 rounded-2xl border border-yellow-300/20 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-100">
              El navegador bloqueó el autoplay. Tocá en <span className="font-semibold">Reproducir</span>.
            </div>
          )}
        </div>

        <div className="mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tema o artista..."
            className="w-full rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
          />
        </div>

        <div className="min-h-0 flex-1">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/40">
            Playlist
          </p>

          <div className="h-full max-h-[320px] space-y-2 overflow-y-auto pr-1">
            {filteredSongs.map((song) => {
              const active = song.id === currentSong.id;

              return (
                <button
                  key={song.id}
                  onClick={() => changeSongById(song.id)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                    active
                      ? "border-pink-300/20 bg-gradient-to-r from-white/20 to-pink-300/10 shadow-[0_0_25px_rgba(236,72,153,0.12)]"
                      : "border-white/8 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">{song.title}</p>
                    <p className="truncate text-sm text-white/55">
                      {song.artist || "Sin artista"}
                    </p>
                  </div>

                  {active && (
                    <span className="ml-3 shrink-0 text-xs uppercase tracking-[0.2em] text-pink-100/80">
                      Activo
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <audio
          ref={audioRef}
          onEnded={nextSong}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={currentSong.file} type="audio/mpeg" />
          Tu navegador no soporta audio.
        </audio>
      </div>
    </div>
  );
}