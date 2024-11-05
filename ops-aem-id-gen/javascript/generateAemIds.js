// Assuming offerIDSet is declared globally
let offerIDSet = new Set();

function generateAEMIDs() {
  // Helper function to get checked values from checkbox groups
  function getCheckedValues(containerId) {
    const checkboxes = document.querySelectorAll(
      `#${containerId} input[type='checkbox']:checked`
    );
    return Array.from(checkboxes).map((checkbox) => checkbox.value);
  }

  // Get values from form inputs
  const productTypeSelect = document.getElementById('product-type').value;
  const placementTypeSelect = document.getElementById('placement-type').value;
  const tokensSelect = document.getElementById('tokens').value;
  const ratedSelect = document.getElementById('rated').value;
  const purposeSelect = document.getElementById('purpose').value;
  const subProductInput = document
    .getElementById('sub-product')
    .value.toLowerCase();
  const campaignNameInput = document
    .getElementById('campaign-name')
    .value.toLowerCase();
  const uniqueIDInput = document
    .getElementById('unique-id')
    .value.toLowerCase();
  const versionInput = parseInt(document.getElementById('version').value, 10);

  const selectedBrands = getCheckedValues('brand-checkboxes');
  const selectedAssetTypes = getCheckedValues('asset-type-checkboxes');
  const selectedDeviceTypes = getCheckedValues('device-type');

  // Validate inputs
  if (
    !productTypeSelect ||
    !placementTypeSelect ||
    !tokensSelect ||
    !ratedSelect ||
    !purposeSelect ||
    !subProductInput ||
    !campaignNameInput ||
    !uniqueIDInput ||
    selectedBrands.length === 0 ||
    selectedAssetTypes.length === 0 ||
    selectedDeviceTypes.length === 0
  ) {
    alert(
      'Please fill in all fields and select at least one checkbox in each group.'
    );
    return;
  }


  const appRedesignCheckBox = document.getElementById('appRd').checked;
  const arAssetTypes = new Set([
    'afw',
    'gam',
    'mam',
    'mmt',
    'sfw',
    'vpd',
    'aev',
  ]);

  // Iterate over each selected brand, asset type, and device type
  selectedBrands.forEach((brand) => {
    selectedAssetTypes.forEach((assetType) => {
      selectedDeviceTypes.forEach((deviceType) => {
        // Skip invalid combinations based on business logic
        if (
          (deviceType === 'mbr' &&
            !['bpt', 'asm', 'stk', 'dpp', 'fea'].includes(assetType)) ||
          (deviceType === 'app' &&
            ['stk', 'til', 'fea', 'vpd'].includes(assetType)) ||
          (deviceType === 'dkp' &&
            [
              'mmt',
              'lob',
              'mrc',
              'nvt',
              'phl',
              'afw',
              'aev',
              'gam',
              'mam',
              'sfw',
              'pom',
              'vpd',
            ].includes(assetType)) ||
          (deviceType === 'cwa' && !['vpd'].includes(assetType))
        ) {
          return;
        }

        for (let i = 1; i <= versionInput; i++) {
          // Generate base offer ID components
          const bosdkpbpt =
            brand.substring(0, 3) +
            deviceType.substring(0, 3) +
            assetType;
          const subProductFormatted = subProductInput.replace(/\s/g, '-');
          const campaignNameFormatted = campaignNameInput.replace(/\s/g, '-');
          const isAppRedesign =
            appRedesignCheckBox &&
            arAssetTypes.has(assetType) &&
            deviceType === 'app';

          // Prepare the uniqueIDInput for app redesign if necessary
          let uniqueIDBase;
          if (isAppRedesign) {
            uniqueIDBase = uniqueIDInput.slice(0, 7); // Trim to 7 characters
          } else {
            uniqueIDBase = uniqueIDInput.padEnd(8, '0'); // Ensure it has 8 characters
          }

          // Construct the offerIDBase without the version number
          let offerIDBase = `${bosdkpbpt}-${subProductFormatted}-${campaignNameFormatted}-${uniqueIDBase}`;

          // Get a unique offer ID
          const uniqueOfferID = getUniqueOfferID(
            offerIDBase,
            offerIDSet,
            i,
            isAppRedesign
          );

          // Construct the full ID
          const id = `core-leads/${brand}/${productTypeSelect}/${deviceType}/${assetType}/${placementTypeSelect}/${tokensSelect}/${ratedSelect}/${purposeSelect}/${uniqueOfferID}`;

          // Add the ID to the array if not already present
          if (!generatedIDArray.includes(id)) {
            generatedIDArray.push(id); // Add ID to array
          }
        }
      });
    });
  });

  // Update the textarea with the generated IDs
  const generatedIDsTextArea = document.getElementById('generated-ids');
  generatedIDsTextArea.value = generatedIDArray.join('\n');
}
function getUniqueOfferID(offerIDBase, existingOfferIDs, initialVersionNumber, isAppRedesign) {
  let versionNumber = initialVersionNumber;
  let uniqueID;
  let baseWithoutSuffix = offerIDBase;

  if (isAppRedesign) {
    // Remove 'ar' from the end of offerIDBase if present
    if (offerIDBase.endsWith('ar')) {
      baseWithoutSuffix = offerIDBase.slice(0, -2);
    }
    uniqueID = `${baseWithoutSuffix}${versionNumber}ar`;
  } else {
    uniqueID = `${offerIDBase}${versionNumber}`;
  }

  let offerID = uniqueID;

  // Ensure offerID is unique
  while (existingOfferIDs.has(offerID)) {
    versionNumber += 1;
    if (isAppRedesign) {
      uniqueID = `${baseWithoutSuffix}${versionNumber}ar`;
    } else {
      uniqueID = `${offerIDBase}${versionNumber}`;
    }
    offerID = uniqueID;
  }

  // Add the new unique offerID to the set
  existingOfferIDs.add(offerID);

  return offerID;
}
