"use client";
import { useRefinementList } from "react-instantsearch-hooks-web";
export default function DebugMakes() {
  const { items } = useRefinementList({ attribute: "meta.custom.marca", limit: 10 });
  console.log("DEBUG MAKES", items);
  return <div>Check the browser console for DEBUG MAKES</div>;
}
