import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({ label, value, onChange, id }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default TextAreaField;
