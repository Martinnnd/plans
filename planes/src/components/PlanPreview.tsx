import type { Plan } from "../App";

type PlanPreviewProps = {
  plan: Plan;
};

export default function PlanPreview({ plan }: PlanPreviewProps) {
  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[320px]">
          <img
            src={plan.image}
            alt={plan.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        <div className="relative flex flex-col justify-center bg-gradient-to-br from-white/8 via-violet-500/5 to-pink-500/5 p-8">
          <div className="absolute -right-10 top-10 h-28 w-28 rounded-full bg-pink-400/15 blur-3xl" />
          <div className="absolute bottom-10 left-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />

          <p className="relative text-xs uppercase tracking-[0.35em] text-pink-100/60">
            Plan seleccionado
          </p>
          <h2 className="relative mt-3 text-4xl font-extrabold text-white">
            {plan.title}
          </h2>
          <p className="relative mt-4 text-[17px] leading-8 text-white/80">
            {plan.description}
          </p>

          <div className="relative mt-8 rounded-[1.5rem] border border-white/10 bg-white/8 p-5 text-sm text-white/75">
            Acá después podemos agregar más cosas, por ejemplo:
            <div className="mt-3 space-y-2 text-white/55">
              <p>• horario ideal</p>
              <p>• ubicación</p>
              <p>• presupuesto aproximado</p>
              <p>• recomendación musical para ese plan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}