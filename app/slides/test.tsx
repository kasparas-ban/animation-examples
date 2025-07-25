import { SpinnerToInput } from "@/components/spinner-to-input/spinner-to-input";
import { UserInput } from "@/components/spinner-to-input/user-input";

export default function Test() {
  return (
    <div className="relative max-w-[640px]">
      <UserInput />
      <SpinnerToInput />
    </div>
  );
}
