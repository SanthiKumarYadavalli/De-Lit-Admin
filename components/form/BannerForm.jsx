"use client";
import React, { useEffect, useState } from "react";
import EditImage from "@/components/form/EditImage";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";

export default function BannerForm() {
  const [file, setFile] = useState([]);
  const currMotto = "Building a like-minded community!";
  const [motto, setMotto] = useState(currMotto);
  const [image, setImage] = useState("https://www.pixel4k.com/wp-content/uploads/2023/02/the-batman-2022-wide-4k_1675639354-1536x864.jpg");
  const form = useForm({});

  useEffect(() => {
    if (file.length > 0) {
      setImage(URL.createObjectURL(file[0]));
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [file]);


  function onSubmit(values) {
    console.log(file);
    console.log(motto);
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
        <SubmitButton text="Save Changes" onClick={onSubmit} disabled={file.length === 0 && motto === currMotto} />
        </form>
      </Form>
    </>
  )
}
