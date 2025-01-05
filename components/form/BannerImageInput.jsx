import {
  FileInput,
  FileUploader,
} from "@/components/ui/file-upload";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { AspectRatio } from "../ui/aspect-ratio";
import { Edit2 } from "lucide-react";
import Image from "next/image";


export default function BannerImageInput({ form, file, setFile, image }) {
  return (
    <FormField
      control={form.control}
      name="banner"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-3xl">Banner & Motto</FormLabel>
          <FormControl>
            <FileUploader
              value={file}
              onValueChange={setFile}
              reSelect={true}
              dropzoneOptions={{
                multiple: false,
                maxFiles: 5,
                accept: { "image/*": [".png", ".jpg", ".jpeg", ".svg", ".gif"] }
              }}
              className="relative bg-background rounded-lg p-2"
            >
              <FileInput
                id="fileInput"
              >
                 <AspectRatio
                    ratio={16 / 9}
                    className="relative"
                    id="banner"
                  >
                      <Image
                        src={image}
                        alt="Banner"
                        fill
                        className="object-cover object-center"
                      />
                      <div 
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out hover:cursor-pointer"
                      >
                        <h1 className="text-white text-4xl font-bold text-center">
                          <Edit2 />
                        </h1>
                      </div>
                  </AspectRatio>
              </FileInput>
            </FileUploader>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
