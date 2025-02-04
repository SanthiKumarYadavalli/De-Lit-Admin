import { Toaster } from "react-hot-toast";

export default function MyToaster() {
  return (
    <Toaster 
      position="bottom-left"
      toastOptions={{
        style: {
          color: "black",
          marginTop: "30px",
          marginBottom: "30px",
          marginLeft: "40px"
        }
      }}
    />);
}