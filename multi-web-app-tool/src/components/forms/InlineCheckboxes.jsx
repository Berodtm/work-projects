import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InlineCheckboxes({ label, options, onChange }) {
  return (
    <Form.Group className="mt-3" >
      <Form.Label><strong>{label}</strong></Form.Label>
      <Row>
        {options.map((option, index) => (
          <Col xs={6} md={3} key={index}> {/* Adjust xs and md values as needed */}
            <Form.Check
              inline
              label={option.label}
              name={label.replace(/\s+/g, '').toLowerCase()}
              type="checkbox"
              id={`${label.replace(/\s+/g, '-').toLowerCase()}-${option.value}`}
              value={option.value}
              onChange={onChange}
            />
          </Col>
        ))}
      </Row>
    </Form.Group>
  );
}

export default InlineCheckboxes;
