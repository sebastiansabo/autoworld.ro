"use client";
import React from "react";
import { useInfiniteHits } from "react-instantsearch-hooks-web";

function CarCard({ hit }: { hit: any }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="font-bold text-lg mb-1">{hit.title || hit.name}</div>
      <div className="mb-1">
        Pret:{" "}
        <span className="font-semibold">
          {hit.price ? `${hit.price} EUR` : "N/A"}
        </span>
      </div>
      <div className="text-sm text-gray-600">
        {hit.meta?.custom?.marca} {hit.meta?.custom?.model}
        {hit.meta?.custom?.data_livrarii && ` • ${hit.meta.custom.data_livrarii}`}
      </div>
      {hit.image && (
        <img
          src={hit.image}
          alt={hit.title || hit.name}
          className="w-full mt-2 rounded"
          style={{ maxHeight: 150, objectFit: "cover" }}
          loading="lazy"
        />
      )}
    </div>
  );
}

export default function CarGrid() {
  const {
    hits,
    showMore,
    isLastPage,
  } = useInfiniteHits();

  if (!hits.length) {
    return (
      <div className="py-8 text-center text-gray-500 text-lg">
        Niciun rezultat gasit.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {hits.map((hit: any) => (
          <CarCard key={hit.objectID} hit={hit} />
        ))}
      </div>
      {!isLastPage && (
        <button
          className="mt-6 py-2 px-4 bg-gray-200 rounded hover:bg-gray-300 transition"
          onClick={showMore}
        >
          Incarca mai multe masini
        </button>
      )}
    </div>
  );
}
