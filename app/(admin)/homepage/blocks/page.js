import DataRecords from "@/components/DataRecords";
import PageWrapper from "@/components/PageWrapper";
import BlockForm from "@/components/form/BlockForm";
import BlockFormEdit from "@/components/form/BlockFormEdit";
import { getData } from "@/services/api";

export default async function Page() {
  const homeBlocks = (await getData("get_all_blocks")).blocks;
  return (
    <PageWrapper title="Blocks" itemName="Block" AddForm={BlockForm}>
      <DataRecords
        data={homeBlocks}
        displayField="block_title"
        EditForm={BlockFormEdit}
        deleteFunctionName="delete_block"
      />
    </PageWrapper>
  );
}
