import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';

export const ContactList = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.contacts.contacts.items);

  return (
    <ul className={css.list}>
      {data.map(({ id, name, number }) => {
        return (
          <li key={id} className={css.name}>
            {name}: {number}
            <button
              className={css.btn}
              onClick={() => {
                dispatch(deleteContact(id));
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
