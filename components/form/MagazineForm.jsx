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
import SubmitButton from "../SubmitButton";
import MyFileInput from "./MyFileInput";

const formSchema = z.object({
  title: z.string(),
});

export default function MagazineForm() {
  const [cover, setCover] = useState([]);
  const [pdf, setPdf] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values) {
    console.log(values);
    console.log(cover);
    console.log(pdf);
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
          text={"Add new magazine"}
          disabled={cover.length === 0 || pdf.length === 0}
        />
      </form>
    </Form>
  );
}
