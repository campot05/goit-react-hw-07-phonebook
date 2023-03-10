import css from './Filter.module.css';
import { useDispatch } from 'react-redux';

import { filterContact } from 'redux/contacts/slice';
const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div className={css.filter}>
      <label>
        Find contacts by name
        <input
          className={css.input}
          onChange={e => dispatch(filterContact(e.target.value))}
        />
      </label>
    </div>
  );
};

export default Filter;
