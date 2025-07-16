"use client";
import { useRefinementList } from "react-instantsearch";

export default function BodyTypeDropdown() {
  const { items, refine } = useRefinementList({ attribute: "meta.custom.bodu_type" });

  return (
    <div>
      <h4 className="font-bold mb-1">Tip Caroserie</h4>
      <select
        className="w-full border rounded px-2 py-1"
        onChange={e => refine(e.target.value)}
      >
        <option value="">Toate</option>
        {items.map(item => (
          <option key={item.value} value={item.value}>
            {item.label} ({item.count})
          </option>
        ))}
      </select>
    </div>
  );
}
