import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../api/contactsAPI';

export const fetchContactsList = createAsyncThunk(
  'contacts/fetch',
  async (_, thunkAPI) => {
    try {
      const data = await api.getContacts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact1 = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteContacts(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContact1 = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addContact(data);
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
