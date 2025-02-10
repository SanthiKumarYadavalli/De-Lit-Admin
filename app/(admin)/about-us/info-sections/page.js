import PageWrapper from "@/components/PageWrapper";
import InfoSectionForm from "@/components/form/InfoSectionForm";
import DataRecords from "@/components/DataRecords";
import InfoSectionFormEdit from "@/components/form/InfoSectionFormEdit";
import { getData } from "@/services/api";
import Error from "@/components/Error";

export default async function Page() {
  let data = [];
  try {
    data = (await getData("get_all_infos")).infos;
  } catch (error) {
    return <Error />
  }
  return (
    <PageWrapper title="Info Sections" itemName={"Section"} AddForm={InfoSectionForm}>
      <DataRecords data={data} displayField="title" EditForm={InfoSectionFormEdit} deleteFunctionName="delete_info" />
    </PageWrapper>
  );
}