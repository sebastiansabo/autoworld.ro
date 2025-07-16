// components/Modal.tsx
import React from "react";

export default function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xl relative">
        <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}
