import { useMemo, useState } from "react";
import type { Plan } from "../App";

type PlansModalProps = {
  isOpen: boolean;
  plans: Plan[];
  selectedPlan: Plan;
  onClose: () => void;
  onSelect: (plan: Plan) => void;
};

export default function PlansModal({
  isOpen,
  plans,
  selectedPlan,
  onClose,
  onSelect,
}: PlansModalProps) {
  const [search, setSearch] = useState("");

  const filteredPlans = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return plans;

    return plans.filter(
      (plan) =>
        plan.title.toLowerCase().includes(value) ||
        plan.description.toLowerCase().includes(value)
    );
  }, [plans, search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-6xl rounded-[2rem] border border-white/10 bg-[#120d1f]/95 p-5 shadow-2xl">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-pink-100/50">
              Todos los planes
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              Elegí el que más te guste
            </h2>
          </div>

          <div className="flex gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar plan..."
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white outline-none placeholder:text-white/40"
            />

            <button
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
            >
              Cerrar
            </button>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredPlans.map((plan, index) => {
              const active = selectedPlan.id === plan.id;

              const colorStyles = [
                "from-pink-500/20 to-orange-400/10 border-pink-300/20",
                "from-violet-500/20 to-cyan-400/10 border-violet-300/20",
                "from-orange-400/20 to-pink-400/10 border-orange-200/20",
              ];

              const style = colorStyles[index % colorStyles.length];

              return (
                <button
                  key={plan.id}
                  onClick={() => onSelect(plan)}
                  className={`rounded-[2rem] border bg-gradient-to-br p-5 text-left transition ${
                    active
                      ? `${style} shadow-[0_0_30px_rgba(255,255,255,0.08)]`
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="mb-4 overflow-hidden rounded-2xl">
                    <img
                      src={plan.image}
                      alt={plan.title}
                      className="h-44 w-full object-cover"
                    />
                  </div>

                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Plan
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">{plan.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/75">
                    {plan.description}
                  </p>
                </button>
              );
            })}

            {filteredPlans.length === 0 && (
              <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
                No encontré planes con esa búsqueda.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}