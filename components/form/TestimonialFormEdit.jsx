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
  name: z.string(),
  quote: z.string(),
});

export default function TestimonialFormEdit({ record }) {
  const [file, setFile] = useState([]);
  const [image, setImage] = useState(record.profile_image);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: record.title,
      quote: record.content,
    },
  });
  const submitForm = useFormSubmit(setIsLoading);

  useEffect(() => {
    if (file.length > 0) {
      setImage(URL.createObjectURL(file[0]));
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [file]);

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("id", record.id);
    formData.append("title", values.name);
    formData.append("content", values.quote);
    if (file.length > 0) formData.append("profile_image", file[0]);
    await submitForm(() => postData("update_card", formData));
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
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
        <SubmitButton text="Save Changes" loadingText="Saving..." isLoading={isLoading} />
      </form>
    </Form>
  );
}
