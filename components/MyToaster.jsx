import { Toaster } from "react-hot-toast";

export default function MyToaster() {
  return (
    <Toaster 
      position="top-right"
      toastOptions={{
        style: {
          color: "black",
          marginTop: "30px",
          marginRight: "40px"
        }
      }}
    />);
}