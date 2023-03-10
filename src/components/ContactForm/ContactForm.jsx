import { useState, useEffect } from 'react';
import css from './ContactForm.module.css';
import { Notify } from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, fetchContactsList } from 'redux/contacts/operations';
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts.items);

  useEffect(() => {
    dispatch(fetchContactsList());
  }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    for (const contact of contacts) {
      if (
        formData.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
      ) {
        return Notify.failure(`${formData.name} is already in contacts.`);
      }
    }

    dispatch(addContact(formData));
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
