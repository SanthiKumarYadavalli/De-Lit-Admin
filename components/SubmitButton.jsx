import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

export default function SubmitButton({
  text,
  onClick,
  disabled,
  isLoading,
  loadingText = "Please wait",
}) {
  return (
    <Button type="submit" onClick={onClick} disabled={disabled}>
      {isLoading ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
}
