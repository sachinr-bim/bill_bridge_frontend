import React from 'react'

export default function DashMiddle() {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">Invoice Processed vs Mismatch</h2>
            <select className="text-sm border rounded p-1">
              <option>This Year</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-60 bg-gradient-to-t from-blue-300 to-blue-500 rounded-md flex items-center justify-center text-white">
            Chart Placeholder (Bar Chart)
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <div className="w-3 h-3 bg-blue-800 rounded-full"></div> Invoices Processed
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div> Invoices Mismatched
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">Invoice Processed vs Mismatch</h2>
            <select className="text-sm border rounded p-1">
              <option>This Year</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-60 bg-gradient-to-t from-blue-200 to-blue-700 rounded-full flex items-center justify-center text-white">
            Chart Placeholder (Donut Chart)
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-800 rounded-full"></div> Invoices Processed
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div> Invoices Paid
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-300 rounded-full"></div> Emails Mailed to Vendors
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div> Invoices Mismatched
            </div>
          </div>
        </div>
      </div>
  )
}
