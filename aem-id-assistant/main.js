const appBaseUrl =
  'https://author-lloydsbg-production.adobecqms.net/mnt/overlay/dam/cfm/admin/content/v2/createfragment.html/content/dam/';

const appDeployBaseUrl =
  'https://author-lloydsbg-production.adobecqms.net/aem/experience-fragments.html/content/experience-fragments/';

const appBuildBaseFolder =
  'https://author-lloydsbg-production.adobecqms.net/assets.html/content/dam/';

const existingAppAssetBaseUrl =
  'https://author-lloydsbg-production.adobecqms.net/editor.html/content/dam/';

const dkpMbrBuildUrlBaseUrl =
  'https://author-lloydsbg-production.adobecqms.net/mnt/overlay/cq/experience-fragments/content/v2/experience-fragments/createxfwizard.html/content/experience-fragments/';

let deviceType = '';

let brandType = '';

let deviceTypeStatus = false;

let assetTypeArray = [
  'bpt',

  'asm',

  'til',

  'lnk',

  'stk',

  'dpp',

  'eal',

  'lob',

  'mrc',

  'mmt',

  'nvt',

  'phl',

  'pom',

  'vpd',

  'mam',

  'aev',

  'sfw',

  'gam',

  'afw',
];

let aemIdSpaceFlag = false;

const productCodes = ['lins', 'invs']; // Add your actual product codes here to stop clash with compare code.

function getDeviceType(aemID) {
  let deviceType = '';

  let deviceTypeStatus = false;

  // split ID to only use content before index 2 dash to prevent errors

  let aemIDBeforeDash = aemID.split('-')[2];

  console.log('aem id before dash ' + aemIDBeforeDash);

  if (
    (aemIDBeforeDash.includes('app') && aemIDBeforeDash.includes('dkp')) ||
    (aemIDBeforeDash.includes('app') && aemIDBeforeDash.includes('mbr')) ||
    (aemIDBeforeDash.includes('dkp') && aemIDBeforeDash.includes('mbr')) ||
    (aemIDBeforeDash.includes('cwa') && aemIDBeforeDash.includes('mbr')) ||
    (aemIDBeforeDash.includes('cwa') && aemIDBeforeDash.includes('dkp')) ||
    (aemIDBeforeDash.includes('cwa') && aemIDBeforeDash.includes('app'))
  ) {
    console.log('error in AEM ID, device type miss-match');

    deviceType = 'Error - Device Type mismatch';
  } else if (aemIDBeforeDash.includes('app')) {
    console.log('Device Type = App');

    deviceType = 'app';

    deviceTypeStatus = true;
  } else if (aemIDBeforeDash.includes('dkp')) {
    console.log('Device type is Desktop');

    deviceType = 'dkp';

    deviceTypeStatus = true;
  } else if (aemIDBeforeDash.includes('mbr')) {
    console.log('Device type is Mobile Browser');

    deviceType = 'mbr';

    deviceTypeStatus = true;
  } else if (aemIDBeforeDash.includes('cwa')) {
    console.log('Device type is cwa');

    deviceType = 'cwa';

    deviceTypeStatus = true;
  } else {
    console.log('Error - Device type unknown');

    deviceType = 'error';
  }

  return { deviceType, deviceTypeStatus };
}

function getBrand(aemID) {
  if (
    (aemID.includes('lly') && aemID.includes('bos')) ||
    (aemID.includes('lly') && aemID.includes('hal')) ||
    (aemID.includes('hal') && aemID.includes('bos')) ||
    (aemID.includes('mbn') && aemID.includes('bos')) ||
    (aemID.includes('mbn') && aemID.includes('hal')) ||
    (aemID.includes('mbn') && aemID.includes('lly'))
  ) {
    console.log('Error - Brand type mismatch');

    brandType = 'Error - Brand type mismatch';
  } else if (aemID.includes('lly')) {
    brandType = 'lly';
  } else if (aemID.includes('hal')) {
    brandType = 'hal';
  } else if (aemID.includes('bos')) {
    brandType = 'bos';
  } else if (aemID.includes('mbn')) {
    brandType = 'mbn';
  }

  return brandType;
}

// check AEM ID for Brand Miss-match

function getAssetType(aemID, assetTypeArray) {
  // Split the AEM ID to check each part individually

  const parts = aemID.split('/');

  let assetType = '';

  let counter = 0;

  // Iterate through each part of the AEM ID

  parts.forEach((part) => {
    // Only proceed if part is not in the productCodes array

    if (!productCodes.includes(part)) {
      if (assetTypeArray.includes(part)) {
        assetType = part;

        counter++;
      }
    }
  });

  if (counter > 1) {
    assetType = 'Error - Asset type mismatch';
  } else if (counter === 0) {
    assetType = 'Error - No valid asset type found';
  } else {
    console.log('Success: Asset type is ' + assetType);
  }

  return assetType;
}

// url construct code

function getAemUrls(aemID, appBaseUrl, deviceType, deviceTypeStatus) {
  const index = aemID.indexOf('core-leads');

  const lastIndex = aemID.lastIndexOf('/');

  const id = aemID.slice(index, lastIndex);

  let result = {};

  // validation code

  if (!(aemID.includes('core-leads') && aemID.includes('retail'))) {
    console.log("Error: ID does not contain 'core-leads' and 'retail'");

    let errorElement = document.createElement('p');

    let aemIdErrorTextElement = document.getElementById('error');

    errorElement.innerText =
      "Error: ID does not contain 'core-leads' and 'retail'";

    errorElement.style.color = 'red';

    errorElement.style.fontWeight = 'bold';

    errorElement.style.textAlign = 'center';

    aemIdErrorTextElement.appendChild(errorElement);

    throw new Error('Invalid AEM ID');
  }

  if (deviceType === 'app' && deviceTypeStatus === true) {
    const appBuildUrl = appBaseUrl + id;

    console.log('AEM APP Build Link', appBuildUrl);

    result.appBuildUrl = appBuildUrl;

    const appBuildFolderUrl = appBuildBaseFolder + id;

    result.appBuildFolderUrl = appBuildFolderUrl;

    // Deploy AEM App url

    const appDeployUrl = appDeployBaseUrl + id;

    console.log('AEM App Deployment link', appDeployUrl);

    result.appDeployUrl = appDeployUrl;
  } else if (deviceTypeStatus === true) {
    const dkpMbrBuildUrl = dkpMbrBuildUrlBaseUrl + id;

    console.log(
      'Desktop, CWA or Mobile Browser AEM Direct Build link:',

      dkpMbrBuildUrl
    );

    result.dkpMbrBuildUrl = dkpMbrBuildUrl;

    const dkpMbrBuildUrlFolder = appDeployBaseUrl + id;

    console.log(
      'Desktop, CWA or Mobile Browser AEM Folder link:',

      dkpMbrBuildUrl
    );

    result.dkpMbrBuildUrlFolder = dkpMbrBuildUrlFolder;
  }

  return result;
}

function resetPage() {
  // document.getElementById("aemID").value = "";

  document.getElementById('assetType').innerText = '';

  document.getElementById('deviceType').innerText = '';

  document.getElementById('brandType').innerText = '';

  document.getElementById('appBuildUrl').innerHTML = '';

  document.getElementById('appBuildFolderUrl').innerHTML = '';

  document.getElementById('appDeployUrl').innerHTML = '';

  document.getElementById('dkpMbrBuildUrl').innerHTML = '';

  document.getElementById('error').innerHTML = '';

  aemIdSpaceFlag = false;

  deviceTypeStatus = false;

  subIdCopyBtn.innerText = 'Copy ID';
}

document.getElementById('submitBtn').addEventListener('click', () => {
  resetPage();

  const aemID = document.getElementById('aemID').value.toLowerCase();

  let { deviceType, deviceTypeStatus } = getDeviceType(aemID);

  let assetType = getAssetType(aemID, assetTypeArray);

  let aemUrls = getAemUrls(aemID, appBaseUrl, deviceType, deviceTypeStatus);

  let brand = getBrand(aemID);

  document.getElementById('assetType').innerText =
    'Asset Type: ' + assetType.toUpperCase();

  document.getElementById('deviceType').innerText =
    'Device Type: ' + deviceType.toUpperCase();

  document.getElementById('brandType').innerText =
    'Brand: ' + brand.toUpperCase();

  let AemIdSubId;

  const lastIndex = aemID.lastIndexOf('/');

  if (lastIndex !== -1) {
    AemIdSubId = aemID.substring(lastIndex + 1);

    console.log(AemIdSubId);

    const subIdInputContainer = document.querySelector('.input-container');

    const aemIdSubInput = document.getElementById('aemIdSubInput');

    subIdInputContainer.removeAttribute('hidden');

    aemIdSubInput.value = AemIdSubId;
  }

  if (aemID.includes(' ')) {
    aemIdSpaceFlag = true;

    let aemIdErrorText = document.createElement('p');

    aemIdErrorText.innerHTML = 'Error - AEM ID Contains Spaces';

    const aemIdErrorTextElement = document.getElementById('error');

    aemIdErrorTextElement.appendChild(aemIdErrorText);
  }

  if (
    deviceType === 'app' &&
    brandType !== 'Error - Brand type mismatch' &&
    assetType !== 'Error - Asset type mismatch' &&
    aemIdSpaceFlag === false
  ) {
    document.getElementById('appBuildUrl').innerHTML =
      'AEM APP <strong>Direct CF Build</strong> Link: ' +
      '<a target="_blank" href="' +
      aemUrls.appBuildUrl +
      '"> Click here </a>';

    document.getElementById('appDeployUrl').innerHTML =
      'AEM App Deployment <strong>Folder</strong> Link: ' +
      '<a target="_blank" href="' +
      aemUrls.appDeployUrl +
      '"> Click here </a>';

    document.getElementById('appBuildFolderUrl').innerHTML =
      'AEM App Build <strong>Folder</strong> Link: ' +
      '<a target="_blank" href="' +
      aemUrls.appBuildFolderUrl +
      '"> Click here </a>';
  } else if (
    (deviceType === 'dkp' || deviceType === 'mbr' || deviceType === 'cwa') &&
    brandType !== 'Error - Brand type mismatch' &&
    assetType !== 'Error - Asset type mismatch' &&
    aemIdSpaceFlag === false
  ) {
    document.getElementById('dkpMbrBuildUrl').innerHTML =
      'Desktop, CWA and Mobile Browser <strong>direct build</strong> AEM link: ' +
      '<a target="_blank" href="' +
      aemUrls.dkpMbrBuildUrl +
      '"> Click here </a>';

    document.getElementById('appBuildFolderUrl').innerHTML =
      'Desktop, CWA and Mobile Browser AEM <strong>folder</strong> link: ' +
      '<a target="_blank" href="' +
      aemUrls.dkpMbrBuildUrlFolder +
      '"> Click here </a>';
  } else {
    // let errorElement = document.getElementById("error");

    let errorElement = document.createElement('p');

    let aemIdErrorTextElement = document.getElementById('error');

    errorElement.innerText = 'Check AEM ID';

    errorElement.style.color = 'red';

    errorElement.style.fontWeight = 'bold';

    errorElement.style.textAlign = 'center';

    aemIdErrorTextElement.appendChild(errorElement);
  }
});

function copySubID() {
  const subIdInput = document.getElementById('aemIdSubInput').value;

  if (subIdInput) {
    navigator.clipboard.writeText(subIdInput).then(() => {
      subIdCopyBtn.innerText = 'ID Copied';
    });
  }
}

const subIdCopyBtn = document.getElementById('copyLink');

subIdCopyBtn.addEventListener('click', copySubID);

const IdApiCheck = async () => {
  const aemID = document.getElementById('aemID').value;

  const ids = aemID.split('\n');

  const resultsContainer = document.getElementById('live-check-results');

  resultsContainer.innerHTML = '';

  for (let id of ids) {
    if (id.trim() === '') continue;

    let { deviceType, deviceTypeStatus } = getDeviceType(id);

    let url;

    if (deviceType === 'dkp' || deviceType === 'mbr' || deviceType === 'cwa') {
      url = `https://content.lloydsbankinggroup.com/content/experience-fragments/${id}/master.html`;
    } else {
      url = `https://content.lloydsbankinggroup.com/api/assets/${id}.json`;
    }

    try {
      const response = await fetch(url);

      if (
        response.ok &&
        (deviceType === 'dkp' || deviceType === 'mbr' || deviceType === 'cwa')
      ) {
        resultsContainer.innerHTML += `<div>${id} - <strong><span style="color: red;">ID already published</span></strong><br><a target="_blank" href="https://author-lloydsbg-production.adobecqms.net/editor.html/content/experience-fragments/${id}/master.html">Link to Existing XF Asset in AEM<br><a target="_blank" href="${url}">Link to Existing Asset for Non AEM Users</div></div><br>`;

        document.getElementById('appBuildUrl').innerHTML = '';
      } else {
        // Check for app assets

        url = `https://content.lloydsbankinggroup.com/api/assets/${id}.json`;

        const appResponse = await fetch(url);

        if (appResponse.ok) {
          let data = appResponse;

          data = await data.json();

          console.log(data); // JSON object in console here to develop QA assisted scripts in the future

          resultsContainer.innerHTML += `<div>${id} - <strong><span style="color: red;">ID already published</span></strong><br><a target="_blank" href="${existingAppAssetBaseUrl}${id}">Link to Existing App Asset in AEM</div><br>`;

          document.getElementById('appBuildUrl').innerHTML = '';

          await additionalLiveChecks(data);
        } else {
          resultsContainer.innerHTML += `<div>${id} - <strong><span style="color: green;">ID not published</span></strong></div><br>`;
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);

      resultsContainer.innerHTML += `<div>${id} - <span style="color: red;">Fetch error - This only works in chrome. </span></div>`;
    }
  }
};

// helper function to keep variables out of global scope.
function getUserNameById(userId) {
  const users = [
    { id: 9918871, name: 'Guy Babout-James' },
    { id: 424206, name: 'Rob Dunn' },
  ];

  const user = users.find((u) => u.id == userId);
  return user ? `${user.name} ${userId}` : `New user: ${userId}`;
}

const additionalLiveChecks = async (data) => {
  // Get the resultsContainer element

  const resultsContainer = document.getElementById('live-check-results');

  // Create a new h3 element and set its text content

  const h3 = document.createElement('h3');

  h3.textContent = 'Supporting Live Checks';

  resultsContainer.appendChild(h3);

  try {
    // Safely access each property using optional chaining and defaulting to null if not found

    const ctaPrimaryText = data?.properties?.elements?.ctaPrimaryText || null;

    const ctaPrimaryLink = data?.properties?.elements?.ctaPrimaryLink || null;

    const ctaPrimaryStyle = data?.properties?.elements?.ctaPrimaryStyle || null;

    const titleText = data?.properties?.elements?.titleText || null;

    const bodyText = data?.properties?.elements?.bodyText || null;

    const style = data?.properties?.elements?.style || null;

    const imageUrl = data?.properties?.elements?.imageUrl || null;

    const contentFragmentModel = data?.properties?.['cq:model']?.path || null;

    const lastModifiedTimestamp = data?.properties?.modified || null;

    const modifiedBy = data?.properties?.modifiedBy || null;

    // Content Fragment model

    if (contentFragmentModel) {
      const model = document.createElement('p');

      model.innerHTML = `<strong>Content Fragment Template:</strong> ${contentFragmentModel}`;

      resultsContainer.appendChild(model);
    }

    // background style

    if (style?.value) {
      const backgroundStyle = document.createElement('p');

      backgroundStyle.innerHTML = `<strong>Background Style:</strong> ${style.value}`;

      resultsContainer.appendChild(backgroundStyle);
    }

    // image

    if (imageUrl?.value) {
      const image = document.createElement('p');

      image.innerHTML = `<strong>Image Url:</strong> ${imageUrl.value}`;

      resultsContainer.appendChild(image);
    }

    // header

    if (titleText?.value) {
      const header = document.createElement('p');

      header.innerHTML = `<strong>Header Text:</strong> ${titleText.value}`;

      resultsContainer.appendChild(header);
    }

    // body copy

    if (bodyText?.value) {
      const bodyCopy = document.createElement('p');

      bodyCopy.innerHTML = `<strong>Body Text:</strong> ${bodyText.value}`;

      resultsContainer.appendChild(bodyCopy);
    }

    // cta text

    if (ctaPrimaryText?.value) {
      const ctaText = document.createElement('p');

      ctaText.innerHTML = `<strong>CTA Text:</strong> ${ctaPrimaryText.value}`;

      resultsContainer.appendChild(ctaText);
    }

    // cta link url

    if (ctaPrimaryLink?.value) {
      const ctaURL = document.createElement('p');

      ctaURL.innerHTML = `<strong>CTA Url:</strong> ${ctaPrimaryLink.value}`;

      resultsContainer.appendChild(ctaURL);
    }

    // cta style

    if (ctaPrimaryStyle?.value) {
      const ctaStyle = document.createElement('p');

      ctaStyle.innerHTML = `<strong>CTA Style:</strong> ${ctaPrimaryStyle.value}`;

      resultsContainer.appendChild(ctaStyle);
    }

    // Convert the timestamp to a readable date and time

    const lastModifiedDateTime = new Date(lastModifiedTimestamp).toLocaleString(
      'en-GB',

      {
        day: 'numeric',

        month: 'long',

        year: 'numeric',

        hour: '2-digit',

        minute: '2-digit',

        second: '2-digit',
      }
    );

    // Asset last modified

    if (lastModifiedDateTime && modifiedBy) {
      const modifiedInfo = document.createElement('p');
      const modifiedByName = getUserNameById(modifiedBy);
      
      modifiedInfo.innerHTML = `<strong>Asset last modified:</strong> ${lastModifiedDateTime} by ${modifiedByName}`;
      resultsContainer.appendChild(modifiedInfo);
    }

    const commonErrorCheckScripts = document.createElement('h3');

    commonErrorCheckScripts.textContent = 'Common Error Check Scripts';

    resultsContainer.appendChild(commonErrorCheckScripts);

    // Create a new p element for the space check

    const pSpaceCheck = document.createElement('p');

    // Check if the URL contains spaces and set the pSpaceCheck element's text content accordingly

    if (ctaPrimaryLink && ctaPrimaryLink.value.includes(' ')) {
      pSpaceCheck.innerHTML = `<strong><span style="color: red;">Common Error Spotted -</span></strong> URL contains spaces in: <strong>${ctaPrimaryLink.value}</strong>`;
    } else if (ctaPrimaryLink) {
      pSpaceCheck.innerHTML = `<strong><span style="color: green;">Common Error Check - Pass:</span></strong> URL contains no spaces`;
    }

    // Append the pSpaceCheck element to the resultsContainer

    resultsContainer.appendChild(pSpaceCheck);
  } catch (error) {
    // Log any errors that occur

    console.error('Error in additionalLiveChecks:', error);
  }
};

document.getElementById('submitBtn').addEventListener('click', IdApiCheck);
