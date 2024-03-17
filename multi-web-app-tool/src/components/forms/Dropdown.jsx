import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function Dropdown({ label, options, onChange }) {
  const selectId = `dropdown-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    // Add a custom class "mb-3" for margin-bottom or "mt-3" for margin-top to add whitespace
    <div className="mt-3 mb-3" > 
      <FloatingLabel controlId={selectId} label={label}>
        <Form.Select aria-label={label} onChange={onChange} >
          <option value="" >Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
    </div>
  );
}

export default Dropdown;
