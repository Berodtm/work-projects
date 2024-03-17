import React, { useState } from 'react';
import { Card, Nav } from 'react-bootstrap';

function ToolContainer({ tabs }) { // Removed the theme prop
  const [activeTab, setActiveTab] = useState(tabs[0].eventKey);

  const handleSelect = (eventKey) => setActiveTab(eventKey);

  // Removed the logic for determining the card's theme
  return (
    <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey={tabs[0].eventKey} onSelect={handleSelect}>
          {tabs.map((tab) => (
            <Nav.Item key={tab.eventKey}>
              <Nav.Link eventKey={tab.eventKey}>{tab.title}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Header>
      <Card.Body>
        {tabs.map((tab) => {
          if (tab.eventKey === activeTab) {
            return (
              <React.Fragment key={tab.eventKey}>
                <Card.Title>{tab.title}</Card.Title>
                <div>{tab.content}</div>
              </React.Fragment>
            );
          }
          return null;
        })}
      </Card.Body>
    </Card>
  );
}

export default ToolContainer;
