import { useState } from "react";
import { deleteData } from "@/services/api";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ functionName, id }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);
      await deleteData(functionName, id);
      setIsLoading(false);
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setIsOpen(true)}>
          <Trash className="h-4 w-4" />
      </Button>
      {isOpen && (
        <ConfirmationDialog
          isOpen={isOpen}
          onConfirm={handleDelete}
          onClose={() => setIsOpen(false)}
          message="Are you sure you want to delete this?"
          submitting={isLoading}
        />)
      }
    </>
  );
}