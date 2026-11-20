"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { EmptyPortalView } from "@/components/arcade/EmptyPortalView";

export default function ManaCulturePage() {
  const router = useRouter();

  return (
    <EmptyPortalView
      author="Mana"
      themeColor="amber"
      route="/games/mana"
      onReturnToHub={() => router.push("/")}
    />
  );
}
