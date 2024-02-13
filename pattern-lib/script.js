let csvData = [];
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("selectionForm");
  const submitButton = document.getElementById("submitButton");
  let selections = {
    brand: "",
    deviceType: "",
    placementType: "",
    patternRef: "",
  };
  

  // Function to parse CSV data
  function parseCSV(text) {
    return text
      .split("\n")
      .map((row) => row.split(",").map((cell) => cell.trim()));
  }

  // Function to create dropdowns
  function createDropdown(name, options, callback) {
    let container = document.getElementById(name + "Container");
    if (container) {
      container.remove(); // Remove the existing container if it exists
    }
    container = document.createElement("div");
    container.id = name + "Container";

    options.forEach((option, index) => {
      if (option) {
        // Create dropdown options only if the option is not empty
        const input = document.createElement("input");
        input.type = "radio";
        input.name = name;
        input.value = option;
        input.id = `${name}-${index}`;

        const label = document.createElement("label");
        label.htmlFor = `${name}-${index}`;
        label.textContent = option;

        container.appendChild(input);
        container.appendChild(label);

        input.addEventListener("change", callback);
      }
    });

    form.appendChild(container);
  }

  // Handlers for each selection
  function handleBrandSelection() {
    selections.brand = this.value;
    updateDropdown("deviceType", selections.brand);
  }

  function handleDeviceTypeSelection() {
    selections.deviceType = this.value;
    updateDropdown("placementType", selections.brand, selections.deviceType);
  }

  function handlePlacementTypeSelection() {
    selections.placementType = this.value;
    updateDropdown(
      "patternRef",
      selections.brand,
      selections.deviceType,
      selections.placementType
    );
  }

  function handlePatternRefSelection() {
    selections.patternRef = this.value;
  }

  // Update dropdown based on selection
  function updateDropdown(type, ...selected) {
    const indexMap = {
      brand: 0,
      deviceType: 1,
      placementType: 2,
      patternRef: 3,
    };

    const relevantData = csvData.filter((row) =>
      selected.every((select, index) => row[index] === select)
    );
    const uniqueOptions = [
      ...new Set(relevantData.map((row) => row[indexMap[type]])),
    ];
    createDropdown(
      type,
      uniqueOptions,
      {
        brand: handleBrandSelection,
        deviceType: handleDeviceTypeSelection,
        placementType: handlePlacementTypeSelection,
        patternRef: handlePatternRefSelection,
      }[type]
    );

    // Automatically show submit button if patternRef dropdown is created
    if (type === "patternRef") {
      submitButton.style.display = "block";
    }
  }
  // Handle form submission to display the results
  function handleFormSubmission(event) {
    event.preventDefault();
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear previous results

    const selectedPatternRef = form.querySelector(
      'input[name="patternRef"]:checked'
    ).value;
    const filteredData = csvData.filter((row) => row[3] === selectedPatternRef);

    // Create a container for each row
    // Create a container for each row
    filteredData.forEach((row, index) => {
      let rowContainer = document.createElement("div");
      rowContainer.classList.add("result-item");

      const [refText, imageUrl] = row[4].split("<br>"); // Split the 'pattern ref and image' data

      // Create the pattern-image container
      let patternImageContainer = document.createElement("div");
      patternImageContainer.classList.add("pattern-image");
      patternImageContainer.innerHTML = `
      <div>Pattern Ref: ${refText}</div>
      <div>Image: <img src="${imageUrl.trim()}" alt="Pattern Image"></div>
    `;

      // Create the additional-info container
      let additionalInfoContainer = document.createElement("div");
      additionalInfoContainer.classList.add("additional-info");
      additionalInfoContainer.innerHTML = `
      <div>${row[5]}</div>
    `;

      // Append pattern-image and additional-info containers to rowContainer
      rowContainer.appendChild(patternImageContainer);
      rowContainer.appendChild(additionalInfoContainer);

      resultsContainer.appendChild(rowContainer);
    });
  }

  submitButton.addEventListener("click", handleFormSubmission);

  // Initialize by reading the CSV
  fetch("data.csv")
    .then((response) => response.text())
    .then((data) => {
      csvData = parseCSV(data);
      csvData.shift(); // Remove the header
      updateDropdown("brand");
    });
});
