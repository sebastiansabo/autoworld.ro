import React, { useEffect, useState } from "react";
import { useAlgoliaFacet, FacetItem } from "../../app/hooks/useAlgoliaFacet";

export interface FacetFilterProps {
  attribute: string;
  label: string;
  limit?: number;
  onSelectionChange: (values: string[]) => void;
}

export const FacetFilter: React.FC<FacetFilterProps> = ({
  attribute,
  label,
  limit = 100,
  onSelectionChange,
}) => {
  const [facetLimit, setFacetLimit] = useState(limit);
  const { items, refine, searchForItems } = useAlgoliaFacet(attribute, facetLimit);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const visibleItems = items.filter((item: FacetItem) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    onSelectionChange(Array.from(selected));
  }, [selected, onSelectionChange]);

  const toggle = (value: string) => {
    refine(value);
    setSelected(prev => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  };

  const selectAllVisible = () => {
    visibleItems.forEach((i: FacetItem) => {
      if (!selected.has(i.value)) refine(i.value);
      selected.add(i.value);
    });
    setSelected(new Set(selected));
  };

  const canShowMore = items.length === facetLimit && facetLimit < 1000;

  return (
    <div className="facet-filter mb-4">
      <h4 className="font-semibold mb-2">{label}</h4>
      <input
        type="search"
        placeholder={`Search ${label.toLowerCase()}`}
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          searchForItems(e.target.value);
        }}
        className="border rounded px-2 py-1 w-full mb-2"
      />
      <button
        onClick={selectAllVisible}
        className="text-sm mb-2 underline"
      >
        Select all visible
      </button>
      <ul className="max-h-48 overflow-auto">
        {visibleItems.map((item: FacetItem) => (
          <li key={item.value} className="flex items-center">
            <label className="flex-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.has(item.value)}
                onChange={() => toggle(item.value)}
                className="mr-2"
              />
              {item.label} ({item.count})
            </label>
          </li>
        ))}
      </ul>
      {canShowMore && (
        <button
          className="text-xs mt-2 underline"
          onClick={() => setFacetLimit(facetLimit + 50)}
        >
          Show more
        </button>
      )}
    </div>
  );
};
