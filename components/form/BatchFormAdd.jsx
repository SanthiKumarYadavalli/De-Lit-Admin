"use client";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import { Input } from "../ui/input";

export default function BatchFormAdd({ setBatches, batches, setIsOpen }) {
  const [newBatch, setNewBatch] = useState("");
  const [year, setYear] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setBatches({[newBatch]: { year, members: [] }, ...batches });
    setIsOpen(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full mx-auto py-10">
      <Input type="text" value={newBatch} placeholder="Enter name of the new batch"
          className="py-8"
          style={{ fontSize: "1.5rem" }}
          onChange={(e) => setNewBatch(e.target.value)} 
      />
      <Input type="number" value={year} placeholder="Enter the year"
        className="py-8"
        style={{ fontSize: "1.5rem" }}
        onChange={(e) => setYear(e.target.value)}
      />
      <SubmitButton text="Add Batch" disabled={!newBatch || !year} />
    </form>
  )
}