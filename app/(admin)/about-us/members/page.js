"use client";
import { useState, useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import { getData } from "@/services/api";
import Error from "@/components/Error";
import DataRecords from "@/components/DataRecords";
import Loading from "@/components/Loading";
import BatchFormAdd from "@/components/form/BatchFormAdd";
import MyDialog from "@/components/form/MyDialog";
import MemberFormAdd from "@/components/form/MemberFormAdd";
import MemberFormEdit from "@/components/form/MemberFormEdit";

export default function Page() {
  const [batches, setBatches] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await getData("get_all_members")).members;
        let batchMap = {};
        data.forEach(member => {
          if (!batchMap[member.batch]) {
            batchMap[member.batch] = {};
            batchMap[member.batch].year = member.year;
            batchMap[member.batch].members = [];
          }
          batchMap[member.batch].members.push(member);
        });
        setBatches(batchMap);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <PageWrapper title="Members" itemName="Batch" AddForm={BatchFormAdd} setBatches={setBatches} batches={batches}>
      {Object.keys(batches).map(batch => (
        <div key={batch}>
          <div className="flex items-center justify-between px-4">
            <h2 className="text-xl font-semibold pt-4">{batch}</h2>
            <MyDialog 
              heading={`Add a new member to ${batch}`}
              triggerText="Add" 
              Form={MemberFormAdd} 
              year={batches[batch].year} 
              batch={batch} 
            />
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