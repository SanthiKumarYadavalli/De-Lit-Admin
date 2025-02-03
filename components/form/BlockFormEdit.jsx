"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import EditImage from "./EditImage";
import SubmitButton from "../SubmitButton";
import { postData } from "@/services/api";
import useFormSubmit from "@/hooks/use-form-submit";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default function BlockFormEdit({ record }) {
  const [file, setFile] = useState([]);
  const [image, setImage] = useState(record.block_image_link);
  const [isLoading, setIsLoading] = useState(false);
  const submitForm = useFormSubmit(setIsLoading);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: record.block_title,
      content: record.block_content,
    },
  });

  useEffect(() => {
    if (file.length > 0) {
      setImage(URL.createObjectURL(file[0]));
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [file]);

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("id", record.id);
    formData.append("block_title", values.title);
    formData.append("block_content", values.content);
    if (file.length > 0) formData.append("block_image", file[0]);
    await submitForm(() => postData("update_block", formData));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10 max-lg:m-4"
      >
        <div className="grid lg:grid-cols-2 gap-4">
          <EditImage form={form} file={file} setFile={setFile} image={image} />
          <div className="my-auto flex flex-col gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      rows={7}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <SubmitButton text="Save Changes" isLoading={isLoading} loadingText="Saving..." />
      </form>
    </Form>
  );
}
