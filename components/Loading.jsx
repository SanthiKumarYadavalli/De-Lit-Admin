import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
