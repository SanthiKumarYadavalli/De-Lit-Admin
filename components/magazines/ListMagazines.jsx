"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import AddMagazineDialog from "./AddMagazine";
import EditMagazineDialog from "./EditMagazine";

import PreviewImage from "../PreviewImage";
import { ConfirmationDialog } from "../ConfirmationDialog";

export default function ListMagazines() {
  const [magazines, setMagazines] = useState([]);
  const [addMagazine, setAddMagazine] = useState(false);
  const [editMagazine, setEditMagazine] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [seletecdImage, setSelectedImage] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteMagazineId, setDeleteMagazineId] = useState(null);

  const handleAddMagazine = (newMagazine) => {
    setMagazines((prev) => [...prev, { ...newMagazine, id: prev.length + 1 }]);
    console.log("Added Magazine:", newMagazine);
  };

  const handleEditMagazine = (updatedMagazine) => {
    setMagazines((prev) =>
      prev.map((magazine) =>
        magazine.id === updatedMagazine.id ? updatedMagazine : magazine
      )
    );
    console.log("Updated Magazine:", updatedMagazine);
  };

  const handleDeleteMagazine = (id) => {
    setMagazines((prev) => prev.filter((magazine) => magazine.id !== id));
    console.log("Deleted Magazine:", id);
    setDeleteConfirmation(false);
  };

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Magazines</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setAddMagazine(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Magazine
            </Button>
          </div>
        </div>
        {magazines.length === 0 ? (
          <div className="text-lg text-center text-gray-300">
            No magazines added
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Title</TableHead>
                    <TableHead>Cover Photo</TableHead>
                    <TableHead>PDF File</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {magazines.map((magazine) => (
                    <TableRow key={magazine.id}>
                      <TableCell className="font-medium">
                        {magazine.title}
                      </TableCell>
                      <TableCell>
                        <img
                          src={magazine.coverPhotoPreview}
                          alt={magazine.title}
                          className="h-20 w-12 rounded-md object-cover"
                          onClick={() => {
                            setImageDialogOpen(true);
                            setSelectedImage(magazine.coverPhotoPreview);
                          }}
                        />
                        <PreviewImage
                          imageDialogOpen={imageDialogOpen}
                          setImageDialogOpen={setImageDialogOpen}
                          src={seletecdImage}
                        />
                      </TableCell>
                      <TableCell>
                        <a
                          href={URL.createObjectURL(magazine.pdfFile)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline hover:text-primary/80"
                        >
                          View PDF
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="icon"
                          className="mr-2"
                          onClick={() => setEditMagazine(magazine)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setDeleteConfirmation(true);
                            setDeleteMagazineId(magazine.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <ConfirmationDialog
                          isOpen={deleteConfirmation}
                          onClose={() => setDeleteConfirmation(false)}
                          onConfirm={() =>
                            handleDeleteMagazine(deleteMagazineId)
                          }
                          message={`Are you sure you want to delete this magazine ${deleteMagazineId}?`}
                          submitting={false}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
      <AddMagazineDialog
        isOpen={addMagazine}
        onClose={() => setAddMagazine(false)}
        onAddMagazine={handleAddMagazine}
      />
      <EditMagazineDialog
        isOpen={editMagazine !== null}
        onClose={() => setEditMagazine(null)}
        onUpdate={handleEditMagazine}
        data={editMagazine}
      />
    </>
  );
}
