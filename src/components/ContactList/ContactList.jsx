import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContacts, getFilter } from 'redux/slice';
// ====
// import { deleteContact1 } from 'redux1/contacts/operations';
// ====
export const ContactList = () => {
  const dispatch = useDispatch();
  const test = useSelector(getContacts);
  const test1 = useSelector(getFilter);
  return (
    <ul className={css.list}>
      {test.map(({ id, name, number }) => {
        if (!name.toLowerCase().includes(test1.toLowerCase())) {
          return null;
        }
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
