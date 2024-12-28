import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddMagazineDialog({ isOpen, onClose, onAddMagazine }) {
  const [form, setForm] = useState({
    title: "",
    coverPhoto: null,
    pdfFile: null,
    coverPhotoPreview: null, // To store the preview URL for the cover photo
  });

  const [imageDialogOpen, setImageDialogOpen] = useState(false); // State for the image dialog

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setForm((prevForm) => ({
        ...prevForm,
        [name]: file,
        ...(name === "coverPhoto" && {
          coverPhotoPreview: URL.createObjectURL(file),
        }),
      }));
    }
  };

  const handleSubmit = () => {
    if (!form.title || !form.coverPhoto || !form.pdfFile) {
      alert("Please fill all fields before submitting!");
      return;
    }

    // Call the parent handler to add the magazine
    onAddMagazine(form);

    // Reset the form and close the dialog
    setForm({
      title: "",
      coverPhoto: null,
      pdfFile: null,
      coverPhotoPreview: null,
    });
    onClose();
  };

  return (
    <>
      {/* Main Add Magazine Dialog */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Magazine</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <Label htmlFor="title" className="block text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter magazine title"
              />
            </div>

            {/* Cover Photo Upload */}
            <div>
              <Label htmlFor="coverPhoto" className="block text-sm font-medium">
                Cover Photo
              </Label>
              <Input
                id="coverPhoto"
                type="file"
                name="coverPhoto"
                accept="image/*"
                onChange={handleFileChange}
              />
              {form.coverPhotoPreview && (
                <div className="mt-2">
                  <Label className="block text-sm font-medium">Preview</Label>
                  <img
                    src={form.coverPhotoPreview}
                    alt="Cover Preview"
                    className="mt-1 h-32 w-24 rounded-md object-cover cursor-pointer"
                    onClick={() => setImageDialogOpen(true)} // Open the full image dialog
                  />
                </div>
              )}
            </div>

            {/* PDF File Upload */}
            <div>
              <Label htmlFor="pdfFile" className="block text-sm font-medium">
                PDF File
              </Label>
              <Input
                id="pdfFile"
                type="file"
                name="pdfFile"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              {form.pdfFile && (
                <div className="mt-2">
                  <Label className="block text-sm font-medium">
                    PDF Preview
                  </Label>
                  <a
                    href={URL.createObjectURL(form.pdfFile)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    View PDF
                  </a>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button className="w-full mt-4" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Image Preview Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Full Image Preview</DialogTitle>
          </DialogHeader>
          {form.coverPhotoPreview && (
            <div className="flex justify-center">
              <img
                src={form.coverPhotoPreview}
                alt="Full Cover"
                className="max-h-[80vh] rounded-md"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
