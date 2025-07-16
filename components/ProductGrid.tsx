// components/ProductGrid.tsx
"use client";
import { useHits } from "react-instantsearch";

export default function ProductGrid() {
  const { hits } = useHits();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {hits.map((hit: any) => (
        <div key={hit.objectID} className="rounded-2xl shadow-md p-4 bg-white">
          <img
            src={hit.product_image || hit.image}
            alt={hit.title}
            className="w-full h-48 object-cover rounded-xl mb-3"
          />
          <h3 className="font-bold text-xl mb-1">{hit.title}</h3>
          <div className="text-gray-600 mb-2">{hit.vendor}</div>
          <div className="text-lg font-bold text-black">{hit.price} EUR</div>
        </div>
      ))}
    </div>
  );
}
