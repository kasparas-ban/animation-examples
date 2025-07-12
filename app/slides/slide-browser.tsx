import { ArrowBigRight } from "lucide-react";
import { Slide } from "spectacle";

export default function SlideBrowser() {
  return (
    <Slide>
      <section className="relative h-full flex flex-col">
        <div className="absolute inset-0 flex flex-col">
          <p className="font-bold text-center pb-10 text-6xl">
            Rendering Pipeline
          </p>

          <ul className="flex text-5xl gap-5 text-gray-800 items-center justify-center pt-50">
            <li className="py-4 px-5 bg-gray-100 rounded-3xl w-fit">parse</li>
            <li>
              <ArrowBigRight className="size-14 text-gray-100 fill-gray-100" />
            </li>
            <li className="py-4 px-5 bg-gray-100 rounded-3xl w-fit">style</li>
            <li>
              <ArrowBigRight className="size-14 text-gray-100 fill-gray-100" />
            </li>
            <li className="py-4 px-5 bg-gray-100 rounded-3xl w-fit">layout</li>
            <li>
              <ArrowBigRight className="size-14 text-gray-100 fill-gray-100" />
            </li>
            <li className="py-4 px-5 bg-gray-100 rounded-3xl w-fit">paint</li>
            <li>
              <ArrowBigRight className="size-14 text-gray-100 fill-gray-100" />
            </li>
            <li className="py-4 px-5 bg-gray-100 rounded-3xl w-fit">
              composite
            </li>
          </ul>
        </div>
      </section>
    </Slide>
  );
}
