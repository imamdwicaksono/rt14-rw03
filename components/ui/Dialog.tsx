import React, { createContext, useState, ReactNode, useContext } from "react";

interface DialogContextProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const Dialog: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("useDialog must be used inside a Dialog");
  return context;
};
