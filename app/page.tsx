"use client";
import { useState } from "react";
import { Configure } from "react-instantsearch-hooks-web";
import AlgoliaInstantSearchProvider from "@/components/AlgoliaInstantSearchProvider";
import CarFilterPanel from "@/components/CarFilterPanel";
import CarGridInfinite from "@/components/CarGridInfinite";
import CarGridPagination from "@/components/CarGridPagination";
import { MakeModelModal } from "@/components/MakeModelModal";

export default function Page() {
  const [selectedCars, setSelectedCars] = useState<{ make: string; models: string[] }[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"pagination" | "infinite">("infinite");

  // Remove a car
  const handleRemoveCar = (i: number) => {
    setSelectedCars(cs => cs.filter((_, idx) => idx !== i));
    if (editingIndex === i) setEditingIndex(null);
  };

  // Save car from modal
  const handleSaveCar = (make: string, models: string[]) => {
    setSelectedCars(cs =>
      editingIndex !== null
        ? cs.map((c, idx) => idx === editingIndex ? { make, models } : c)
        : [...cs, { make, models }]
    );
    setModalOpen(false);
    setEditingIndex(null);
  };

  // Algolia filters
  let facetFilters: string[][] | undefined;
  if (selectedCars.length === 1) {
    const [card] = selectedCars;
    facetFilters = [
      [`meta.custom.marca:${card.make}`],
      card.models.map(m => `meta.custom.model:${m}`),
    ];
  } else {
    facetFilters = undefined;
  }

  return (
    <AlgoliaInstantSearchProvider>
      <Configure {...({ facetFilters } as any)} />

      {/* Grid Mode Toggle */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-semibold">View:</span>
        <button
          className={`px-3 py-1 rounded ${viewMode === "infinite" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setViewMode("infinite")}
        >
          Infinite Scroll
        </button>
        <button
          className={`px-3 py-1 rounded ${viewMode === "pagination" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setViewMode("pagination")}
        >
          Pagination
        </button>
      </div>

      <div className="flex min-h-screen">
        <CarFilterPanel
          selectedCars={selectedCars}
          onOpenModal={() => {
            setEditingIndex(null);
            setModalOpen(true);
          }}
          onEditCar={(i) => {
            setEditingIndex(i);
            setModalOpen(true);
          }}
          onRemoveCar={handleRemoveCar}
        />
        <div className="flex-1 p-8 bg-[#f5f6fa]">
          {viewMode === "infinite" ? <CarGridInfinite /> : <CarGridPagination />}
        </div>
      </div>

      {/* --- MODAL: NOTE: NO AlgoliaInstantSearchProvider WRAP! --- */}
      {modalOpen && (
        <MakeModelModal
          isOpen={modalOpen}
          onConfirm={handleSaveCar}
          onClose={() => {
            setModalOpen(false);
            setEditingIndex(null);
          }}
        />
      )}
    </AlgoliaInstantSearchProvider>
  );
}
