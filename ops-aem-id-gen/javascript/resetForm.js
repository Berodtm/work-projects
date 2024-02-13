const resetForm = () => {
    // Clear generated IDs
    generatedIDArray = [];
    document.getElementById("generated-ids").value = "";

    // Reset form fields
    document.getElementById("sub-product").value = "";
    document.getElementById("campaign-name").value = "";
    document.getElementById("unique-id").value = "";
    document.getElementById("version").value = 1;

    // check boxes
    const checkboxes = document.querySelectorAll(".checkbox-group input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}