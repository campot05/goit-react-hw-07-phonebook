import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://640b337c81d8a32198dd3197.mockapi.io/contacts',
});

export const getContacts = async () => {
  const response = await instance.get('/');

  return response.data;
};

export const addContact = async user => {
  const { data } = await instance.post('/', user);
  console.log(data);
  return data;
};

export const deleteContacts = async id => {
  const { data } = await instance.delete(`/${id}`);
  console.log(data);
  return data;
};
