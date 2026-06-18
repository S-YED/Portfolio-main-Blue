"use client";

import dynamic from "next/dynamic";

const CloudBackgroundScene = dynamic(() => import("./CloudBackgroundScene"), {
  ssr: false,
});

export default function CloudBackground() {
  return <CloudBackgroundScene />;
}
