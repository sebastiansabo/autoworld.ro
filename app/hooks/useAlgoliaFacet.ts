// app/hooks/useAlgoliaFacet.ts
import { useRefinementList } from 'react-instantsearch-hooks-web';

export interface FacetItem {
  label: string;
  value: string;
  count: number;
  isRefined: boolean;
}

export function useAlgoliaFacet(attribute: string, limit = 100) {
  const { items, refine, searchForItems } = useRefinementList({
    attribute,
    limit,
  });
  return { items, refine, searchForItems };
}
