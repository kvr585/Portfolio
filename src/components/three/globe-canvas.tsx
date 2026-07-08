"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const NetworkGlobe = dynamic(
  () => import("@/components/three/network-globe").then((m) => m.NetworkGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-48 w-48 animate-pulse rounded-full border border-border-subtle bg-bg-panel/50" />
      </div>
    ),
  }
);

export function GlobeCanvas() {
  return (
    <div className="relative h-[320px] w-full md:h-[480px] lg:h-[560px]" aria-hidden="true">
      <Suspense fallback={null}>
        <NetworkGlobe />
      </Suspense>
    </div>
  );
}
