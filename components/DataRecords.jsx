"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DeleteButton from "./DeleteButton"

export default function DataRecords({ data, displayField, EditForm, deleteFunctionName }) {
  const [expandedRow, setExpandedRow] = useState(null)

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <div className="space-y-4">
          {data.map((record, i) => (
            <Card key={i} className="hover:shadow-sm hover:shadow-slate-500">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mr-4">
                  <h2 className="text-lg font-semibold cursor-pointer flex-1 p-4" onClick={() => toggleRow(i)}>{record[displayField]}</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => toggleRow(i)}>
                      {expandedRow === i ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <DeleteButton functionName={deleteFunctionName} id={record.id} />
                  </div>
                </div>
                {expandedRow === i && (
                  <EditForm record={record} />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
