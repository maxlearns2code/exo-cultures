"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CRTOverlay } from "@/components/arcade/CRTOverlay";
import { MartinGame } from "@/components/games/martin/MartinGame";
import { useArcadeInput } from "@/hooks/useArcadeInput";

export default function MartinCulturePage() {
  const router = useRouter();

  const handleReturnToHub = () => {
    router.push("/");
  };

  const { exitHoldProgress, hasGamepad } = useArcadeInput(undefined, handleReturnToHub);

  return (
    <CRTOverlay exitHoldProgress={exitHoldProgress} hasGamepad={hasGamepad}>
      <MartinGame onReturnToHub={handleReturnToHub} />
    </CRTOverlay>
  );
}
