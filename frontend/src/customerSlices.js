import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from './api'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  currentRequestId: null
}

// CUSTOMERS
const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'idle') {
          state.status = 'pending'
          state.currentRequestId = requestId
        }
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.data = action.payload
          state.currentRequestId = null
        }
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.error = action.error
          state.currentRequestId = null
        }
      })
      .addCase(fetchCustomerById.pending, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'idle') {
          state.status = 'pending'
          state.currentRequestId = requestId
        }
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.data = state.data.concat(action.payload)
          state.currentRequestId = null
        }
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.error = action.error
          state.currentRequestId = null
        }
      })
      .addCase(createCustomer.pending, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'idle') {
          state.status = 'pending'
          state.currentRequestId = requestId
        }
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.data = state.data.concat(action.payload)
          state.currentRequestId = null
        }
      })
      .addCase(createCustomer.rejected, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.error = action.error
          state.currentRequestId = null
        }
      })
      .addCase(fetchCustomerContacts.pending, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'idle') {
          state.status = 'pending'
          state.currentRequestId = requestId
        }
      })
      .addCase(fetchCustomerContacts.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.data = state.data.concat(action.payload)
          state.currentRequestId = null
        }
      })
      .addCase(fetchCustomerContacts.rejected, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.error = action.error
          state.currentRequestId = null
        }
      })
  },
})
export const customerReducer = customersSlice.reducer

export const fetchCustomers = createAsyncThunk(
  'customers',
  async () => {
    const result = await client('/api/customers')
    return result
  },
  {
    condition: (_args, { getState }) => {
      const { customers } = getState()
      return customers.status !== 'pending'
    }
  }
)

export const fetchCustomerById = createAsyncThunk(
  'customers/fetchById',
  async (id) => {
    const result = await client(`/api/customers/${id}`)
    return result
  },
  {
    condition: (id, { getState }) => {
      const { customers } = getState()
      return customers.status !== 'pending' && !customers.data.some(customer => customer.id === id)
    }
  }
)

export const createCustomer = createAsyncThunk(
  'customers/create',
  async (data) => {
    const result = await client(`/api/customers`, { data, method: 'POST' })
    return result
  }
)

export const updateCustomer = createAsyncThunk(
  'customers/update',
  async (data) => {
    const result = await client(`/api/customers/${data.id}`, { data, method: 'PUT' })
    return result
  }
)

// MB-TODO: create action for creating customer contacts. NOTE: remember to add them to `customerSlice`
export const createCustomerContact = createAsyncThunk(
  'customers/contacts/create',
  async (data) => {
    const result = await client(`/api/customers/${data.customerId}/contacts`, { data, method: 'POST' })
    return result
  }
)

export const deleteCustomerContact = createAsyncThunk(
  'customers/contacts/delete',
  async (data) => {
    const result = await client(`/api/customers/${data.customerId}/contacts/${data.contactId}`, { method: 'DELETE' })
    return result
  }
)

export const fetchCustomerContacts = createAsyncThunk(
  'customers/contacts/fetch',
  async (data) => {
    const result = await client(`/api/customers/${data.customerId}/contacts`)
    return result
  }
)
