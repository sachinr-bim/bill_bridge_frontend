import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for file upload
export const uploadFile = createAsyncThunk(
  'invoices/uploadFile',
  async (file, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'https://betser.duckdns.org/billbridge/user/upload-global',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // Progress is handled via the setUploadProgress action
          }
        }
      );

      console.log('Upload File Data',response.data)
      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
      return rejectWithValue(
        'File upload failed'
      );
    }
  }
);

const initialState = {
  invoices: [
    { vendor: '1234567890', invoiceId: 'INV-000001', issueCount: 4 },
    { vendor: '1234567890', invoiceId: 'INV-000002', issueCount: 3 },
    { vendor: '1234567890', invoiceId: 'INV-000003', issueCount: 1 },
    { vendor: '1234567890', invoiceId: 'INV-000004', issueCount: 3 },
  ],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  selectedInvoice: null,
  uploadProgress: 0,
  uploadError: null,
  uploadSuccess: false,
  currentUploads: []
};

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    approveInvoice: (state, action) => {
      const { invoiceId } = action.payload;
      // In a real app, you would update the status of the invoice
      console.log(`Invoice ${invoiceId} approved`);
    },
    rejectInvoice: (state, action) => {
      const { invoiceId } = action.payload;
      // In a real app, you would update the status of the invoice
      console.log(`Invoice ${invoiceId} rejected`);
    },
    newInvoice: (state, action) => {
      state.invoices.unshift(action.payload);
    },
    selectInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
    },
    clearSelectedInvoice: (state) => {
      state.selectedInvoice = null;
    },
    resetUploadState: (state) => {
      state.uploadProgress = 0;
      state.uploadError = null;
      state.uploadSuccess = false;
      state.currentUploads = [];
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    addCurrentUpload: (state, action) => {
      state.currentUploads.push(action.payload);
    },
    removeCurrentUpload: (state, action) => {
      state.currentUploads = state.currentUploads.filter(
        file => file.name !== action.payload.name
      );
    }
  },
  extraReducers: (builder) => {
    builder
      // Upload File Cases
      .addCase(uploadFile.pending, (state) => {
        state.status = 'loading';
        state.uploadError = null;
        state.uploadSuccess = false;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.uploadSuccess = true;
        state.invoices.unshift(action.payload);
        state.uploadProgress = 100;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = 'failed';
        state.uploadError = action.payload;
        state.uploadProgress = 0;
      });
  }
});

// Action creators
export const { 
  approveInvoice,
  rejectInvoice,
  newInvoice,
  selectInvoice,
  clearSelectedInvoice,
  resetUploadState,
  setUploadProgress,
  addCurrentUpload,
  removeCurrentUpload
} = invoicesSlice.actions;

// Selectors
export const selectAllInvoices = (state) => state.invoices.invoices;
export const selectSelectedInvoice = (state) => state.invoices.selectedInvoice;
export const selectUploadStatus = (state) => state.invoices.status;
export const selectUploadProgress = (state) => state.invoices.uploadProgress;
export const selectUploadError = (state) => state.invoices.uploadError;
export const selectUploadSuccess = (state) => state.invoices.uploadSuccess;
export const selectCurrentUploads = (state) => state.invoices.currentUploads;

export default invoicesSlice.reducer;