"use client";

import dynamic from "next/dynamic";

const Slides = dynamic(() => import("./slides"), { ssr: false });

export default function Page() {
  return <Slides />;
}
