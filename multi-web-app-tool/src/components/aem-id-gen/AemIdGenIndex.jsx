import React, { useState } from 'react';
import { Dropdown, FloatingInput, InlineCheckboxes, CustomButton } from '../forms/FormIndex';
import { brands, devices, products, assetTypes, placementType, tokens, rates, campaignObjective, uniqueIdNo } from '../../data/dataIndex';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function AemIdGenIndex() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedAssetType, setSelectedAssetType] = useState('');
  const [selectedPlacementType, setSelectedPlacementType] = useState('');
  const [selectedTokens, setSelectedTokens] = useState('');
  const [selectedRates, setSelectedRates] = useState('');
  const [selectedCampaignObjective, setSelectedCampaignObjective] = useState('');
  const [subProduct, setSubProduct] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [selectedUniqueIdNo, setSelectedUniqueIdNo] = useState('');

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <InlineCheckboxes label="Select Brand" options={brands} onChange={(e) => selectedBrand(e.target.value)} />
          </Col>
        </Row>
        <Row>
          <Col>
            <InlineCheckboxes label="Select Asset Type" options={assetTypes} onChange={(e) => setSelectedAssetType(e.target.value)} />
          </Col>
        </Row>
        <Row>
          <Col>
            <InlineCheckboxes label="Select Device" options={devices} onChange={(e) => setSelectedDevice(e.target.value)} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Dropdown label="Select Product" options={products} onChange={(e) => setSelectedProduct(e.target.value)} />
          </Col>
          <Col>
            <Dropdown label="Select Placement Type" options={placementType} onChange={(e) => setSelectedPlacementType(e.target.value)} />
          </Col>
          <Col>
            <Dropdown label="Select if asset has tokens" options={tokens} onChange={(e) => setSelectedTokens(e.target.value)} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Dropdown label="Select if asset has rates" options={rates} onChange={(e) => setSelectedRates(e.target.value)} />
          </Col>
          <Col>
            <Dropdown label="Select Campaign Objective" options={campaignObjective} onChange={(e) => setSelectedCampaignObjective(e.target.value)} />
          </Col>
          <Col>
            <Dropdown label="Select Unique ID Number" options={uniqueIdNo} onChange={(e) => setSelectedUniqueIdNo(e.target.value)} />
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingInput label="Enter Sub Product Text" id="subProduct" type="text" maxLength={20} minLength={2} onChange={(e) => setSubProduct(e.target.value)} />
          </Col>
          <Col>
            <FloatingInput label="Enter Campaign Text" id="campaign" type="text" maxLength={20} minLength={2} onChange={(e) => setCampaignName(e.target.value)} />
          </Col>
          <Col>
          <FloatingInput label="Unique ID Text" id="uniqueId" type="text" maxLength={9} minLength={9} onChange={(e) => setUniqueId(e.target.value)} />
          </Col>
        </Row>       
        <CustomButton variant="primary" label="Generate IDs" onClick={() => console.log("Generate IDs button test before functionality")} className="m-2" />
        <CustomButton variant="primary" label="Copy IDs" onClick={() => console.log("Copy IDs button test before functionality")} className="m-2" />
        <CustomButton variant="primary" label="Delete Last ID" onClick={() => console.log("Delete Last ID button test before functionality")} className="m-2" />
        <CustomButton variant="primary" label="Reset Form" onClick={() => console.log("Reset Form button test before functionality")} className="m-2" />
      </Form>
    </ Container>
  );
}

export default AemIdGenIndex;
