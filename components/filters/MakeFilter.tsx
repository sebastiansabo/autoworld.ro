// app/components/filters/MakeFilter.tsx
"use client";
import React from 'react';
import { FacetFilter } from './FacetFilter';

export const MakeFilter: React.FC<{
  onSelectionChange: (makes: string[]) => void;
}> = ({ onSelectionChange }) => (
  <FacetFilter
    attribute="meta.custom.marca"
    label="Make"
    limit={100}
    onSelectionChange={onSelectionChange}
  />
);
