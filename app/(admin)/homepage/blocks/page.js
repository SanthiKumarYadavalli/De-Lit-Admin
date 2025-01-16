import DataRecords from "@/components/DataRecords";
import PageWrapper from "@/components/PageWrapper";
import BlockForm from "@/components/form/BlockForm";
import BlockFormEdit from "@/components/form/BlockFormEdit";
import { homeBlocks } from "@/utils/dummy";

export default function Page() {
  return (
    <PageWrapper title="Blocks" itemName="Block" AddForm={BlockForm}>
      <DataRecords data={homeBlocks} displayField="name" EditForm={BlockFormEdit} />
    </PageWrapper>
  );
}
