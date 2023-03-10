import { useState } from 'react';
import css from './ContactForm.module.css';
import { Notify } from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContacts } from 'redux/slice';
import { nanoid } from '@reduxjs/toolkit';
// ======
// import { addContact1 } from 'redux1/contacts/operations';
// fetchContactsList
// ======
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     const test = dispatch(fetchContactsList());
  //     console.log(test);
  //     console.log('получаем список с бекенда ');
  //   }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    //  dispatch(addContact1(formData));
    for (const contact of contacts) {
      if (contact.name.toLowerCase() === formData.name.toLowerCase()) {
        return Notify.failure(`${formData.name} is already in contacts.`);
      }
    }
    dispatch(addContact({ ...formData, id: nanoid() }));
    reset();
  };

  const reset = () => {
    setFormData({
      name: '',
      number: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={css.contactForm}>
      <label>
        Name <br />
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Number <br />
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={formData.number}
          onChange={handleChange}
        />
      </label>
      <br />
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
