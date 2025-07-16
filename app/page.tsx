"use client";
import { useState } from "react";
import { Configure } from "react-instantsearch-hooks-web";
import AlgoliaInstantSearchProvider from "@/components/AlgoliaInstantSearchProvider";
import CarFilterPanel from "@/components/CarFilterPanel";
import CarGridInfinite from "@/components/CarGridInfinite";
import CarGridPagination from "@/components/CarGridPagination";
import { MakeModelModal } from "@/components/MakeModelModal";

// Each card: { make: string, models: string[] }
export default function Page() {
  const [selectedCars, setSelectedCars] = useState<{ make: string; models: string[] }[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // What car should be loaded in the modal? (edit or add)
  const isEditing = editingIndex !== null;
  const modalInitialMake = isEditing ? selectedCars[editingIndex!]?.make : null;
  const modalInitialModels = isEditing ? selectedCars[editingIndex!]?.models : [];

  const [viewMode, setViewMode] = useState<"pagination" | "infinite">("infinite");

  // Handler: Remove a car (from filter list)
  const handleRemoveCar = (i: number) => {
    setSelectedCars(cs => cs.filter((_, idx) => idx !== i));
    if (editingIndex === i) setEditingIndex(null);
  };

  // Handler: Save car from modal
  const handleSaveCar = (make: string, models: string[]) => {
    setSelectedCars(cs =>
      editingIndex !== null
        ? cs.map((c, idx) => idx === editingIndex ? { make, models } : c)
        : [...cs, { make, models }]
    );
    setModalOpen(false);
    setEditingIndex(null);
  };

  // Only use MODELS for search results
  const allSelectedModels: string[] = selectedCars.flatMap(card => card.models);
  const facetFilters =
    allSelectedModels.length > 0
      ? [allSelectedModels.map(model => `meta.custom.model:${model}`)]
      : undefined;

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
          onOpenModal={() => { setEditingIndex(null); setModalOpen(true); }}
          onEditCar={i => { setEditingIndex(i); setModalOpen(true); }}
          onRemoveCar={handleRemoveCar}
        />
        <div className="flex-1 p-8 bg-[#f5f6fa]">
          {viewMode === "infinite" ? <CarGridInfinite /> : <CarGridPagination />}
        </div>
      </div>
      // Example usage:
{modalOpen && (
  <AlgoliaInstantSearchProvider key="modal-make-model">
    <MakeModelModal
      isOpen={modalOpen}
      initialMake={editingIndex !== null ? selectedCars[editingIndex]?.make : null}
      initialModels={editingIndex !== null ? selectedCars[editingIndex]?.models : []}
      onConfirm={handleSaveCar}
      onClose={() => { setModalOpen(false); setEditingIndex(null); }}
    />
  </AlgoliaInstantSearchProvider>
)}

    </AlgoliaInstantSearchProvider>
  );
}
