import { Slide } from "spectacle";

export default function SlideInspo() {
  return (
    <Slide>
      <section className="relative h-full flex flex-col">
        <div className="absolute inset-0 flex flex-col">
          <p className="font-bold text-center pb-8 text-6xl">
            Wild Viral Forms
          </p>

          <iframe
            className="w-full h-96"
            src="https://codepen.io/aaroniker/embed/ZEYoxEY"
          />
        </div>
      </section>
    </Slide>
  );
}
