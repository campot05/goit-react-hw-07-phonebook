import { createSlice } from '@reduxjs/toolkit';
import { fetchContactsList, addContact1, deleteContact } from './operations';
const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: contacts,
  initialState: initialState,
  extraReducers: {
    [fetchContactsList.pending]: store => {
      store.contacts.isLoading = true;
      store.contacts.error = null;
    },
    [fetchContactsList.fulfilled]: (store, { payload }) => {
      store.contacts.isLoading = false;
      store.contacts.items = payload;
    },
    [fetchContactsList.rejected]: (store, { payload }) => {
      store.contacts.isLoading = false;
      store.contacts.error = payload;
    },
    [addContact1.pending]: store => {
      store.contacts.isLoading = true;
      store.contacts.error = null;
    },
    [addContact1.fulfilled]: (store, { payload }) => {
      store.contacts.isLoading = false;
      store.contacts.items.push(payload);
    },
    [addContact1.rejected]: (store, { payload }) => {
      store.contacts.isLoading = false;
      store.contacts.error = payload;
    },
    [deleteContact1.pending]: store => {
      store.contacts.isLoading = true;
      store.contacts.error = null;
    },
    [deleteContact1.fulfilled]: (store, { payload }) => {
      store.contacts.isLoading = false;
      store.contacts.items = store.contacts.items.filter(
        item => item.id !== payload
      );
    },
    [deleteContact1.rejected]: (store, { payload }) => {
      store.contacts.isLoading = false;
      store.contacts.error = payload;
    },
  },
});

export const contactReducer = contactsSlice.reducer;
