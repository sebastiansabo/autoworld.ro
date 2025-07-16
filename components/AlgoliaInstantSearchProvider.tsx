"use client";
import React, { ReactNode } from "react";
import { InstantSearch } from "react-instantsearch-hooks-web";
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "DI49ED2KB7",
  "262459da0f0135c7498130dd48e9b9f5"
);

interface ProviderProps {
  children: React.ReactNode;
}

export default function AlgoliaInstantSearchProvider({ children }: ProviderProps) {
  return (
    <InstantSearch searchClient={searchClient} indexName="shopify_products">
      {children}
    </InstantSearch>
  );
}
