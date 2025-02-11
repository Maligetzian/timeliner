import React from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import { Draggable } from '@hello-pangea/dnd';
import Row from "./Row";

interface FormRowProps {
  index: number;
  row: Row;
  handleChange: (index: number, field: keyof Row, value: string) => void;
  useTimestamp: boolean;
}

// Define the FormRow component with TypeScript
const FormRow: React.FC<FormRowProps> = ({ index, row, handleChange, useTimestamp }) => (
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
                onChange={(e: { target: { value: string; }; }) => handleChange(index, 'timestamp', e.target.value)}
                id={`toggleInput${index}`}
            />
            <TextAreaField
                label="Content"
                value={row.content}
                onChange={(e: { target: { value: string; }; }) => handleChange(index, 'content', e.target.value)}
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

export default FormRow;
