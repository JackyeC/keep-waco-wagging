import { PawPrint } from "lucide-react";
import {
  getPlannedPetAccessories,
  kwwPetDesignSystem,
} from "@/data/printifyPetCatalog";

export function PlannedPetAccessoriesPanel() {
  const planned = getPlannedPetAccessories();

  return (
    <aside className="mt-10 rounded-sm border border-sage-200 bg-sage-50/80 p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <PawPrint className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
        <div>
          <h3 className="font-display text-xl text-bark">More pet accessories coming</h3>
          <p className="mt-2 text-sm leading-relaxed text-bark-soft">
            We&apos;re customizing Printify pet gear with the same Waco skyline and breed
            editions as our hoodies — bandanas, bowls, feeding mats, collars, leashes, tags,
            and more.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-bark-faint">
            Design system: {kwwPetDesignSystem.primary}. Breeds: {kwwPetDesignSystem.breeds}.
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {planned.map((item) => (
              <li
                key={item.id}
                className="rounded-sm border border-clay/80 bg-white px-3 py-2 text-sm text-bark-soft"
              >
                <span className="font-medium text-bark">{item.printifyName}</span>
                <span className="text-bark-faint"> — customizing</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
