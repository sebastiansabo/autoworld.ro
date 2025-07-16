// components/filters/ModelFilter.tsx
"use client";
import React, { useEffect } from "react";
import { FacetFilter } from "./FacetFilter";

export const ModelFilter: React.FC<{
  onSelectionChange: (models: string[]) => void;
}> = ({ onSelectionChange }) => {
  useEffect(() => {
    // Reset models if the make changes (parent handles make filter!)
    onSelectionChange([]);
  }, [onSelectionChange]);

  return (
    <FacetFilter
      attribute="meta.custom.model"
      label="Model"
      limit={200}
      onSelectionChange={onSelectionChange}
    />
  );
};
