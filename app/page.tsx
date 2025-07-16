import AlgoliaInstantSearchProvider from "@/components/AlgoliaInstantSearchProvider";
import CarFilterPanel from "@/components/CarFilterPanel";
import CarGrid from "@/components/CarGrid";

export default function Page() {
  return (
    <AlgoliaInstantSearchProvider>
      <div className="flex min-h-screen">
        <CarFilterPanel />
        <div className="flex-1 p-8 bg-[#f5f6fa]">
          <CarGrid />
        </div>
      </div>
    </AlgoliaInstantSearchProvider>
  );
}
