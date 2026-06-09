import { Icon } from "@/components/ui/Icon";
import type { TrainingService } from "@/lib/types";

export function TrainingServiceCard({ service }: { service: TrainingService }) {
  return (
    <article className="flex h-full flex-col rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-sage-200">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-semibold">{service.name}</h3>
      <p className="mt-1 text-sm font-medium text-sage-700">{service.summary}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-bark-soft">
        {service.description}
      </p>
      <p className="mt-4 rounded-xl bg-sand px-3 py-2 text-xs text-bark-soft">
        <span className="font-semibold text-bark">Best for:</span>{" "}
        {service.bestFor}
      </p>
    </article>
  );
}
