import {
  FileInput,
  FileUploader,
} from "@/components/ui/file-upload";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { AspectRatio } from "../ui/aspect-ratio";
import { Edit2, ImageOff } from "lucide-react";
import Image from "next/image";


export default function EditImage({ form, file, setFile, image, banner = false }) {
  return (
    <FormField
      control={form.control}
      name="banner"
      render={({ field }) => (
        <FormItem>
          <FormLabel>image</FormLabel>
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
                    ratio={banner ? 16 / 9 : 1}
                    className="relative"
                    id="banner"
                  >
                      {image ?
                        (banner ? 
                          (<Image
                            src={image}
                            alt="Banner"
                            fill
                            className="object-cover object-center"
                          />
                        ) : (
                          <Image 
                            src={image}
                            alt="Image"
                            fill
                            className="object-contain"
                          />
                        )
                      ) : (
                        <div className="flex flex-col gap-2 justify-center items-center w-full h-full text-slate-500">
                          <ImageOff /><p>Image not available</p>
                        </div>
                      )}
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
