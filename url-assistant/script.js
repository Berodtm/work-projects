function convertURL() {
    const urlInput = document.getElementById('urlInput').value;
    const deviceType = document.querySelector('input[name="deviceType"]:checked').value;
    let baseUrl = urlInput.replace(/(http(s)?:\/\/)?[^\/]*\/(sales-content.*)/, "/personal/$3");
    baseUrl = baseUrl.replace(/\/[hlbm]?\//, "/"); // Remove the brand part

    switch (deviceType) {
        case "desktop":
            // For desktop, the base URL is already prepared
            break;
        case "app":
            // Ensure ngb:/ prefix and correctly place NGA=true
            const appPrefix = "ngb:/";
            const queryStringIndex = baseUrl.indexOf("?");
            let queryString = "";
            if (queryStringIndex !== -1) {
                // If there's an existing query string, reformat it.
                queryString = baseUrl.substring(queryStringIndex);
                baseUrl = baseUrl.substring(0, queryStringIndex);
                queryString = `?NGA=true&${queryString.substring(1)}`; // Place NGA=true first
            } else {
                queryString = "?NGA=true"; // No existing query string
            }
            baseUrl = appPrefix + baseUrl + queryString;
            break;
        case "productHub":
            baseUrl = `"secureUrl":"/personal${baseUrl}?NGA=true"`;
            if (baseUrl.includes("?NGA=true?")) {
                baseUrl = baseUrl.replace("?NGA=true?", "?NGA=true&");
            }
            break;
    }

    document.getElementById('convertedUrl').textContent = `Converted URL: ${baseUrl}`;
}
document.getElementById('copyUrlButton').addEventListener('click', function() {
    const convertedUrlText = document.getElementById('convertedUrl').textContent.replace('Converted URL: ', '');
    if (navigator.clipboard && convertedUrlText !== '') {
        navigator.clipboard.writeText(convertedUrlText).then(() => {
            alert('URL copied to clipboard!');
        }).catch(err => {
            console.error('Error in copying text: ', err);
            alert('Error copying URL to clipboard. Please try again.');
        });
    } else {
        alert('Clipboard functionality not available or converted URL is empty.');
    }
});
