import PageWrapper from "@/components/PageWrapper";
import { getData } from "@/services/api";
import Error from "@/components/Error";
import DataRecords from "@/components/DataRecords";
import MemberFormAdd from "@/components/form/MemberFormAdd";
import MemberFormEdit from "@/components/form/MemberFormEdit";

export default async function Page() {
  let batches = {};
  try {
    const data = (await getData("get_all_members")).members;
    data.forEach(member => {
      if (!batches[member.batch]) {
        batches[member.batch] = {};
        batches[member.batch].year = member.year;
        batches[member.batch].members = [];
      }
      batches[member.batch].members.push(member);
    });
  } catch (error) {
    return <Error />;
  }

  return (
    <PageWrapper title="Members" itemName="Member" AddForm={MemberFormAdd} batches={batches}>
      {Object.keys(batches).map(batch => (
        <div key={batch}>
          <div className="flex items-center justify-between px-4">
            <h2 className="text-xl font-semibold pt-4">{batch}</h2>
          </div>
          <DataRecords
            data={batches[batch].members}
            displayField="member_name"
            EditForm={MemberFormEdit}
            deleteFunctionName="delete_member"
          />
        </div>
      ))}
    </PageWrapper>
  )
}