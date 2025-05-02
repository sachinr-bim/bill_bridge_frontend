import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedInvoice } from '../../../reduxToolkit/slices/invoiceSlice';
import PaperClipIcon from '../../../assets/icons/PaperClipIcon';

export default function InvoiceDetail() {
  const dispatch = useDispatch();
  const selectedInvoice = useSelector(state => state.invoices.selectedInvoice);
  const [viewingAttachment, setViewingAttachment] = React.useState(null);

  if (!selectedInvoice) return null;

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const receiverEmails = typeof selectedInvoice.receiverEmails === 'string' 
    ? selectedInvoice.receiverEmails.split(',') 
    : selectedInvoice.receiverEmails || [];

  const handleViewAttachment = (attachment) => {
    if (attachment.file) {
      // Create a blob URL for viewing
      const url = URL.createObjectURL(attachment.file);
      setViewingAttachment({
        name: attachment.name,
        url: url,
        type: attachment.type
      });
    } else {
      // For already stored attachments (if they have URLs)
      setViewingAttachment(attachment);
    }
  };

  const handleCloseAttachment = () => {
    if (viewingAttachment?.url) {
      URL.revokeObjectURL(viewingAttachment.url);
    }
    setViewingAttachment(null);
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Invoice #{selectedInvoice.invoiceId} Details
              </h3>
              <button 
                onClick={() => dispatch(clearSelectedInvoice())}
                className="text-gray-500 hover:text-gray-700 font-4xl"
              >
                X
              </button>
            </div>

            {/* Invoice Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Vendor</p>
                <p className="mt-1 text-sm font-medium">{selectedInvoice.vendor}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Invoice ID</p>
                <p className="mt-1 text-sm font-medium">{selectedInvoice.invoiceId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Issues</p>
                <p className="mt-1 text-sm font-medium">{selectedInvoice.issueCount}</p>
              </div>
            </div>

            {/* Email Details Section */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-md font-medium mb-4">Email Details</h4>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">From</p>
                  <p className="mt-1 text-sm">{selectedInvoice.senderEmail || 'Not specified'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">To</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {receiverEmails.map((email, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {email.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Subject</p>
                  <p className="mt-1 text-sm">{selectedInvoice.subject || 'Invoice Discrepancy'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Message</p>
                  <div className="mt-1 p-3 bg-gray-50 rounded text-sm whitespace-pre-line">
                    {selectedInvoice.content || 'No message content'}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Attachments</p>
                  {selectedInvoice.attachments?.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {selectedInvoice.attachments.map((file, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleViewAttachment(file)}
                        >
                          <PaperClipIcon className="text-gray-500" size={16} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {file.type.split('/').pop().toUpperCase()} • {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-gray-500 italic">No Attachment Provided</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => dispatch(clearSelectedInvoice())}
                className="bg-[#1B61AD] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attachment Viewer Modal */}
      {viewingAttachment && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">{viewingAttachment.name}</h3>
              <button 
                onClick={handleCloseAttachment}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              {viewingAttachment.type.includes('image') ? (
                <img 
                  src={viewingAttachment.url} 
                  alt={viewingAttachment.name}
                  className="max-w-full max-h-[70vh] mx-auto"
                />
              ) : viewingAttachment.type.includes('pdf') ? (
                <iframe 
                  src={viewingAttachment.url} 
                  title={viewingAttachment.name}
                  className="w-full h-[70vh] border-0"
                />
              ) : (
                <div className="flex items-center justify-center h-[70vh]">
                  <p className="text-gray-500">
                    Preview not available for {viewingAttachment.type.split('/').pop()} files.<br />
                    Download the file to view it.
                  </p>
                </div>
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <a
                href={viewingAttachment.url}
                download={viewingAttachment.name}
                className="bg-[#1B61AD] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}