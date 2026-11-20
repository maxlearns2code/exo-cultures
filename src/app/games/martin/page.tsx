"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { EmptyPortalView } from "@/components/arcade/EmptyPortalView";

export default function MartinCulturePage() {
  const router = useRouter();

  return (
    <EmptyPortalView
      author="Martin"
      themeColor="violet"
      route="/games/martin"
      onReturnToHub={() => router.push("/")}
    />
  );
}
