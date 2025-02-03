import { useState } from "react";
import { deleteData } from "@/services/api";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import useFormSubmit from "@/hooks/use-form-submit";

export default function DeleteButton({ functionName, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const submitForm = useFormSubmit(setIsLoading, setIsOpen);

  async function handleDelete() {
    await submitForm(() => deleteData(functionName, id));
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