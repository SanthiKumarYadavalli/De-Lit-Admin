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
import useFormSubmit from "@/hooks/use-form-submit";
import SubmitButton from "../SubmitButton";
import MyFileInput from "./MyFileInput";
import { postData } from "@/services/api";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export default function AnthologyForm({ setIsOpen }) {
  const [cover, setCover] = useState([]);
  const [pdf, setPdf] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const submitForm = useFormSubmit(setIsLoading, setIsOpen);

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("type", "anthology");

    if (cover.length > 0) formData.append("image", cover[0]);
    if (pdf.length > 0) formData.append("file", pdf[0]);

    await submitForm(() => postData("create_publication", formData));
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
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write something about the anthology..."
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
          type="image"
          name="cover"
          form={form}
          file={cover}
          setFile={setCover}
          label="Upload Cover Image"
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
          text={"Add new anthology"}
          isLoading={isLoading}
          loadingText="Adding..."
          disabled={cover.length === 0 || pdf.length === 0}
        />
      </form>
    </Form>
  );
}
