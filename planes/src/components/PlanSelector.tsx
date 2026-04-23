import type { Plan } from "../App";

type PlanSelectorProps = {
  plans: Plan[];
  selectedPlan: Plan;
  onSelect: (plan: Plan) => void;
  onOpenAll: () => void;
  totalPlans: number;
};

export default function PlanSelector({
  plans,
  selectedPlan,
  onSelect,
  onOpenAll,
  totalPlans,
}: PlanSelectorProps) {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white/90">Planes destacados</h2>

        <button
          onClick={onOpenAll}
          className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
        >
          Ver todos ({totalPlans})
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan, index) => {
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
              className={`rounded-[2rem] border bg-gradient-to-br p-5 text-left transition duration-300 ${
                active
                  ? `${style} scale-[1.02] shadow-[0_0_35px_rgba(255,255,255,0.08)]`
                  : "border-white/10 bg-white/8 hover:-translate-y-1 hover:bg-white/12"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/55">
                Plan
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">{plan.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/75">
                {plan.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}