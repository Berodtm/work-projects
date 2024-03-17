import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function FloatingInput({ label, id, type = "text", maxLength, minLength, onChange }) {
  return (
    <FloatingLabel controlId={id} label={label} className="mb-3 float-test-input">
      <Form.Control className=""
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        onChange={onChange}
        placeholder={label}
      />
    </FloatingLabel>
  );
}

export default FloatingInput;