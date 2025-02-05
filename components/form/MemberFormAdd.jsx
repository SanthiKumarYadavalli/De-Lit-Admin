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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import SubmitButton from "../SubmitButton";
import MyFileInput from "./MyFileInput";
import { postData } from "@/services/api";
import useFormSubmit from "@/hooks/use-form-submit";

const formSchema = z.object({
  name: z.string(),
  quote: z.string(),
  about: z.string(),
});

export default function MemberFormAdd({ setIsOpen, batches }) {
  const [file, setFile] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState(null);
  const [batch, setBatch] = useState("");
  console.log(batch, year);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function handleChecked(e) {
    setChecked(!checked);
    setBatch("");
    setYear(null);
  }

  function handleSelectChange(value) {
    setBatch(value);
    setYear(batches[value].year);
  }

  const submitForm = useFormSubmit(setIsLoading, setIsOpen);

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("member_name", values.name);
    formData.append("quote", values.quote);
    formData.append("about", values.about);
    formData.append("year", year);
    formData.append("batch", batch);
    if (file.length > 0) formData.append("profile_image", file[0]);
    await submitForm(() => postData("create_member", formData));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write something about them"
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

        <FormField
          control={form.control}
          name="new"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={checked} onCheckedChange={handleChecked} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>New Batch</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch</FormLabel>
              {!checked ? (
                <Select onValueChange={handleSelectChange} defaultValue={batch}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(batches).map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <FormControl>
                  <Input
                    placeholder="Enter batch"
                    {...field}
                    onChange={(e) => setBatch(e.target.value)}
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {checked && (
          <FormField
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter year"
                    type="number"
                    onChange={(e) => setYear(e.target.value)}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <SubmitButton
          text="Add a new Member"
          isLoading={isLoading}
          loadingText="Adding..."
          disabled={file.length === 0 || !batch || (checked && !year)}
        />
      </form>
    </Form>
  );
}
