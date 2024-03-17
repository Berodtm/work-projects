import React from 'react';
import Card from 'react-bootstrap/Card';

function QuoteElement() {
  return (
    <Card>
      <Card.Header>Quote Of The Day</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            These tools are amazing
          </p>
          <footer className="blockquote-footer">
            Rob Dunn <cite title="Source Title">Learning React Bootstrap</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default QuoteElement;
