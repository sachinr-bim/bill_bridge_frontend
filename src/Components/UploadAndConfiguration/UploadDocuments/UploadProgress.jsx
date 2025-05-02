import React from 'react'

export default function UploadProgress({uploadProgress}) {
  return (
    <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-4">
         <div className="bg-[#1B61AD] h-4 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
        </div>
        <p className="mt-2">Uploading... {uploadProgress}%</p>
    </div>
  )
}
