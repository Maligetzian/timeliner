import React, { useState } from 'react';
import axios from 'axios';

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
        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`toggleInput${index}`}>
                {useTimestamp ? 'Timestamp' : 'Number'}
              </label>
              {useTimestamp ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`toggleInput${index}`}
                  type="datetime-local"
                  value={row.timestamp}
                  onChange={(e) => handleChange(index, 'timestamp', e.target.value)}
                />
              ) : (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`toggleInput${index}`}
                  type="number"
                  value={row.timestamp}
                  onChange={(e) => handleChange(index, 'timestamp', e.target.value)}
                />
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`content${index}`}>
                Content
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={`content${index}`}
                value={row.content}
                onChange={(e) => handleChange(index, 'content', e.target.value)}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setUseTimestamp(!useTimestamp)}
          >
            Toggle {useTimestamp ? 'Number' : 'Timestamp'}
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={addRow}
          >
            +
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
