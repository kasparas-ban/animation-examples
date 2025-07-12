"use client";

import { Deck, DefaultTemplate } from "spectacle";
import Slide1 from "./slide-css-anim";
import Slide2 from "./slide-waapi-anim";
import SlideInitial from "./slide-initial";
import SlideIntro from "./slide-outline";
import SlideInspo from "./slide-inspo";
import SlideBrowser from "./slide-browser";

export default function Page() {
  return (
    <Deck template={<DefaultTemplate />}>
      <SlideInitial />
      <SlideInspo />
      <SlideIntro />
      <Slide1 />
      <Slide2 />
      <SlideBrowser />
    </Deck>
  );
}
