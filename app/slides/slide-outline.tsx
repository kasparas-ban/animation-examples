import { Slide } from "spectacle";

export default function SlideIntro() {
  return (
    <Slide>
      <section className="relative h-full flex flex-col">
        <div className="absolute inset-0 flex flex-col">
          <p className="font-bold text-center pb-8 text-6xl">Outline</p>

          <ul className="flex flex-col list-disc text-5xl gap-5">
            <li>Web Animation Tools</li>
            <li>CSS Animations</li>
            <li>Web Animations API</li>
            <li>Animation Libraries</li>
            <li>Rive, Lottie</li>
          </ul>
        </div>
      </section>
    </Slide>
  );
}
