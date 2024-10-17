document.getElementById("appRd").addEventListener("change", generateAutoUID)
document.getElementById("device-type-dkp").addEventListener("change", generateAutoUID)
document.getElementById("device-type-app").addEventListener("change", generateAutoUID)
document.getElementById("device-type-mbr").addEventListener("change", generateAutoUID)
document.getElementById("device-type-cwa").addEventListener("change", generateAutoUID)

document.querySelectorAll("#asset-type-checkboxes input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", generateAutoUID);
});


function generateAutoUID() {
    const uniqueIDInput = document.getElementById("unique-id");
    const campaignNameInput = document.getElementById("campaign-name");
    const appRedesignCheckBox = document.getElementById("appRd").checked;

    const deviceTypeDkp = document.getElementById("device-type-dkp").checked;
    const deviceTypeMbr = document.getElementById("device-type-mbr").checked;
    const deviceTypeCwa = document.getElementById("device-type-cwa").checked;
    const deviceTypeApp = document.getElementById("device-type-app").checked;

    const selectedAssetTypes = Array.from(document.querySelectorAll("#asset-type-checkboxes input[type='checkbox']:checked")).map(el => el.value);

    let campaignName = campaignNameInput.value.replace(/\s/g, "-");

    // Replace "lp" with "l0"
    campaignName = campaignName.replace(/lp/g, "l0");

    // Replace "-" with "0"
    campaignName = campaignName.replace(/-/g, "0");

    campaignName = campaignName.replace(/[&*!@#"^+$()%<>~]/g, "0");

    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString().slice(-2);

    // Create a set of allowed app redesign asset types
    const arAssetTypes = new Set(["afw", "gam", "mam", "mmt", "sfw", "vpd", "aev"]);
    const hasArQualifyingAsset = selectedAssetTypes.some(assetType => arAssetTypes.has(assetType));
    const hasNonArQualifyingAsset = selectedAssetTypes.some(assetType => !arAssetTypes.has(assetType));

    // Determine the prefix length for the campaign name in the unique ID
    let campaignPrefix;
    if (appRedesignCheckBox && deviceTypeApp && hasArQualifyingAsset && !hasNonArQualifyingAsset && !deviceTypeDkp && !deviceTypeMbr && !deviceTypeCwa) {
        // Only app redesign asset types are selected (no other device types like dkp, mbr, cwa)
        campaignPrefix = campaignName.substring(0, 3).padEnd(3, "0");
    } else if (campaignName.trim().length > 0) {
        // Mixed or non-app redesign asset types, use 5 characters for the unique ID
        campaignPrefix = campaignName.substring(0, 5).padEnd(5, "0");
    } else {
        // If no valid case matches, clear the unique ID
        uniqueIDInput.value = "";
        return;
    }

    // Set the unique ID value
    uniqueIDInput.value = `${month}${year}${campaignPrefix}`;
}
