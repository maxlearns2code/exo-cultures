"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CRTOverlay } from "@/components/arcade/CRTOverlay";
import { ChromaticGame } from "@/components/games/chromatic/ChromaticGame";
import { useArcadeInput } from "@/hooks/useArcadeInput";

export default function ChromaticSymbiosisPage() {
  const router = useRouter();

  const handleReturnToHub = () => {
    router.push("/");
  };

  const { exitHoldProgress, hasGamepad } = useArcadeInput(undefined, handleReturnToHub);

  return (
    <CRTOverlay exitHoldProgress={exitHoldProgress} hasGamepad={hasGamepad}>
      <ChromaticGame onReturnToHub={handleReturnToHub} />
    </CRTOverlay>
  );
}
