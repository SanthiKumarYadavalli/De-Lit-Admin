import { useRouter } from "next/navigation";

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
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }
}