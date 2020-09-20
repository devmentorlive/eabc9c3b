import React, { useState, useRef } from 'react';
import './styles.css';

export default function App() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

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
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
}
