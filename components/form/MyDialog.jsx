"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function MyDialog({ heading, triggerText, Form, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} onClose={() => setIsOpen(false)}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="h-4 w-4" />
            {triggerText}
          </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-center mt-3">{heading}</DialogTitle>
        </DialogHeader>
        <Form setIsOpen={setIsOpen} batches={props.batches} setBatches={props.setBatches} />
      </DialogContent>
    </Dialog>
  );
}
