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
import AddArticleDialog from "./AddArticle";
import EditArticleDialog from "./EditArticle";

const INITAL_DATA = [];

import { ConfirmationDialog } from "../confirmation-dialog";
export default function ListArticles() {
  const [articles, setArticles] = useState(INITAL_DATA);
  const [addArticle, setAddArticle] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteArticleId, setDeleteArticleId] = useState(null);

  const handleAddArticle = (newArticle) => {
    setArticles((prev) => [...prev, { ...newArticle, id: prev.length + 1 }]);
    console.log("Added Magazine:", newArticle);
  };

  const handleEditArticle = (updatedArticle) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === updatedArticle.id ? updatedArticle : article
      )
    );
    console.log("Updated Article:", updatedArticle);
  };

  const handleDeleteArticle = (id) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
    console.log("Deleted Article:", id);
    setDeleteConfirmation(false);
  };

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Articles</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setAddArticle(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Article
            </Button>
          </div>
        </div>
        {articles.length === 0 ? (
          <div className="text-lg text-center text-gray-300">
            No articles added
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>description</TableHead>
                    <TableHead>author</TableHead>
                    <TableHead>PDF File</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">
                        {article.title}
                      </TableCell>
                      <TableCell>{article.description}</TableCell>
                      <TableCell>{article.author}</TableCell>
                      <TableCell>
                        <a
                          href={URL.createObjectURL(article.pdfFile)}
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
                          onClick={() => setEditArticle(article)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setDeleteConfirmation(true);
                            setDeleteArticleId(article.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <ConfirmationDialog
                          isOpen={deleteConfirmation}
                          onClose={() => setDeleteConfirmation(false)}
                          onConfirm={() => handleDeleteArticle(deleteArticleId)}
                          message={`Are you sure you want to delete this article ${deleteArticleId}?`}
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
      <AddArticleDialog
        isOpen={addArticle}
        onClose={() => setAddArticle(false)}
        onAddArticle={handleAddArticle}
      />
      <EditArticleDialog
        isOpen={editArticle !== null}
        onClose={() => setEditArticle(null)}
        onUpdate={handleEditArticle}
        data={editArticle}
      />
    </>
  );
}
