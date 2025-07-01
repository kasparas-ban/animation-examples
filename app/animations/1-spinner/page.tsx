import Spinner from "@/components/spinner/spinner-css";
import SpinnerMotion from "@/components/spinner/spinner-motion";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <Spinner />
      <SpinnerMotion status="loading" />
    </div>
  );
}
