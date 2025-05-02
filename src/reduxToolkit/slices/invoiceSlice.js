import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [
    { vendor: '1234567890', invoiceId: 'INV-000001', issueCount: 4 },
    { vendor: '1234567890', invoiceId: 'INV-000002', issueCount: 3 },
    { vendor: '1234567890', invoiceId: 'INV-000003', issueCount: 1 },
    { vendor: '1234567890', invoiceId: 'INV-000004', issueCount: 3 },
  ],
  status: 'idle',
  selectedInvoice: null,
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
      return {...state, invoices: [...state.invoices, action.payload]}
    },
    selectInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
    },
    clearSelectedInvoice: (state) => {
      state.selectedInvoice = null;
    }
  },
});

export const { approveInvoice, rejectInvoice, newInvoice, selectInvoice, clearSelectedInvoice } = invoicesSlice.actions;

export const selectAllInvoices = (state) => state.invoices.invoices;
export const selectedInvoice = (state) => state.invoices.selectInvoice;

export default invoicesSlice.reducer;