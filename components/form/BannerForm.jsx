"use client";
import React, { useEffect, useState } from "react";
import EditImage from "@/components/form/EditImage";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { postData } from "@/services/api";

export default function BannerForm({ bannerData }) {
  const [file, setFile] = useState([]);
  const [motto, setMotto] = useState(bannerData.banner[0].quote);
  const [image, setImage] = useState(bannerData.banner[0].banner_link);
  const [loading, setLoading] = useState(false);
  const form = useForm({});

  useEffect(() => {
    if (file.length > 0) {
      setImage(URL.createObjectURL(file[0]));
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [file]);


  async function onSubmit(values) {
    try {
      const formData = new FormData();
      if (file.length > 0) formData.append("banner", file[0]);
      formData.append("quote", motto);
      setLoading(true);
      await postData("upload_banner", formData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Banner & Motto</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full mx-auto py-10"
        >
        <div className="w-full h-full">
          <EditImage 
            image={image}  
            file={file}
            setFile={setFile}
            form={form}
            banner={true}
          />
        </div>
        <Input type="text" value={motto} className="text-center py-8"
          style={{ fontSize: "1.5rem" }}
          onChange={(e) => setMotto(e.target.value)} 
        />
        <SubmitButton text="Save Changes" isLoading={loading} loadingText="Saving..." />
        </form>
      </Form>
    </>
  )
}
