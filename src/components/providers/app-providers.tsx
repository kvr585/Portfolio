"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const CommandPaletteContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}

const RecruiterModeContext = createContext<{
  recruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
}>({
  recruiterMode: false,
  setRecruiterMode: () => {},
});

export function useRecruiterMode() {
  return useContext(RecruiterModeContext);
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      <RecruiterModeContext.Provider value={{ recruiterMode, setRecruiterMode }}>
        {children}
      </RecruiterModeContext.Provider>
    </CommandPaletteContext.Provider>
  );
}
