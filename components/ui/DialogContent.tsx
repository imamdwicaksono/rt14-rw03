import React, { ReactNode } from "react";
import { useDialog } from "@/components/ui/Dialog";

export const DialogContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { open, setOpen } = useDialog();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-md p-6 bg-white rounded shadow-lg">
        <button
          onClick={() => setOpen(false)}
          className="absolute text-gray-500 top-3 right-3 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
