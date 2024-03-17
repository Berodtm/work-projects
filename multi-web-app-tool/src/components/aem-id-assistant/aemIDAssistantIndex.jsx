import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Dropdown, FloatingInput, InlineCheckboxes, CustomButton } from '../forms/FormIndex';

function AemIDAssistantIndex() {
    const [AemId, SetAemId] = useState();
    return (
        <>
            <Row>
                <Col>
                    <FloatingInput label="Insert AEM ID" id="aemId" type="text" onChange={(e) => SetAemId(e.target.value)} />
                </Col>
            </Row>
        </>
    )
}


export default AemIDAssistantIndex;