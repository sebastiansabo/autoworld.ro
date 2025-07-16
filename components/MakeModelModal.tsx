"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { useRefinementList, InstantSearch, Configure } from "react-instantsearch-hooks-web";
import carLogos from "@/lib/carLogos";

export const MakeModelModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (make: string, models: string[]) => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [makeSearch, setMakeSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");

  // 1. GET MAKES from Algolia
  const {
    items: makes,
    searchForItems: searchMakes,
  } = useRefinementList({
    attribute: "meta.custom.marca",
    limit: 100,
  });

  // 2. For models, use a sub-context scoped to the selected make!
  function ModelPicker() {
    const {
      items: models,
      searchForItems: searchModels,
    } = useRefinementList({
      attribute: "meta.custom.model",
      limit: 100,
    });

    // Search and filter models
    const filteredModels = modelSearch
      ? models.filter((model) =>
          model.label.toLowerCase().includes(modelSearch.toLowerCase())
        )
      : models;

    function handleSelectAllModels() {
      if (selectedModels.length === filteredModels.length && filteredModels.length > 0) {
        setSelectedModels([]);
      } else {
        setSelectedModels(filteredModels.map((m) => m.value));
      }
    }

    function toggleModel(model: string) {
      setSelectedModels((models) =>
        models.includes(model)
          ? models.filter((m) => m !== model)
          : [...models, model]
      );
    }

    const canConfirm = !!selectedMake && selectedModels.length > 0;

    return (
      <>
        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Caută model"
          value={modelSearch}
          onChange={e => {
            setModelSearch(e.target.value);
            searchModels(e.target.value);
          }}
        />
        <div className="mb-2 flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={
              selectedModels.length === filteredModels.length &&
              filteredModels.length > 0
            }
            onChange={handleSelectAllModels}
            id="selectAllModels"
          />
          <label htmlFor="selectAllModels" className="font-semibold cursor-pointer">
            Toate modelele
          </label>
        </div>
        <ul className="mb-4 max-h-60 overflow-y-auto">
          {filteredModels.map((model) => (
            <li key={model.value} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedModels.includes(model.value)}
                onChange={() => toggleModel(model.value)}
                id={`model-${model.value}`}
              />
              <label
                htmlFor={`model-${model.value}`}
                className="cursor-pointer flex-1"
              >
                {model.label}
              </label>
              <span className="ml-2 bg-gray-100 text-xs rounded-full px-2">
                {model.count}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button
            disabled={!canConfirm}
            onClick={() => onConfirm(selectedMake!, selectedModels)}
            className={`btn btn-primary ${!canConfirm ? "opacity-50" : ""}`}
          >
            Confirm
          </button>
        </div>
      </>
    );
  }

  // --- Modal Content ---
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="p-4 min-w-[350px] max-w-[450px]">
        {/* Step 1: Make selection */}
        {!selectedMake && (
          <>
            <div className="font-bold text-xl mb-4 text-center">Alege marcă</div>
            <input
              className="w-full p-2 mb-3 border rounded"
              placeholder="Caută marcă"
              value={makeSearch}
              onChange={e => {
                setMakeSearch(e.target.value);
                searchMakes(e.target.value);
              }}
            />
            <ul className="overflow-y-auto max-h-96">
              {makes.map((make) => (
                <li
                  key={make.value}
                  onClick={() => setSelectedMake(make.value)}
                  className="flex items-center px-2 py-2 cursor-pointer rounded hover:bg-blue-50"
                >
                  <img
                    src={carLogos[make.label] || "/Logos/default.webp"}
                    alt={make.label}
                    className="w-8 h-8 mr-3 object-contain"
                  />
                  <span className="font-medium flex-1">{make.label}</span>
                  <span className="ml-2 bg-gray-100 text-xs rounded-full px-2">
                    {make.count}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Step 2: Model selection (Algolia context for selected make) */}
        {selectedMake && (
          <InstantSearch
            searchClient={
              // use the same client as your top-level provider!
              require("algoliasearch/lite")("DI49ED2KB7", "262459da0f0135c7498130dd48e9b9f5")
            }
            indexName="shopify_products"
          >
           <Configure {...({ facetFilters: [[`meta.custom.marca:${selectedMake}`]] } as any)} />
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => {
                  setSelectedMake(null);
                  setMakeSearch("");
                }}
                className="text-lg px-2"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                <img
                  src={carLogos[selectedMake] || "/Logos/default.webp"}
                  alt={selectedMake}
                  className="w-10 h-10"
                />
                <span className="text-xl font-bold">{selectedMake}</span>
              </div>
              <button onClick={onClose} className="text-2xl px-2">
                ×
              </button>
            </div>
            <ModelPicker />
          </InstantSearch>
        )}
      </div>
    </Modal>
  );
};
