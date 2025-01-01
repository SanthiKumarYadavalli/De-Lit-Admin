import React from "react";
import PageWrapper from "@/components/PageWrapper";
import MagazineForm from "@/components/form/MagazineForm";

export default function page() {
  return (
    <PageWrapper
      title={"Magazines"}
      itemName="Magazine"
      FormComponent={MagazineForm}
    />
  );
}
