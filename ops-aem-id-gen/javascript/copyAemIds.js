function copyAEMIDs() {
    const generatedIDs = document.getElementById("generated-ids").value;

    if (generatedIDs) {
        navigator.clipboard.writeText(generatedIDs).then(() => {
            alert("IDs copied to clipboard!");
        });
    }
}