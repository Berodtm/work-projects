import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomButton from './CustomButton'; // Adjust the import path as necessary

function ButtonGrid() {
  const buttonVariants = [
    { variant: "primary", label: "Primary" },
    { variant: "secondary", label: "Secondary" },
    { variant: "success", label: "Success" },
    { variant: "warning", label: "Warning" },
    { variant: "danger", label: "Danger" },
    { variant: "info", label: "Info" },
    { variant: "light", label: "Light" },
    { variant: "dark", label: "Dark" },
    { variant: "link", label: "Link" }
  ];

  return (
    <Row>
      {buttonVariants.map((button, index) => (
        <Col key={index} xs={6} md={2} className="mb-2"> {/* Adjust grid breakpoints as needed */}
          <CustomButton variant={button.variant} label={button.label} />
        </Col>
      ))}
    </Row>
  );
}

export default ButtonGrid;
