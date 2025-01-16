import PageWrapper from "@/components/PageWrapper";
import InfoSectionForm from "@/components/form/InfoSectionForm";
import DataRecords from "@/components/DataRecords";
import { infoSectionData } from "@/utils/dummy";
import InfoSectionFormEdit from "@/components/form/InfoSectionFormEdit";

export default function Page() {
  return (
    <PageWrapper title="Info Sections" itemName={"Section"} AddForm={InfoSectionForm}>
      <DataRecords data={infoSectionData} displayField="title" EditForm={InfoSectionFormEdit} />
    </PageWrapper>
  );
}