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
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "../SubmitButton";
import MyFileInput from "./MyFileInput";
import { postData } from "@/services/api";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default function BlockForm({ setIsOpen }) {
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("block_title", values.title);
    formData.append("block_content", values.content);
    formData.append("block_image", image[0]);
    try {
      setIsLoading(true);
      await postData("create_block", formData);
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
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
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <MyFileInput type="image" name="image" form={form} file={image} setFile={setImage} label="Upload Image" />
        <SubmitButton text={"Add a new Block"} disabled={image.length === 0} isLoading={isLoading} loadingText="Adding..." />
      </form>
    </Form>
  );
}
