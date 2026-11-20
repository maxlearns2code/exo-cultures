"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { EmptyPortalView } from "@/components/arcade/EmptyPortalView";

export default function AisahCulturePage() {
  const router = useRouter();

  return (
    <EmptyPortalView
      author="Aisah"
      themeColor="emerald"
      route="/games/aisah"
      onReturnToHub={() => router.push("/")}
    />
  );
}
