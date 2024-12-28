import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PreviewImage({
  imageDialogOpen,
  src,
  setImageDialogOpen,
}) {
  return (
    <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Full Image Preview</DialogTitle>
        </DialogHeader>
        {src && (
          <div className="flex justify-center">
            <img
              src={src}
              alt="Full Cover"
              className="max-h-[80vh] rounded-md"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
