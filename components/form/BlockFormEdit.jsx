"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  Formcontent,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EditImage from "./EditImage";
import SubmitButton from "../SubmitButton";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default function BlockFormEdit({ record }) {
  const [file, setFile] = useState([]);
  const [image, setImage] = useState(record.block_image_link);
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

  function onSubmit(values) {
    console.log(values);
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
                    <Input placeholder="shadcn" type="" {...field} />
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
        <SubmitButton text="Save Changes" onClick={onSubmit} />
      </form>
    </Form>
  );
}
