
export default function useFormSubmit(setIsLoading, setIsOpen) {
  return async function submitForm(apiCall) {
    try {
      setIsLoading(true);
      await apiCall();
      setIsLoading(false);
      if (setIsOpen) {
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  }
}