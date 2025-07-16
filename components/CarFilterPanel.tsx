// components/CarFilterPanel.tsx
"use client";
import carLogos from "../lib/carLogos";
import PriceSlider from "./filters/PriceSlider";
import YearRange from "./filters/YearRange";
import MileageRange from "./filters/MileageRange";
import TransmissionPills from "./filters/TransmissionPills";
import FuelPills from "./filters/FuelPills";
import PowerRange from "./filters/PowerRange";
import BodyTypeDropdown from "./filters/BodyTypeDropdown";
import DriveCheckbox from "./filters/DriveCheckbox";
import ExtraOptions from "./filters/ExtraOptions";

export default function CarFilterPanel({
  selectedCars = [],
  onOpenModal,
  onRemoveCar,
  onEditCar,
}: {
  selectedCars?: { make: string; models: string[] }[];
  onOpenModal?: () => void;
  onRemoveCar?: (index: number) => void;
  onEditCar?: (index: number) => void;
}) {
  return (
    <aside className="w-[340px] min-h-screen bg-white rounded-2xl shadow-lg px-6 py-6 sticky top-0 flex flex-col gap-6">
      {/* Selected cars at top */}
      {selectedCars && selectedCars.length > 0 && (
        <div className="mb-4 flex flex-col gap-3">
          {selectedCars.map((car, i) => (
            <div
              key={i}
              className="relative flex items-center bg-[#f5f6fa] rounded-lg p-3 gap-3 group cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => onEditCar && onEditCar(i)}
              tabIndex={0}
              title="Editează"
              role="button"
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") onEditCar && onEditCar(i);
              }}
            >
              <img src={carLogos[car.make]} alt={car.make} className="w-9 h-9 rounded" />
              <div>
                <div className="font-bold text-blue-800">{car.make}</div>
                <div className="text-xs text-gray-600">{car.models.join(", ")}</div>
              </div>
              {/* Remove button */}
              {onRemoveCar && (
                <button
                  onClick={e => { e.stopPropagation(); onRemoveCar(i); }}
                  className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-500 rounded-full w-6 h-6 flex items-center justify-center opacity-80 group-hover:opacity-100"
                  title="Șterge"
                  tabIndex={-1}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add car button */}
      <button
        className="flex items-center gap-2 border border-blue-600 rounded-lg px-4 py-2 text-blue-700 font-semibold hover:bg-blue-50 mb-4 transition"
        onClick={onOpenModal}
      >
        <span className="text-xl">+</span> Adăugați o mașină
      </button>

      {/* Place other filters here if needed */}

    </aside>
  );
}
