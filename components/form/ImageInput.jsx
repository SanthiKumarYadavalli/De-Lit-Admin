import { ImageUp, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";

export default function ImageInput({ name, form, file, setFile, label }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FileUploader
              value={file}
              onValueChange={setFile}
              dropzoneOptions={{
                maxFiles: 1,
                multiple: false,
                accept: {
                  "image/*": [".png", ".jpg", ".jpeg", ".svg", ".gif"],
                },
              }}
              className="relative bg-background rounded-lg p-2"
            >
              <FileInput
                id="fileInput"
                className="outline-dashed outline-1 outline-slate-500"
              >
                <div className="flex items-center justify-center flex-col p-8 w-full ">
                  <ImageUp className="text-gray-500 w-10 h-10 mb-5" />
                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                    &nbsp; or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
              </FileInput>
              <FileUploaderContent>
                {file.length > 0 && (
                  <FileUploaderItem index={0}>
                    <Paperclip className="h-4 w-4 stroke-current" />
                    <span>{file[0].name}</span>
                  </FileUploaderItem>
                )}
              </FileUploaderContent>
            </FileUploader>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
