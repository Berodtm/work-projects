import React from 'react';
import ToolContainer from './ToolContainer'; 
import CustomCard from '../home/CustomCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AemIdGenIndex from '../aem-id-gen/AemIdGenIndex';

function HomeToolContainer() { 
  const tabs = [
    {
      eventKey: 'home',
      title: 'Home',
      content: (
        <>
         
            <p>Welcome to the home tab! This is where you start.</p>
            <Row >
              <Col>
                <CustomCard
                  header="What's New?"
                  title="New React Components"
                  text="Using React's Library and Bootstrap powerful CSS"
                />
              </Col>
              <Col>
                <CustomCard 
                  header="Placeholder Nav Inserted"
                  title="Top Nav"
                  text="Navigations Links will be populated later in development"
                  bg="success"
                />
              </Col>
              <Col>
                <CustomCard 
                  header="Placeholder Tab Container"
                  title="Dynamic Tabs"
                  text="The Tools will appear when selecting the dynamic tabs."
                  bg="light"
                />
              </Col>
            </Row>
   
          
        </>
      ),
    },
    {
      eventKey: 'aemIdAssistant',
      title: 'AEM ID Assistant',
      content: 'Here\'s where the AEM ID Assistant will go.',
    },
    {
      eventKey: 'aemIdGenerator',
      title: 'AEM ID Generator',
      content: <AemIdGenIndex />,
    }
  ];

  return <ToolContainer tabs={tabs} />; // Removed the theme prop
}

export default HomeToolContainer;
