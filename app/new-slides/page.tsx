"use client";

import { Deck, DefaultTemplate } from "spectacle";
import Slide1 from "./slide-1";
import Slide2 from "./slide-2";

export default function Page() {
  return (
    <Deck template={<DefaultTemplate />}>
      <Slide1 />
      <Slide2 />
    </Deck>
  );
}
