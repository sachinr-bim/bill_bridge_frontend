import React from 'react'

export default function UploadFailed({validationErrors,uploadStatus,resetUpload}) {
  return (
    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500">
          <h3 className="font-bold text-red-800">Validation Errors:</h3>
          <ul className="list-disc pl-5 mt-2 text-red-700">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          {uploadStatus === 'validation-failed' && (
            <button
              onClick={resetUpload}
              className="mt-3 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition"
            >
              Try Again
            </button>
          )}
    </div>
  )
}
