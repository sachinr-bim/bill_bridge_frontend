import React from 'react'

export default function DashTop() {
  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
        {[
          { title: "Invoices Processed", value: "1,250" },
          { title: "Invoices Mismatched", value: "50" },
          { title: "Synced to DB/CRM", value: "1,200" },
          { title: "Invoices Paid", value: "200" },
          { title: "Emails Mailed to Vendors", value: "300" },
        ].map(({ title, value }) => (
          <div key={title} className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <p className="text-xl font-semibold text-blue-600">{value}</p>
          </div>
        ))}
      </div>
  )
}
