import DataRecords from "@/components/DataRecords";
import PageWrapper from "@/components/PageWrapper";
import BlockForm from "@/components/form/BlockForm";
import BlockFormEdit from "@/components/form/BlockFormEdit";
import { getData } from "@/services/api";
import Error from "@/components/Error";

export default async function Page() {
  let homeBlocks = [];
  try {
    homeBlocks = (await getData("get_all_blocks")).blocks;
  } catch (error) {
    return <Error />;
  }
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
