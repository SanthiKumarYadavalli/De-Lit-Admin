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
import useFormSubmit from "@/hooks/use-form-submit";
import { postData } from "@/services/api";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default function InfoSectionForm({ setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const submitForm = useFormSubmit(setIsLoading, setIsOpen);

  function onSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    submitForm(() => postData("create_info", formData));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter content"
                  className="resize-none"
                  rows={7}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton text="Add new Section" loadingText="Adding..." isLoading={isLoading} />
      </form>
    </Form>
  );
}
