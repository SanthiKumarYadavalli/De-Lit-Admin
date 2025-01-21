"use client";
import React from "react";

import PageWrapper from "@/components/PageWrapper";
import ArticleForm from "@/components/form/ArticleForm";
import DataRecords from "@/components/DataRecords";
import { ARTICLES } from "@/utils/dummy";
import ArticleFormEdit from "@/components/form/ArticleFormEdit";

export default function page() {
  return (
    <PageWrapper title={"Articles"} itemName={"Article"} AddForm={ArticleForm}>
      <DataRecords
        data={ARTICLES}
        displayField="title"
        EditForm={ArticleFormEdit}
      />
    </PageWrapper>
  );
}
