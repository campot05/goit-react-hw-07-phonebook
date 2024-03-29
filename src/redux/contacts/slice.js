import { createSlice } from '@reduxjs/toolkit';
import { fetchContactsList, addContact, deleteContact } from './operations';
const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    filterContact(state, { payload }) {
      state.filter = payload;
    },
  },
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
    [addContact.pending]: store => {
      store.contacts.isLoading = true;
      store.contacts.error = null;
    },
    [addContact.fulfilled]: (store, { payload }) => {
      store.contacts.isLoading = false;
      store.contacts.items.push(payload);
    },
    [addContact.rejected]: (store, { payload }) => {
      store.contacts.isLoading = false;
      store.contacts.error = payload;
    },
    [deleteContact.pending]: store => {
      store.contacts.isLoading = true;
      store.contacts.error = null;
    },
    [deleteContact.fulfilled]: (store, { payload }) => {
      store.contacts.isLoading = false;
      store.contacts.items = store.contacts.items.filter(
        item => item.id !== payload
      );
    },
    [deleteContact.rejected]: (store, { payload }) => {
      store.contacts.isLoading = false;
      store.contacts.error = payload;
    },
  },
});

export const contactReducer = contactsSlice.reducer;
export const { filterContact } = contactsSlice.actions;
