// Add event listeners to the input fields
const subProductInput = document.getElementById("sub-product");
subProductInput.addEventListener("input", blockSpecialCharacters);

const campaignNameInput = document.getElementById("campaign-name");
campaignNameInput.addEventListener("input", blockSpecialCharacters);

const uniqueIDInput = document.getElementById("unique-id");
uniqueIDInput.addEventListener("input", blockSpecialCharacters);

// Function to block special characters
function blockSpecialCharacters(event) {
    const inputField = event.target;
    let inputValue = inputField.value;

    // Remove special characters except underscore (_) and dash (-) using regex
    inputValue = inputValue.replace(/[^a-zA-Z0-9_\s-]/g, "");

    // Replace "lp" with "l0"
    inputValue = inputValue.replace(/lp/g, "l0");

    // Update the input field value
    inputField.value = inputValue;
}