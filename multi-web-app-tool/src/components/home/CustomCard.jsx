import React from 'react';
import Card from 'react-bootstrap/Card';

function CustomCard({ header, title, text, bg = "primary" }) {
  // Removed the dynamic text color setting based on the bg prop

  return (
    <Card
      bg={bg}
      style={{ width: '18rem' }}
      className="mb-2 custom-card"
    >
      <Card.Header>{header}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
