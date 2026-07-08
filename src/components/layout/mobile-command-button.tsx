"use client";

import { Command } from "lucide-react";
import { useCommandPalette } from "@/components/providers/app-providers";

export function MobileCommandButton() {
  const { setOpen } = useCommandPalette();

  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full glass shadow-xl md:hidden"
      aria-label="Open command palette"
    >
      <Command className="h-5 w-5 text-text-primary" />
    </button>
  );
}
