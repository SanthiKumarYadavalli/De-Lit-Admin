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

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
});

export default function ArticleFormEdit({ record }) {
  const [pdf, setPdf] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: record.title,
      description: record.description,
      author: record.author,
    },
  });

  function onSubmit(values) {
    console.log(values);
    console.log(pdf);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10 max-lg:m-4"
      >
        <div className="px-4 grid lg:grid-cols-2 gap-5 items-center">
          <div className="my-auto flex flex-col gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the title"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Author's name"
                      type="text"
                      {...field}
                    />
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
          </div>
          <div className="flex-col justify-center items-center">
            <MyFileInput
              type="pdf"
              name="pdf"
              form={form}
              file={pdf}
              setFile={setPdf}
              label="Upload PDF"
            />
            {record.pdf_link && (
              <div>
                <a
                  href={record.pdf_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80 text-sm"
                >
                  PDF Preview
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="px-4">
          <SubmitButton text={"Save Changes"} />
        </div>
      </form>
    </Form>
  );
}
