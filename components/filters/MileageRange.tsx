"use client";
import { useRange } from "react-instantsearch-hooks-web";
import { useState } from "react";

export default function MileageRange() {
  const { start, range, refine } = useRange({ attribute: "meta.custom.kilometraj" });
  const [min, setMin] = useState(start[0] ?? range.min);
  const [max, setMax] = useState(start[1] ?? range.max);

  const onApply = () => {
    refine([min, max]);
  };

  return (
    <div>
      <h4 className="font-bold mb-1">Rulaj (km)</h4>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={min}
          min={range.min}
          max={max}
          onChange={e => setMin(Number(e.target.value))}
          className="w-20 border px-2 py-1 rounded"
          placeholder="De la"
        />
        <span>—</span>
        <input
          type="number"
          value={max}
          min={min}
          max={range.max}
          onChange={e => setMax(Number(e.target.value))}
          className="w-20 border px-2 py-1 rounded"
          placeholder="Pana la"
        />
        <button onClick={onApply} className="ml-2 px-2 py-1 text-sm rounded bg-blue-100">
          Aplica
        </button>
      </div>
    </div>
  );
}
