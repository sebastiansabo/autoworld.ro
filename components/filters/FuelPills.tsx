"use client";
import { useRefinementList } from "react-instantsearch";

export default function FuelPills() {
  const { items, refine } = useRefinementList({ attribute: "meta.custom.fuel" });

  return (
    <div>
      <h4 className="font-bold mb-1">Combustibil</h4>
      <div className="flex gap-2 flex-wrap">
        {items.map(item => (
          <button
            key={item.value}
            className={`px-3 py-1 rounded-full border ${item.isRefined ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => refine(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
