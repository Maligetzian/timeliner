import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import { Draggable } from '@hello-pangea/dnd';

const FormRow = ({ index, row, handleChange, useTimestamp }) => (
  <Draggable draggableId={`row-${index}`} index={index}>
    {(provided) => (
      <div
        className="grid grid-cols-2 gap-4 mb-4 bg-gray-200 p-4 rounded relative"
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <InputField
          label={useTimestamp ? 'Timestamp' : 'Number'}
          type={useTimestamp ? 'datetime-local' : 'number'}
          value={row.timestamp}
          onChange={(e) => handleChange(index, 'timestamp', e.target.value)}
          id={`toggleInput${index}`}
        />
        <TextAreaField
          label="Content"
          value={row.content}
          onChange={(e) => handleChange(index, 'content', e.target.value)}
          id={`content${index}`}
        />
        <div
          className="absolute top-0 right-0 p-2 cursor-move"
          {...provided.dragHandleProps}
        >
          <span className="text-gray-400">:::</span>
        </div>
      </div>
    )}
  </Draggable>
);

FormRow.propTypes = {
  index: PropTypes.number.isRequired,
  row: PropTypes.shape({
    timestamp: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  useTimestamp: PropTypes.bool.isRequired,
};

export default FormRow;
