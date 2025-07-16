// components/CarFilterPanel.tsx
"use client";
import BrandFilter from "./filters/BrandFilter";
import ModelFilter from "./filters/ModelFilter";
import PriceSlider from "./filters/PriceSlider";
import YearRange from "./filters/YearRange";
import MileageRange from "./filters/MileageRange";
import TransmissionPills from "./filters/TransmissionPills";
import FuelPills from "./filters/FuelPills";
import PowerRange from "./filters/PowerRange";
import BodyTypeDropdown from "./filters/BodyTypeDropdown";
import DriveCheckbox from "./filters/DriveCheckbox";
import ExtraOptions from "./filters/ExtraOptions";
// ... import any "ActiveFilters" header component you have

export default function CarFilterPanel() {
  return (
    <aside className="w-[340px] min-h-screen bg-white rounded-2xl shadow-lg px-6 py-6 sticky top-0 flex flex-col gap-6">
      {/* TODO: Active filters summary/header */}
      <BrandFilter />
      <ModelFilter />
      <PriceSlider />
      <YearRange />
      <MileageRange />
      <TransmissionPills />
      <FuelPills />
      <PowerRange />
      <BodyTypeDropdown />
      <DriveCheckbox />
      <ExtraOptions />
      {/* ... add or adjust ordering as you like */}
    </aside>
  );
}
