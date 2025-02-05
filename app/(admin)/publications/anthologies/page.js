import React from "react";

import PageWrapper from "@/components/PageWrapper";
import AnthologyForm from "@/components/form/AnthologyForm";
import DataRecords from "@/components/DataRecords";
import AnthologyFormEdit from "@/components/form/AnthologyFormEdit";
import { getData } from "@/services/api";

export default async function page() {
  let data = [];
  try {
    data = (await getData("get_all_publications?type=anthology")).publications;
  } catch (error) {
    return <Error />;
  }
  return (
    <PageWrapper
      title={"Anthologies"}
      itemName={"Anthology"}
      AddForm={AnthologyForm}
    >
      <DataRecords
        data={data}
        displayField="title"
        EditForm={AnthologyFormEdit}
        deleteFunctionName={"delete_publication"}
      />
    </PageWrapper>
  );
}
