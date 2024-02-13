const appBaseUrl =
  "https://author-lloydsbg-production.adobecqms.net/mnt/overlay/dam/cfm/admin/content/v2/createfragment.html/content/dam/";
const appDeployBaseUrl =
  "https://author-lloydsbg-production.adobecqms.net/aem/experience-fragments.html/content/experience-fragments/";
const appBuildBaseFolder =
  "https://author-lloydsbg-production.adobecqms.net/assets.html/content/dam/";
const existingAppAssetBaseUrl =
  "https://author-lloydsbg-production.adobecqms.net/editor.html/content/dam/";
const dkpMbrBuildUrlBaseUrl =
  "https://author-lloydsbg-production.adobecqms.net/mnt/overlay/cq/experience-fragments/content/v2/experience-fragments/createxfwizard.html/content/experience-fragments/";
let deviceType = "";
let brandType = "";
let deviceTypeStatus = false;
let assetTypeArray = [
  "bpt",
  "asm",
  "til",
  "lnk",
  "stk",
  "dpp",
  "eal",
  "lob",
  "mrc",
  "nvt",
  "phl",
  "pom",
];
let aemIdSpaceFlag = false;
const productCodes = ['HINS', 'LINS']

function getDeviceType(aemID) {
  let deviceType = "";
  let deviceTypeStatus = false;
  if (
    (aemID.includes("app") && aemID.includes("dkp")) ||
    (aemID.includes("app") && aemID.includes("mbr")) ||
    (aemID.includes("dkp") && aemID.includes("mbr"))
  ) {
    console.log("error in AEM ID, device type miss-match");
    deviceType = "Error - Device Type mismatch";
  } else if (aemID.includes("app")) {
    console.log("Device Type = App");
    deviceType = "app";
    deviceTypeStatus = true;
  } else if (aemID.includes("dkp")) {
    console.log("Device type is Desktop");
    deviceType = "dkp";
    deviceTypeStatus = true;
  } else if (aemID.includes("mbr")) {
    console.log("Device type is Mobile Browser");
    deviceType = "mbr";
    deviceTypeStatus = true;
  } else {
    console.log("Error - Device type unknown");
    deviceType = "error";
  }
  return { deviceType, deviceTypeStatus };
}
function getBrand(aemID) {
  if (
    (aemID.includes("lly") && aemID.includes("bos")) ||
    (aemID.includes("lly") && aemID.includes("hal")) ||
    (aemID.includes("hal") && aemID.includes("bos")) ||
    (aemID.includes("mbn") && aemID.includes("bos")) ||
    (aemID.includes("mbn") && aemID.includes("hal")) ||
    (aemID.includes("mbn") && aemID.includes("lly"))
  ) {
    console.log("Error - Brand type mismatch");
    brandType = "Error - Brand type mismatch";
  } else if (aemID.includes("lly")) {
    brandType = "lly";
  } else if (aemID.includes("hal")) {
    brandType = "hal";
  } else if (aemID.includes("bos")) {
    brandType = "bos";
  } else if (aemID.includes("mbn")) {
    brandType = "mbn";
  }
  return brandType;
}
// check AEM ID for Brand Miss-match
function getAssetType(aemID, assetTypeArray) {
    // Split the AEM ID to check each part individually
    const parts = aemID.split('/');
    let assetType = "";
    let counter = 0;
  
    // Iterate through each part of the AEM ID
    parts.forEach(part => {
      // Only proceed if part is not in the productCodes array
      if (!productCodes.includes(part)) {
        if (assetTypeArray.includes(part)) {
          assetType = part;
          counter++;
        }
      }
    });
  
    if (counter > 1) {
      assetType = "Error - Asset type mismatch";
    } else if (counter === 0) {
      assetType = "Error - No valid asset type found";
    } else {
      console.log("Success: Asset type is " + assetType);
    }
  
    return assetType;
  }

// url construct code
function getAemUrls(aemID, appBaseUrl, deviceType, deviceTypeStatus) {
  const index = aemID.indexOf("core-leads");
  const lastIndex = aemID.lastIndexOf("/");
  const id = aemID.slice(index, lastIndex);
  let result = {};

  if (deviceType === "app" && deviceTypeStatus === true) {
    const appBuildUrl = appBaseUrl + id;
    console.log("AEM APP Build Link", appBuildUrl);
    result.appBuildUrl = appBuildUrl;
    const appBuildFolderUrl = appBuildBaseFolder + id;
    result.appBuildFolderUrl = appBuildFolderUrl;

    // Deploy AEM App url

    const appDeployUrl = appDeployBaseUrl + id;
    console.log("AEM App Deployment link", appDeployUrl);
    result.appDeployUrl = appDeployUrl;
  } else if (deviceTypeStatus === true) {
    const dkpMbrBuildUrl = dkpMbrBuildUrlBaseUrl + id;
    console.log(
      "Desktop and Mobile Browser AEM Direct Build link:",
      dkpMbrBuildUrl
    );
    result.dkpMbrBuildUrl = dkpMbrBuildUrl;

    const dkpMbrBuildUrlFolder = appDeployBaseUrl + id;
    console.log("Desktop and Mobile Browser AEM Folder link:", dkpMbrBuildUrl);
    result.dkpMbrBuildUrlFolder = dkpMbrBuildUrlFolder;
  }
  return result;
}

function resetPage() {
  // document.getElementById("aemID").value = "";
  document.getElementById("assetType").innerText = "";
  document.getElementById("deviceType").innerText = "";
  document.getElementById("brandType").innerText = "";
  document.getElementById("appBuildUrl").innerHTML = "";
  document.getElementById("appBuildFolderUrl").innerHTML = "";
  document.getElementById("appDeployUrl").innerHTML = "";
  document.getElementById("dkpMbrBuildUrl").innerHTML = "";
  document.getElementById("error").innerHTML = "";
  aemIdSpaceFlag = false;
  deviceTypeStatus = false;
  subIdCopyBtn.innerText = "Copy ID"
}

document.getElementById("submitBtn").addEventListener("click", () => {
  resetPage();
  const aemID = document.getElementById("aemID").value;
  let { deviceType, deviceTypeStatus } = getDeviceType(aemID);
  let assetType = getAssetType(aemID, assetTypeArray);
  let aemUrls = getAemUrls(aemID, appBaseUrl, deviceType, deviceTypeStatus);
  let brand = getBrand(aemID);
  document.getElementById("assetType").innerText =
    "Asset Type: " + assetType.toUpperCase();
  document.getElementById("deviceType").innerText =
    "Device Type: " + deviceType.toUpperCase();
  document.getElementById("brandType").innerText =
    "Brand: " + brand.toUpperCase();

  let AemIdSubId;
  const lastIndex = aemID.lastIndexOf("/");
  if (lastIndex !== -1) {
    AemIdSubId = aemID.substring(lastIndex + 1);
    console.log(AemIdSubId);
    const subIdInputContainer = document.querySelector(".input-container");
    const aemIdSubInput = document.getElementById("aemIdSubInput");
    subIdInputContainer.removeAttribute("hidden");
    aemIdSubInput.value = AemIdSubId;
  }

  if (aemID.includes(" ")) {
    aemIdSpaceFlag = true;
    let aemIdErrorText = document.createElement("p");
    aemIdErrorText.innerHTML = "Error - AEM ID Contains Spaces";
    const aemIdErrorTextElement = document.getElementById("error");
    aemIdErrorTextElement.appendChild(aemIdErrorText);
  }

  if (
    deviceType === "app" &&
    brandType !== "Error - Brand type mismatch" &&
    assetType !== "Error - Asset type mismatch" &&
    aemIdSpaceFlag === false
  ) {
    document.getElementById("appBuildUrl").innerHTML =
      "AEM APP <strong>Direct CF Build</strong> Link: " +
      '<a target="_blank" href="' +
      aemUrls.appBuildUrl +
      '"> Click here </a>';
    document.getElementById("appDeployUrl").innerHTML =
      "AEM App Deployment <strong>Folder</strong> Link: " +
      '<a target="_blank" href="' +
      aemUrls.appDeployUrl +
      '"> Click here </a>';
    document.getElementById("appBuildFolderUrl").innerHTML =
      "AEM App Build <strong>Folder</strong> Link: " +
      '<a target="_blank" href="' +
      aemUrls.appBuildFolderUrl +
      '"> Click here </a>';
  } else if (
    (deviceType === "dkp" || deviceType === "mbr") &&
    brandType !== "Error - Brand type mismatch" &&
    assetType !== "Error - Asset type mismatch" &&
    aemIdSpaceFlag === false
  ) {
    document.getElementById("dkpMbrBuildUrl").innerHTML =
      "Desktop and Mobile Browser <strong>direct build</strong> AEM link: " +
      '<a target="_blank" href="' +
      aemUrls.dkpMbrBuildUrl +
      '"> Click here </a>';

    document.getElementById("appBuildFolderUrl").innerHTML =
      "Desktop and Mobile Browser AEM <strong>folder</strong> link: " +
      '<a target="_blank" href="' +
      aemUrls.dkpMbrBuildUrlFolder +
      '"> Click here </a>';
  } else {
    // let errorElement = document.getElementById("error");
    let errorElement = document.createElement("p");
    let aemIdErrorTextElement = document.getElementById("error");
    errorElement.innerText = "Check AEM ID";

    errorElement.style.color = "red";
    errorElement.style.fontWeight = "bold";
    errorElement.style.textAlign = "center";
    aemIdErrorTextElement.appendChild(errorElement);
  }
});

function copySubID() {
  const subIdInput = document.getElementById("aemIdSubInput").value;

  if (subIdInput) {
    navigator.clipboard.writeText(subIdInput).then(() => {
      subIdCopyBtn.innerText = "Copied"
    });
  }
}
const subIdCopyBtn = document.getElementById("copyLink");
subIdCopyBtn.addEventListener("click", copySubID);

document.getElementById("submitBtn").addEventListener("click", async () => {
  const aemID = document.getElementById("aemID").value;
  const ids = aemID.split("\n");
  const resultsContainer = document.getElementById("live-check-results");
  resultsContainer.innerHTML = "";
  for (let id of ids) {
    if (id.trim() === "") continue;
    let { deviceType, deviceTypeStatus } = getDeviceType(id);
    let url;
    if (deviceType === "dkp" || deviceType === "mbr") {
      url = `https://content.lloydsbankinggroup.com/content/experience-fragments/${id}/master.html`;
    } else {
      url = `https://content.lloydsbankinggroup.com/api/assets/${id}.json`;
    }
    try {
      const response = await fetch(url);
      if ((response.ok && deviceType === "dkp") || deviceType === "mbr") {
        resultsContainer.innerHTML += `<div>${id} - <strong><span style="color: red;">ID already published</span></strong><br><a target="_blank" href="https://author-lloydsbg-production.adobecqms.net/editor.html/content/experience-fragments/${id}/master.html">Link to Existing XF Asset in AEM<br><a target="_blank" href="${url}">Link to Existing Asset for Non AEM Users</div></div><br>`;
        document.getElementById("appBuildUrl").innerHTML = "";
      } else {
        // Check for app assets
        url = `https://content.lloydsbankinggroup.com/api/assets/${id}.json`;
        const appResponse = await fetch(url);
        if (appResponse.ok) {
          resultsContainer.innerHTML += `<div>${id} - <strong><span style="color: red;">ID already published</span></strong><br><a target="_blank" href="${existingAppAssetBaseUrl}${id}">Link to Existing App Asset in AEM</div><br>`;
          document.getElementById("appBuildUrl").innerHTML = "";
        } else {
          resultsContainer.innerHTML += `<div>${id} - <strong><span style="color: green;">ID not published</span></strong></div><br>`;
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
      resultsContainer.innerHTML += `<div>${id} - <span style="color: red;">Fetch error: "Cors Policy" </span></div>`;
    }
  }
});