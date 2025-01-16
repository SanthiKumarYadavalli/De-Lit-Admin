import DataRecords from "@/components/DataRecords";
import PageWrapper from "@/components/PageWrapper";
import TestimonialForm from "@/components/form/TestimonialForm";
import TestimonialFormEdit from "@/components/form/TestimonialFormEdit";
import { clubTalks } from "@/utils/dummy";

export default function Page() {
  return (
    <PageWrapper title="Testimonials" itemName="Testimonial" AddForm={TestimonialForm}>
      <DataRecords data={clubTalks} displayField="title" EditForm={TestimonialFormEdit} />
    </PageWrapper>
  );
}