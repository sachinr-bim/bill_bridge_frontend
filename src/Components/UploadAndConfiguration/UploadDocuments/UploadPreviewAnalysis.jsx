import React from 'react'

export default function UploadPreviewAnalysis({selectedFiles,removeFile,uploadStatus,handleUpload}) {
  return (
    <>
         <h3 className="text-xl font-medium mb-4">Selected Files:</h3>
            <ul className="mb-4">
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{file.name}</span>
                  <span className="text-gray-500 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <button 
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                    disabled={uploadStatus === 'uploading'}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            
            {uploadStatus === 'ready' && (
              <button 
                onClick={handleUpload}
                className="mt-4 px-6 py-3 bg-[#1B61AD] text-white text-xl rounded-lg hover:bg-white hover:text-[#1B61AD] hover:border-2 hover:border-[#1B61AD] transition duration-300"
              >
                Validate & Upload
              </button>
            )}

            {uploadStatus === 'validating' && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg">
                  Validating invoice/PO matching...
                </div>
            )}
    </>
  )
}
