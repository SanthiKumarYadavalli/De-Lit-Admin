import PageWrapper from "@/components/PageWrapper";
import { getData } from "@/services/api";
import Error from "@/components/Error";
import DataRecords from "@/components/DataRecords";

export default async function Page() {
  let batches = {};
  try {
    const data = (await getData("get_all_members")).members;
    data.forEach(member => {
      if (!batches[member.batch]) {
        batches[member.batch] = [];
      }
      batches[member.batch].push(member);
    });
  } catch (error) {
    return <Error />;
  }
  return (
    <PageWrapper title="Members" itemName="Member">
      {Object.keys(batches).map(batch => (
        <div key={batch}>
          <h2 className="text-xl font-semibold pt-4">{batch}</h2>
          <DataRecords
            data={batches[batch]}
            displayField="member_name"
            deleteFunctionName="delete_member"
          />
        </div>
      ))}
    </PageWrapper>
  )
}