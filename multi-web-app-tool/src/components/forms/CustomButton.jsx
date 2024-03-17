import React from 'react';
import Button from 'react-bootstrap/Button';

function CustomButton({ variant, label, onClick, className }) {
    return <Button variant={variant} onClick={onClick} className={className}>{label}</Button>;
  }

export default CustomButton;
