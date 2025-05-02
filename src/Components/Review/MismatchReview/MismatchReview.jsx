import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { approveInvoice, rejectInvoice, selectAllInvoices, selectInvoice } from '../../../reduxToolkit/slices/invoiceSlice';

// Components
import InvoiceDetail from './InvoiceDetail';

export default function MismatchReview() {
  const invoices = useSelector(selectAllInvoices);
  const dispatch = useDispatch();

  const handleApprove = (invoiceId) => {
    dispatch(approveInvoice({ invoiceId }));
  };

  const handleReject = (invoiceId) => {
    dispatch(rejectInvoice({ invoiceId }));
  };

  const handleViewDetails = (invoice) => {
    dispatch(selectInvoice(invoice));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-1">Mismatch Review</h2>
      <p className="text-gray-500 mb-4">Review, Approve, and Take Command.</p>

      <hr className='mb-4 border-gray-200' />

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-6 py-3 font-medium">VENDOR</th>
              <th className="px-6 py-3 font-medium">INVOICE ID</th>
              <th className="px-6 py-3 font-medium">ISSUE COUNT</th>
              <th className="px-6 py-3 font-medium">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {invoices.map((ele, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{ele.vendor}</td>
                <td className="px-6 py-4 text-blue-600 font-medium cursor-pointer hover:underline">
                  {ele.invoiceId}
                </td>
                <td className="px-6 py-4">{ele.issueCount}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button 
                    onClick={() => handleApprove(ele.invoiceId)}
                    className="bg-[#1B61AD] text-white px-3 py-1 rounded-md text-sm hover:bg-white border border-[#1B61AD] hover:text-[#1B61AD] transition"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReject(ele.invoiceId)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-white border border-red-600 hover:text-red-600 transition"
                  >
                    Reject
                  </button>
                  <button onClick={() => handleViewDetails(ele)} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InvoiceDetail />
    </div>
  );
}