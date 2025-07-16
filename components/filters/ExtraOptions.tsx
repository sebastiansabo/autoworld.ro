"use client";
import { useRefinementList } from "react-instantsearch";

export default function ExtraOptions() {
  const {
    items,
    refine,
    searchForItems,
    canToggleShowMore,
    toggleShowMore,
    isShowingMore,
  } = useRefinementList({
    attribute: "meta.custom.extra_options",
    searchable: true,
    limit: 10,
    showMore: true,
  });

  return (
    <div>
      <h4 className="font-bold mb-1">Optiuni Extra</h4>
      <input
        type="search"
        placeholder="Cauta optiune"
        onChange={e => searchForItems(e.target.value)}
        className="w-full border rounded px-2 py-1 mb-2"
      />
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item.value}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => refine(item.value)}
                className="mr-2"
              />
              <span>
                {item.label} <span className="text-gray-400">({item.count})</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      {canToggleShowMore && (
        <button
          onClick={toggleShowMore}
          className="mt-2 text-xs text-blue-700 underline"
        >
          {isShowingMore ? "Arata mai putin" : "Arata mai multe"}
        </button>
      )}
    </div>
  );
}
