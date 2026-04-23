import { useMemo, useState } from "react";
import MusicPlayer from "./components/MusicPlayer";
import PlanSelector from "./components/PlanSelector";
import PlanPreview from "./components/PlanPreview";
import PlansModal from "./components/PlansModal";

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
      { id: 1, title: "Castle on the Hill", artist: "Ed Sheeran", file: "/music/tema1.mp3", cover: "/images/castle-cover.jpg" },
      { id: 2, title: "Headlights", artist: "Eminem", file: "/music/tema2.mp3", cover: "/images/headlights-cover.jpg" },
      { id: 3, title: "Sing", artist: "Ed Sheeran", file: "/music/tema3.mp3", cover: "/images/sing-cover.jpg" },
      { id: 4, title: "Perfect", artist: "Ed Sheeran", file: "/music/tema4.mp3", cover: "/images/castle-cover.jpg" },
      { id: 5, title: "Lighters", artist: "Eminem", file: "/music/tema5.mp3", cover: "/images/bad.jpg" },
      { id: 6, title: "Livin la vida loca", artist: "Ricky Martin", file: "/music/tema6.mp3", cover: "/images/livin.jpg" },
      { id: 7, title: "Thinking Out Loud", artist: "Ed Sheeran", file: "/music/tema7.mp3", cover: "/images/sing-cover.jpg" },
    ],
    []
  );

  const plans: Plan[] = useMemo(
    () => [
      { id: 1, title: "Ir al cine", image: "/images/cine.jpg", description: "Vamos a ver una peli daaaaaale jajajaja, y despues vamos a comer algo" },
      { id: 2, title: "Ir a un bar", image: "/images/cena.jpg", description: "Vamos a un bar de juegos, tomamos, la pasamos bien, nos reimos y dsp dominadas jajajija" },
      { id: 3, title: "Ir a la plaza a tomar mates", image: "/images/plaza.jpg", description: "Caminar, mates, truco, a ver quien gana en banderas jajaja" },
      { id: 4, title: "Ir a merendar", image: "/images/merienda.jpg", description: "Caminata larga, risas y a degustar los mejores platos con limon jajaja" },
      { id: 5, title: "Bolucompras", image: "/images/bazar.jpg", description: "Vamos a recorrer todos los lugares para comprar cosas que no necesitamos" },
      { id: 6, title: "Mini golf", image: "/images/mini.jpeg", description: "Y ese dia vamos a tener que ver quien es mejor en el mini golf" },
      { id: 7, title: "Tour de mani japones", image: "/images/mani.jpg", description: "Ese dia vamos a ver los mejores sabores de mani japones jajaja y vemos el mejor" },
      { id: 8, title: "Maraton de series", image: "/images/maraton.jpg", description: "y ya dijimos tenemos que ver the office y ver quien llora con una peli(vos jaja)" },
      { id: 9, title: "Ir a museos", image: "/images/museos.jpg", description: "Podemos ir a varios lugares que estan buenos conocer y dsp comida jajaja" },
    ],
    []
  );

  const featuredPlans = plans.slice(0, 3);

  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#0b0614] text-white">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(244,114,182,0.25),transparent_20%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.2),transparent_20%),radial-gradient(circle_at_70%_75%,rgba(249,115,22,0.18),transparent_22%),radial-gradient(circle_at_30%_80%,rgba(168,85,247,0.18),transparent_22%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,8,16,0.55),rgba(15,10,25,0.78),rgba(8,8,16,0.9))]" />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[360px_1fr]">
          <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
            <MusicPlayer songs={songs} />
          </aside>

          <main className="flex flex-col gap-8">
            <div className="w-full text-center">
              <p className="mb-3 text-sm uppercase tracking-[0.4em] text-pink-200/80">
                Lista de planes
              </p>

              <h1 className="bg-gradient-to-r from-pink-300 via-orange-200 to-cyan-200 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
                ¿Qué hacemos el finde?
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-[17px] text-white/80">
                Seleccioná una opción y te muestro lo que pensé
              </p>
            </div>

            <PlanSelector
              plans={featuredPlans}
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
              onOpenAll={() => setIsPlansModalOpen(true)}
              totalPlans={plans.length}
            />

            <PlanPreview plan={selectedPlan} />
          </main>
        </div>
      </div>

      <PlansModal
        isOpen={isPlansModalOpen}
        plans={plans}
        selectedPlan={selectedPlan}
        onClose={() => setIsPlansModalOpen(false)}
        onSelect={(plan) => {
          setSelectedPlan(plan);
          setIsPlansModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;