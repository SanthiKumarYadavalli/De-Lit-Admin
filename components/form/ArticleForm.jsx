"use client";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "../SubmitButton";
import MyFileInput from "./MyFileInput";
import { postData } from "@/services/api";
import useFormSubmit from "@/hooks/use-form-submit";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
});

export default function ArticleForm({ setIsOpen }) {
  const [pdf, setPdf] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const submitForm = useFormSubmit(setIsLoading, setIsOpen);

  function onSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("author", values.author);
    formData.append("type", "article");

    if (pdf.length > 0) formData.append("file", pdf[0]);

    submitForm(() => postData("create_publication", formData));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the title" type="text" {...field} />
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
                <Input placeholder="Enter author name" type="text" {...field} />
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
                  placeholder="Write something about the article..."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MyFileInput
          type="pdf"
          name="pdf"
          form={form}
          file={pdf}
          setFile={setPdf}
          label="Upload PDF"
        />
        <SubmitButton
          text={"Add new Article"}
          isLoading={isLoading}
          loadingText="Adding..."
          disabled={pdf.length === 0}
        />
      </form>
    </Form>
  );
}
