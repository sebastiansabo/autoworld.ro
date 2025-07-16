"use client";
import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch";

const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'shopify_products';

const searchClient = algoliasearch(
  "DI49ED2KB7", // Your Algolia App ID
  "5e6f40ea5dfff82ddc9e5b96bfb5be87" // Your Search-Only API Key
);

export default function AlgoliaInstantSearchProvider({ children }: { children: React.ReactNode }) {
  return (
    <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
      {children}
    </InstantSearch>
  );
}
