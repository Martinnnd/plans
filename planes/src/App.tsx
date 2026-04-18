import { useMemo, useState } from "react";
import MusicPlayer from "./components/MusicPlayer";
import PlanSelector from "./components/PlanSelector";
import PlanPreview from "./components/PlanPreview";

export type Song = {
  id: number;
  title: string;
  artist?: string;
  file: string;
  cover?: string;
};

export type Plan = {
  id: number;
  title: string;
  image: string;
  description: string;
};

function App() {
  const songs: Song[] = useMemo(
    () => [
      {
        id: 1,
        title: "Castle on the Hill",
        artist: "Ed Sheeran",
        file: "/music/tema1.mp3",
        cover: "/images/castle-cover.jpg",
      },
      {
        id: 2,
        title: "Headlights",
        artist: "Eminem",
        file: "/music/tema2.mp3",
        cover: "/images/headlights-cover.jpg",
      },
      {
        id: 3,
        title: "Sing",
        artist: "Ed Sheeran",
        file: "/music/tema3.mp3",
        cover: "/images/sing-cover.jpg",
      },
    ],
    []
  );

  const plans: Plan[] = useMemo(
    () => [
      {
        id: 1,
        title: "Ir al cine",
        image: "/images/cine.jpg",
        description: "Vamos a ver una peli daaaaaale jajajaja, y despues vamos a comer algo",
      },
      {
        id: 2,
        title: "Ir a un bar",
        image: "/images/bar.jpg",
        description: "Vamos a un bar de juegos, tomamos, la pasamos bien, nos reimos y dsp dominadas jajajija",
      },
      {
        id: 3,
        title: "Ir a la plaza a tomar mates",
        image: "/images/plaza.jpg",
        description: "Caminar, mates, truco, a ver quien gana en banderas jajaja",
      },
    ],
    []
  );

  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#0b0614] text-white">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(244,114,182,0.25),transparent_20%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.2),transparent_20%),radial-gradient(circle_at_70%_75%,rgba(249,115,22,0.18),transparent_22%),radial-gradient(circle_at_30%_80%,rgba(168,85,247,0.18),transparent_22%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,8,16,0.55),rgba(15,10,25,0.78),rgba(8,8,16,0.9))]" />
        <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute right-10 top-10 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-6 py-8 lg:grid-cols-[320px_1fr]">
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <MusicPlayer songs={songs} />
          </aside>

          <main className="flex flex-col items-center justify-center gap-10">
            <div className="w-full max-w-4xl text-center">
              <p className="mb-3 text-sm uppercase tracking-[0.4em] text-pink-200/80">
                Lista de planes
              </p>

              <h1 className="bg-gradient-to-r from-pink-300 via-orange-200 to-cyan-200 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] sm:text-6xl">
                ¿Qué hacemos el finde?
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-[17px] text-white/80">
                Seleccioná una opción y te muestro lo que pensé
              </p>
            </div>

            <PlanSelector
              plans={plans}
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
            />

            <PlanPreview plan={selectedPlan} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;