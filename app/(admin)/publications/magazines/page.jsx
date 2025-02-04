import React from "react";

import PageWrapper from "@/components/PageWrapper";
import MagazineForm from "@/components/form/MagazineForm";
import DataRecords from "@/components/DataRecords";
import { MAGAZINES } from "@/utils/dummy";
import MagazineFormEdit from "@/components/form/MagazineFormEdit";
import { getData } from "@/services/api";

export default async function page() {
  let data = [];
  try {
    data = (await getData("get_all_publications?type=magazine")).publications;
  } catch (error) {
    return <Error />;
  }
  return (
    <PageWrapper
      title={"Magazines"}
      itemName={"Magazine"}
      AddForm={MagazineForm}
    >
      <DataRecords
        data={data}
        displayField="title"
        EditForm={MagazineFormEdit}
        deleteFunctionName={"delete_publication"}
      />
    </PageWrapper>
  );
}
