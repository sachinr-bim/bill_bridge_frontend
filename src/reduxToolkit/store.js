import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from './slices/invoiceSlice';
import transactionReducer from './slices/transactionSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    transactions: transactionReducer,
    auth: authReducer,
  },
});