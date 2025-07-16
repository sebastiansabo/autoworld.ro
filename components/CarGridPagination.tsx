"use client";
import React from "react";
import { useHits, Pagination } from "react-instantsearch-hooks-web";

function CarCard({ hit }: { hit: any }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="font-bold text-lg mb-1">{hit.title || hit.name}</div>
      <div className="mb-1">
        Pret: <span className="font-semibold">{hit.price ? `${hit.price} EUR` : "N/A"}</span>
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

export default function CarGridPagination() {
  const { hits } = useHits();

  if (!hits.length) {
    return (
      <div className="py-8 text-center text-gray-500 text-lg">
        Niciun rezultat gasit.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {hits.map((hit: any) => (
          <CarCard key={hit.objectID} hit={hit} />
        ))}
      </div>
      <div className="flex justify-center my-8">
        <Pagination
          classNames={{
            root: "flex gap-2",
            item: "px-2 py-1 rounded cursor-pointer bg-gray-200 hover:bg-blue-400 hover:text-white",
            selectedItem: "bg-blue-600 text-white",
          }}
        />
      </div>
    </>
  );
}
