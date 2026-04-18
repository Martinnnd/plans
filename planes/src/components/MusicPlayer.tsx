import { useEffect, useRef, useState } from "react";
import type { Song } from "../App";

type MusicPlayerProps = {
  songs: Song[];
};

export default function MusicPlayer({ songs }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const changeSong = (index: number) => {
    setCurrentSongIndex(index);
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
    <div className="relative w-full rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-pink-400/10 via-transparent to-cyan-400/10" />

      <div className="relative flex flex-col items-center">
        <div
          className={`relative mb-6 h-44 w-44 ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
        >
          {/* Disco exterior */}
          <div className="absolute inset-0 rounded-full overflow-hidden bg-[conic-gradient(from_0deg,rgba(255,255,255,0.18),rgba(0,0,0,0.7),rgba(255,255,255,0.12),rgba(0,0,0,0.82),rgba(255,255,255,0.18))] shadow-[0_0_35px_rgba(236,72,153,0.25)]" />

          {/* Surcos */}
          <div className="absolute inset-[14px] rounded-full overflow-hidden border border-white/10 bg-[repeating-radial-gradient(circle,_#050505_0px,_#050505_5px,_#151515_6px,_#151515_8px)]" />

          {/* Círculo intermedio para tapar cualquier borde raro */}
          <div className="absolute inset-[52px] rounded-full overflow-hidden border border-white/10 bg-black">
            <div className="absolute inset-0 rounded-full overflow-hidden">
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
          </div>

          {/* Centro */}
          <div className="absolute left-1/2 top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
        </div>

        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-pink-100/60">
            Reproduciendo
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            {currentSong.title}
          </h2>
          <p className="mt-1 text-sm text-cyan-100/70">
            {currentSong.artist || "Sin artista"}
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="rounded-full border border-pink-300/20 bg-gradient-to-r from-pink-500/30 to-violet-500/30 px-5 py-2 text-sm font-medium text-white transition hover:scale-105 hover:from-pink-500/45 hover:to-violet-500/45"
          >
            {isPlaying ? "Pausar" : "Reproducir"}
          </button>

          <button
            onClick={nextSong}
            className="rounded-full border border-cyan-300/20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-5 py-2 text-sm font-medium text-white transition hover:scale-105 hover:from-cyan-500/35 hover:to-blue-500/35"
          >
            Siguiente
          </button>
        </div>

        {autoplayBlocked && (
          <div className="mb-5 rounded-2xl border border-yellow-300/20 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-100">
            El navegador bloqueó el autoplay. Tocá en{" "}
            <span className="font-semibold">Reproducir</span>.
          </div>
        )}

        <div className="w-full">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/40">
            Playlist
          </p>

          <div className="space-y-2">
            {songs.map((song, index) => {
              const active = index === currentSongIndex;

              return (
                <button
                  key={song.id}
                  onClick={() => changeSong(index)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                    active
                      ? "border-pink-300/20 bg-gradient-to-r from-white/20 to-pink-300/10 shadow-[0_0_25px_rgba(236,72,153,0.12)]"
                      : "border-white/8 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div>
                    <p className="font-medium text-white">{song.title}</p>
                    <p className="text-sm text-white/55">
                      {song.artist || "Sin artista"}
                    </p>
                  </div>

                  {active && (
                    <span className="text-xs uppercase tracking-[0.2em] text-pink-100/80">
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