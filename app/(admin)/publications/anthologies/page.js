"use client";
import React from "react";

import PageWrapper from "@/components/PageWrapper";
import AnthologyForm from "@/components/form/AnthologyForm";
import DataRecords from "@/components/DataRecords";
import { ANTHOLOGIES } from "@/utils/dummy";
import AnthologyFormEdit from "@/components/form/AnthologyFormEdit";

export default function page() {
  return (
    <PageWrapper
      title={"Anthologies"}
      itemName={"Anthology"}
      AddForm={AnthologyForm}
    >
      <DataRecords
        data={ANTHOLOGIES}
        displayField="title"
        EditForm={AnthologyFormEdit}
      />
    </PageWrapper>
  );
}
