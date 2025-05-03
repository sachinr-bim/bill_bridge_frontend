import React, { useState } from 'react';

// Components
import UploadBox from './UploadBox/UploadBox'

export default function UploadDocument() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // File type validation
  const isValidFileType = (file) => {
    const allowedTypes = [ 'image/jpeg','image/png','application/pdf','application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ];
    return allowedTypes.includes(file.type);
  };

  // File size validation (50MB max)
  const isValidFileSize = (file) => file.size <= 50 * 1024 * 1024;

  // Mock validation function for invoice/PO matching
  const validateInvoicePO = async () => {
    // In a real app, this would be an API call to your validation service
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate random validation (20% chance of error for demo purposes)
        const isValid = Math.random() > 0.2;
        resolve({
          isValid,
          errors: isValid ? [] : ['Failed to upload file']
        });
      }, 500);
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const processFiles = async (files) => {
    setValidationErrors([]);
    
    // Basic file validation
    const validFiles = files.filter(file => 
      isValidFileType(file) && isValidFileSize(file)
    );

    // Set invalid files error if any
    if (validFiles.length !== files.length) {
      setValidationErrors(prev => [
        ...prev,
        'Some files were invalid. Only JPG, PNG, PDF or Excel files under 50MB are allowed.'
      ]);
    }

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      setUploadStatus('ready');
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setUploadStatus('validating');
    setValidationErrors([]);
    
    try {
      // Validate each file for invoice/PO matching
      const validationResults = await Promise.all(
        selectedFiles.map(file => validateInvoicePO(file))
      );
      
      // Check for validation errors
      const errors = validationResults.flatMap(result => result.errors);
      if (errors.length > 0) {
        setValidationErrors(errors);
        setUploadStatus('validation-failed');
        return;
      }
      
      // Proceed with upload if validation passed
      setUploadStatus('uploading');
      
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(i);
      }
      
      setUploadStatus('complete');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setUploadStatus(null);
        setSelectedFiles([]);
        setUploadProgress(0);
      }, 3000);
      
    } catch{
      setValidationErrors(['An unexpected error occurred during validation']);
      setUploadStatus('error');
    }
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    if (newFiles.length === 0) {
      setUploadStatus(null);
    }
  };

  const resetUpload = () => {
    setSelectedFiles([]);
    setUploadStatus(null);
    setUploadProgress(0);
    setValidationErrors([]);
  };

  return (
    <main className="flex-1 p-10">
      <h2 className="text-2xl font-semibold mb-2">Upload Your Invoices & POs</h2>
      <p className="text-gray-600 mb-4">Drag, drop, and let AI do the heavy lifting.</p>
      
      <hr className='mb-4 border-gray-200' />

      {/* Upload Box */}
        <UploadBox isDragging={isDragging} uploadProgress={uploadProgress} handleFileChange={handleFileChange} 
        handleDragOver={handleDragOver} handleDragLeave={handleDragLeave} handleDrop={handleDrop} handleUpload={handleUpload} 
        removeFile={removeFile} selectedFiles={selectedFiles} uploadStatus={uploadStatus} validationErrors={validationErrors} resetUpload={resetUpload} />
      
    </main>
  );
}