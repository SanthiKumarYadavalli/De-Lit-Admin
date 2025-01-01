import PageWrapper from "@/components/PageWrapper";
import BlockForm from "@/components/form/BlockForm";

export default function Page() {
  return (
    <PageWrapper title="Blocks" itemName="Block" FormComponent={BlockForm} />
  );
}
