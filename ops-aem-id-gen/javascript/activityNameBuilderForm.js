// Function to get checked values from a group of checkboxes
function getCheckedValues(containerId) {
    const checkboxes = document.querySelectorAll(
      `#${containerId} input[type='checkbox']:checked`
    );
    return Array.from(checkboxes).map((checkbox) => checkbox.value);
  }


const updateActivityName = () => {
let activityNameLeadName = document.getElementById(
  "activity-name-builder-lead"
).value;
let activityNameProductType = document.getElementById(
  "activity-name-builder-productType"
).value;

const selectedActivityNameBrand = getCheckedValues(
  "activity-name-builder-brand"
);
const selectedActivityNameDeviceType = getCheckedValues(
  "activity-name-builder-deviceType"
);
const selectedActivityNameTestType = getCheckedValues(
  "activity-name-builder-activityType"
);
const activityNamesLoopArray = [];

selectedActivityNameBrand.forEach((brand) => {
  selectedActivityNameDeviceType.forEach((device) => {
    selectedActivityNameTestType.forEach((testType) => {
      let activity = `004${brand}${activityNameLeadName}_PROD_${brand}_${activityNameProductType}_${device}`.toUpperCase();

      if (testType !== "") {
        activity += `_${testType}`.toUpperCase();
      }

      activityNamesLoopArray.push(activity);
    });
  });
});


let activityNamesOutput = document.getElementById('activity-name-builder-list')
activityNamesOutput.value = activityNamesLoopArray.join("\n");
};

document
.getElementById("activity-name-builder-form-container")
.addEventListener("change", updateActivityName);