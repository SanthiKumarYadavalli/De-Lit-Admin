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

const formSchema = z.object({
  title: z.string(),
});

export default function MagazineFormEdit({ record }) {
  const [file, setFile] = useState([]);
  const [image, setImage] = useState(record.image_link);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: record.title,
    },
  });

  useEffect(() => {
    if (file.length > 0) {
      setImage(URL.createObjectURL(file[0]));
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [file]);

  function onSubmit(values) {
    console.log(values);
    console.log(file);
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

            {record.pdf_link && (
              <div className="mt-2">
                <a
                  href={record.pdf_link}
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
