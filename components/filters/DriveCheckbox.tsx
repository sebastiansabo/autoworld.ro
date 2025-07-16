"use client";
import { useRefinementList } from "react-instantsearch";

export default function DriveCheckbox() {
  const { items, refine } = useRefinementList({ attribute: "meta.custom.cutie_viteze" });

  return (
    <div>
      <h4 className="font-bold mb-1">Cutie de Viteze</h4>
      {items.map(item => (
        <label key={item.value} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.isRefined}
            onChange={() => refine(item.value)}
          />
          <span>{item.label} <span className="text-gray-400">({item.count})</span></span>
        </label>
      ))}
    </div>
  );
}
