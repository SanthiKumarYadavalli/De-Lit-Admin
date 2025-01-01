import React from "react";
import PageWrapper from "@/components/PageWrapper";
import ArticleForm from "@/components/form/ArticleForm";

export default function page() {
  return (
    <PageWrapper
      title={"Articles"}
      itemName="Article"
      FormComponent={ArticleForm}
    />
  );
}
