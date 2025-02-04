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
import EditImage from "./EditImage";
import { Textarea } from "../ui/textarea";
import { postData } from "@/services/api";
import useFormSubmit from "@/hooks/use-form-submit";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export default function AnthologyFormEdit({ record }) {
  const [file, setFile] = useState([]);
  const [image, setImage] = useState(record.cover_image_link);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: record.title,
      description: record.description,
    },
  });

  useEffect(() => {
    if (file.length > 0) {
      setImage(URL.createObjectURL(file[0]));
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [file]);

  const submitForm = useFormSubmit(setIsLoading);

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("id", record.id);
    formData.append("title", values.title);
    formData.append("description", values.description);

    if (file.length > 0) formData.append("image", file[0]);

    await submitForm(() => postData("update_publication", formData));
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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
          </div>
        </div>
        <div className="px-2">
          <SubmitButton
            text="Save Changes"
            loadingText="Saving..."
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
}
