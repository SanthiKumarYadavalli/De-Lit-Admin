import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

export default function SubmitButton({
  text,
  onClick = () => {},
  disabled = false,
  isLoading = false,
  loadingText = "Please wait",
}) {
  return (
    <Button type="submit" onClick={onClick} disabled={isLoading || disabled}>
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
