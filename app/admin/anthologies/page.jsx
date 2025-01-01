import AnthologyForm from "@/components/form/AnthologyForm";
import PageWrapper from "@/components/PageWrapper";

export default function page() {
  return <PageWrapper title={"Anthologies"} itemName="Anthology" FormComponent={AnthologyForm} />;
}
