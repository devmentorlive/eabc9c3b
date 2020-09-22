import React, { useState, useRef } from 'react';
import './styles.css';

function isRequired(val) {
  return val.length > 0 ? '' : 'cannot be blank';
}

function isEmail(val) {
  const ai = val.indexOf('@');
  const dis = val.split('').reduce((acc, char, i) => {
    return char === '.' ? i : acc;
  }, -1);
  return ai > -1 && dis > ai ? '' : 'must be a valid email';
}

export default function App() {
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState([]);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  function validate(validations) {
    setErrors(
      validations
        .map((errorsFor) => errorsFor(value))
        .filter((err) => err.length > 0),
    );
  }

  return (
    <div
      className={`form-field ${focused ? 'is-focused' : ''} ${
        value.length > 0 ? 'has-value' : ''
      }`}>
      <div className='control'>
        <label onClick={() => ref.current.focus()}>Name</label>
        <input
          ref={ref}
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            validate([isRequired, isEmail]);
            setFocused(false);
          }}
        />
      </div>
      {errors.length > 0 ? (
        <div className='has-error'>{errors.join(', ')}</div>
      ) : null}
    </div>
  );
}
