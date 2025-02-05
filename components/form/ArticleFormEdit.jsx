"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "../SubmitButton";
import MyFileInput from "./MyFileInput";
import { Textarea } from "../ui/textarea";
import { postData } from "@/services/api";
import useFormSubmit from "@/hooks/use-form-submit";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
});

export default function ArticleFormEdit({ record }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: record.title,
      description: record.description,
      author: record.author,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = useFormSubmit(setIsLoading);

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("id", record.id);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("author", values.author);

    await submitForm(() => postData("update_publication", formData));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter Author's name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  className="resize-none"
                  rows={7}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {record.publication_file_link && (
          <div className="mt-2">
            <a
              href={record.publication_file_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80 text-sm"
            >
              Document preview
            </a>
          </div>
        )}
        <SubmitButton
          text="Save Changes"
          loadingText="Saving..."
          isLoading={isLoading}
        />
      </form>
    </Form>
  );
}
