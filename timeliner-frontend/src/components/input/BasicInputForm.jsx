import React, { useState } from 'react';
import axios from 'axios';
import FormRow from './FormRow';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

const BasicInputForm = () => {
  const [useTimestamp, setUseTimestamp] = useState(true);
  const [rows, setRows] = useState([
    { timestamp: '', content: '' },
    { timestamp: '', content: '' },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/submit-form', rows);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const addRow = () => {
    setRows([...rows, { timestamp: '', content: '' }]);
  };

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newRows = Array.from(rows);
    const [reorderedItem] = newRows.splice(result.source.index, 1);
    newRows.splice(result.destination.index, 0, reorderedItem);
    setRows(newRows);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <label className="text-gray-700 text-sm font-bold mr-2">Timestamp</label>
            <span className="text-gray-400 text-sm">ex. 31.10.1517</span>
          </div>
          <div className="flex items-center">
            <label className="text-gray-700 text-sm font-bold mr-2">Content</label>
            <span className="text-gray-400 text-sm">ex. Luther does the thing in Wittenberg</span>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="rows">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {rows.map((row, index) => (
                  <FormRow
                    key={index}
                    index={index}
                    row={row}
                    handleChange={handleChange}
                    useTimestamp={useTimestamp}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={addRow}
          >
            +
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setUseTimestamp(!useTimestamp)}
          >
            Toggle {useTimestamp ? 'Number' : 'Timestamp'}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInputForm;
