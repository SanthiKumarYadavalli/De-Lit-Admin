import React from "react";

import PageWrapper from "@/components/PageWrapper";
import ArticleForm from "@/components/form/ArticleForm";
import DataRecords from "@/components/DataRecords";
import { ARTICLES } from "@/utils/dummy";
import ArticleFormEdit from "@/components/form/ArticleFormEdit";
import { getData } from "@/services/api";

export default async function page() {
  let data = [];
  try {
    data = (await getData("get_all_publications?type=article")).publications;
  } catch (error) {
    return <Error />;
  }
  return (
    <PageWrapper title={"Articles"} itemName={"Article"} AddForm={ArticleForm}>
      <DataRecords
        data={data}
        displayField="title"
        EditForm={ArticleFormEdit}
        deleteFunctionName={"delete_publication"}
      />
    </PageWrapper>
  );
}
