import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MyDialog({ heading, triggerText, children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
            {triggerText}
          </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-center mt-3">{heading}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
