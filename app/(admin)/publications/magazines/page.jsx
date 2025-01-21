"use client";
import React from "react";

import PageWrapper from "@/components/PageWrapper";
import MagazineForm from "@/components/form/MagazineForm";
import DataRecords from "@/components/DataRecords";
import { MAGAZINES } from "@/utils/dummy";
import MagazineFormEdit from "@/components/form/MagazineFormEdit";

export default function page() {
  return (
    <PageWrapper
      title={"Magazines"}
      itemName={"Magazine"}
      AddForm={MagazineForm}
    >
      <DataRecords
        data={MAGAZINES}
        displayField="title"
        EditForm={MagazineFormEdit}
      />
    </PageWrapper>
  );
}
