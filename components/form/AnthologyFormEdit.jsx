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
import EditImage from "./EditImage";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export default function AnthologyFormEdit({ record }) {
  const [cover, setCover] = useState([]);
  const [pdf, setPdf] = useState([]);
  const [image, setImage] = useState(record.image_link);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: record.title,
      description: record.description,
    },
  });

  useEffect(() => {
    if (cover.length > 0) {
      setImage(URL.createObjectURL(cover[0]));
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [cover]);

  function onSubmit(values) {
    console.log(values);
    console.log(cover);
    console.log(pdf);
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
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
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

        <div className="grid lg:grid-cols-2 gap-4 place-content-center align-middle">
          <EditImage
            form={form}
            file={cover}
            setFile={setCover}
            image={image}
          />
          <div className="flex flex-col justify-center">
            {record.pdf_link && (
              <div className="mt-2">
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
            <MyFileInput
              type="pdf"
              name="pdf"
              form={form}
              file={pdf}
              setFile={setPdf}
              label="Upload PDF"
            />
          </div>
        </div>

        <div className="px-4">
          <SubmitButton text={"Save Changes"} />
        </div>
      </form>
    </Form>
  );
}
