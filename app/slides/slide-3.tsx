export default function Slide3() {
  return (
    <section className="h-full !flex flex-col">
      <p className="font-bold text-center mb-4 text-6xl">Web Animation Tools</p>

      <div className="flex pt-12">
        <ul className="list-disc list-inside text-3xl !flex flex-col gap-4">
          <li>CSS Animations</li>
          <li>Keyframe animations</li>
          <li>Transitions</li>
          <li>Javascript animations</li>
          <li>GSAP, Motion, Spring.js, Anime.js</li>
          <li>Rive, Lottie</li>
        </ul>
      </div>
    </section>
  );
}
