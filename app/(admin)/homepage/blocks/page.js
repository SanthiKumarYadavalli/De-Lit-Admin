import DataRecords from "@/components/DataRecords";
import PageWrapper from "@/components/PageWrapper";
import BlockForm from "@/components/form/BlockForm";
import { homeBlocks } from "@/utils/dummy";

export default function Page() {
  return (
    <PageWrapper title="Blocks" itemName="Block" FormComponent={BlockForm}>
      <DataRecords data={homeBlocks} displayField="name" />
    </PageWrapper>
  );
}
