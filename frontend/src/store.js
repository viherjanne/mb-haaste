import { configureStore } from '@reduxjs/toolkit'
import { customerReducer } from './components/customer/customerSlices'
import { contactReducer } from './components/contact/contactSlices'

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    contacts: contactReducer
  },
})