import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useFormSubmit(setIsLoading, setIsOpen) {
  const router = useRouter();
  return async function submitForm(apiCall) {
    try {
      setIsLoading(true);
      await apiCall();
      setIsLoading(false);
      if (setIsOpen) {
        setIsOpen(false);
      }
      toast.success("Done!");
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!");
      console.error(error);
    }
  }
}