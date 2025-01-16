"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp, Trash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BlockFormEdit from "./form/BlockFormEdit"

export default function DataRecords({ data, displayField }) {
  const [expandedRow, setExpandedRow] = useState(null)

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <div className="space-y-4">
          {data.map((record) => (
            <Card key={record.id} className="hover:shadow-sm hover:shadow-slate-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold cursor-pointer flex-1" onClick={() => toggleRow(record.id)}>{record[displayField]}</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => toggleRow(record.id)}>
                      {expandedRow === record.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(record.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {expandedRow === record.id && (
                  <BlockFormEdit record={record} />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
