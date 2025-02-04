import DataRecords from "@/components/DataRecords";
import PageWrapper from "@/components/PageWrapper";
import TestimonialForm from "@/components/form/TestimonialForm";
import TestimonialFormEdit from "@/components/form/TestimonialFormEdit";
import { getData } from "@/services/api";
import Error from "@/components/Error";

export default async function Page() {
  let data = [];
  try {
    data = (await getData("get_all_cards")).cards;
  } catch (error) {
    return <Error />;
  }
  return (
    <PageWrapper title="Testimonials" itemName="Testimonial" AddForm={TestimonialForm}>
      <DataRecords data={data} displayField="title" EditForm={TestimonialFormEdit} deleteFunctionName="delete_card" />
    </PageWrapper>
  );
}