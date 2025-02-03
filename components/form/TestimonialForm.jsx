"use client";
import { useState } from "react";
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
import SubmitButton from "../SubmitButton";
import MyFileInput from "./MyFileInput";
import { postData } from "@/services/api";

const formSchema = z.object({
  name: z.string(),
  quote: z.string(),
});

export default function TestimonialForm() {
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.name);
    formData.append("content", values.quote);
    if (file.length > 0) formData.append("profile_image", file[0]);
    setIsLoading(true);
    await postData("create_card", formData);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
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
                  placeholder="Enter their quote"
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <MyFileInput
          name="image"
          file={file}
          setFile={setFile}
          type="image"
          form={form}
          label="Upload display picture"
        />
        <SubmitButton text="Add a new testimonial" isLoading={isLoading} loadingText="Adding..." />
      </form>
    </Form>
  );
}
