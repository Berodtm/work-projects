function generateAEMIDs() {
  function getCheckedValues(containerId) {
    const checkboxes = document.querySelectorAll(
      `#${containerId} input[type='checkbox']:checked`
    );
    return Array.from(checkboxes).map((checkbox) => checkbox.value);
  }
  
  const productTypeSelect = document.getElementById("product-type").value;
  const placementTypeSelect = document.getElementById("placement-type").value;
  const tokensSelect = document.getElementById("tokens").value;
  const ratedSelect = document.getElementById("rated").value;
  const purposeSelect = document.getElementById("purpose").value;
  const subProductInput = document
    .getElementById("sub-product")
    .value.toLowerCase(); 
  const campaignNameInput = document
    .getElementById("campaign-name")
    .value.toLowerCase(); 
  const uniqueIDInput = document
    .getElementById("unique-id")
    .value.toLowerCase(); 
  const versionInput = document.getElementById("version").value;
  
  const selectedBrands = getCheckedValues("brand-checkboxes");
  const selectedAssetTypes = getCheckedValues("asset-type-checkboxes");
  const selectedDeviceTypes = getCheckedValues("device-type");
  // Check if all fields are filled in and at least one checkbox is checked in each group
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
      "Please fill in all fields and select at least one checkbox in each group."
    );
    return;
  }

  // Clear previous IDs - commented this line out as I dont want to clear IDs but leaving it here in case a bug gets introduced. Will clean later. 
  // generatedIDArray = [];
  const appRedesignCheckBox = document.getElementById("appRd").checked
  const arAssetTypes = new Set(["afw", "gam", "mam", "mmt", "sfw", "vpd", "aev"]);
  
  // Iterate over each selected brand, asset type, and device type
  selectedBrands.forEach((brand) => {
    selectedAssetTypes.forEach((assetType) => {
      selectedDeviceTypes.forEach((deviceType) => {
        if (
          (deviceType === "mbr" &&
            !["bpt", "asm", "stk", "dpp", "fea"].includes(assetType)) ||
          (deviceType === "app" &&
            ["stk", "til", "fea", "vpd"].includes(assetType)) ||
          (deviceType === "dkp" &&
            [
              "mmt",
              "lob",
              "mrc",
              "nvt",
              "phl",
              "afw",
              "aev",
              "gam",
              "mam",
              "sfw",
              "pom",
              "vpd",
            ].includes(assetType)) ||
          (deviceType === "cwa" && !["vpd"].includes(assetType))
        ) {
          return;
        }
        const appRedesignCheckBox = document.getElementById("appRd");
        if (!appRedesignCheckBox.checked || (deviceType === "dkp" || deviceType === "mbr" || deviceType === "cwa")) {
          for (let i = 1; i <= versionInput; i++) {
            // Generate ID for each brand, asset type, and device type combination
            const bosdkpbpt =
              brand.substring(0, 3) + deviceType.substring(0, 3) + assetType;
            const id = `core-leads/${brand}/${productTypeSelect}/${deviceType}/${assetType}/${placementTypeSelect}/${tokensSelect}/${ratedSelect}/${purposeSelect}/${bosdkpbpt}-${subProductInput.replace(
              /\s/g,
              "-"
            )}-${campaignNameInput.replace(/\s/g, "-")}-${uniqueIDInput.replace(
              /\s/g,
              "-"
            )}${i}`;
            // Check if ID already exists
            if (!generatedIDArray.includes(id)) {
              generatedIDArray.push(id); // Add ID to array
            }
          }
        } else if (appRedesignCheckBox.checked) {
          for (let i = 1; i <= versionInput; i++) {
            // Generate ID for each brand, asset type, and device type combination
            const bosdkpbpt =
              brand.substring(0, 3) + deviceType.substring(0, 3) + assetType;
            let id = `core-leads/${brand}/${productTypeSelect}/${deviceType}/${assetType}/${placementTypeSelect}/${tokensSelect}/${ratedSelect}/${purposeSelect}/${bosdkpbpt}-${subProductInput.replace(
              /\s/g,
              "-"
            )}-${campaignNameInput.replace(/\s/g, "-")}-${uniqueIDInput.replace(
              /\s/g,
              "-"
            )}${i}ar`;
            // multi device and app redesign scenario 
            if (selectedDeviceTypes.length > 1) {
              const trimUniqueIDInput = uniqueIDInput.slice(0, -2); // Adjust the number of characters to trim as needed
              id = `core-leads/${brand}/${productTypeSelect}/${deviceType}/${assetType}/${placementTypeSelect}/${tokensSelect}/${ratedSelect}/${purposeSelect}/${bosdkpbpt}-${subProductInput.replace(
                /\s/g,
                "-"
              )}-${campaignNameInput.replace(/\s/g, "-")}-${trimUniqueIDInput}${i}ar`;
            } else {
              id = `core-leads/${brand}/${productTypeSelect}/${deviceType}/${assetType}/${placementTypeSelect}/${tokensSelect}/${ratedSelect}/${purposeSelect}/${bosdkpbpt}-${subProductInput.replace(
                /\s/g,
                "-"
              )}-${campaignNameInput.replace(/\s/g, "-")}-${uniqueIDInput.replace(
                /\s/g,
                "-"
              )}${i}ar`;
            }
            
            // Check if ID already exists
            if (!generatedIDArray.includes(id)) {
              generatedIDArray.push(id); // Add ID to array
            }
          }
        }
      });
    });
  });
  // Update the textarea with the generated IDs
  const generatedIDsTextArea = document.getElementById("generated-ids");
  generatedIDsTextArea.value = generatedIDArray.join("\n");
}