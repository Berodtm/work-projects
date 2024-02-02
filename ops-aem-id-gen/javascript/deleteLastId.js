function deleteLastID() {
    const generatedIDsTextArea = document.getElementById("generated-ids");
    const existingIDs = generatedIDsTextArea.value;

    if (existingIDs) {
        // Split the existing IDs into an array
        const idsArray = existingIDs.trim().split("\n");

        // Remove the last ID from the array
        const lastID = idsArray.pop();

        // Update the generated IDs textarea
        generatedIDsTextArea.value = idsArray.join("\n");

        // Remove the last ID from the generatedIDArray
        generatedIDArray.splice(generatedIDArray.indexOf(lastID), 1);
    }

    const campaignNameInput = document.getElementById("campaign-name");
    const autoUIDButton = document.getElementById("auto-uid-button");
    const campaignName = campaignNameInput.value;

    if (campaignName.trim().length > 0) {
        autoUIDButton.disabled = false;
    }
}