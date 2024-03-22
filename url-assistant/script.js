function convertURL() {
    const urlInput = document.getElementById('urlInput').value;

    // Step 1: Normalize the URL by removing the protocol and domain if present
    let baseUrl = urlInput.replace(/^(http(s)?:\/\/)?[^\/]+\/?/, '');

    // Step 2: Ensure '/personal' is added correctly
    // First, ensure we don't duplicate '/personal' if it's already part of the input
    if (!baseUrl.startsWith('/personal/')) {
        baseUrl = baseUrl.replace(/^\/?(personal\/)?/, '/personal/');
    }

    // Step 3: Remove the single-letter brand indicator from the path
    baseUrl = baseUrl.replace(/\/sales-content\/cwa\/[hlbm]\//, '/sales-content/cwa/');

    // Retrieve the selected device type
    const deviceType = document.querySelector('input[name="deviceType"]:checked').value;

    switch (deviceType) {
        case "desktop":
            // No further action needed for desktop URLs
            break;
        case "app":
            // App-specific adjustments
            const queryStringIndex = baseUrl.indexOf("?");
            let queryString = "";
            if (queryStringIndex !== -1) {
                // If there's an existing query string, reformat it.
                queryString = baseUrl.substring(queryStringIndex);
                baseUrl = baseUrl.substring(0, queryStringIndex);
                queryString = `?NGA=true&${queryString.substring(1)}`; // Correctly place NGA=true first
            } else {
                queryString = "?NGA=true"; // No existing query string
            }
            // Correctly format ngb:// without introducing a triple slash
            baseUrl = `ngb://` + baseUrl.replace(/^\//, '') + queryString;
            break;

        case "productHub":
            // ProductHub-specific adjustments
            const phQueryStringIndex = baseUrl.indexOf("?");
            let phQueryString = "";
            if (phQueryStringIndex !== -1) {
                phQueryString = baseUrl.substring(phQueryStringIndex);
                baseUrl = baseUrl.substring(0, phQueryStringIndex);
            }
            // Append NGA=true as the first query parameter, correctly format for productHub
            phQueryString = `?NGA=true${phQueryString.length > 0 ? '&' + phQueryString.substring(1) : ''}`;
            baseUrl = `"secureUrl":"${baseUrl}${phQueryString}"`;
            break;
    }

    document.getElementById('convertedUrl').textContent = `Converted URL: ${baseUrl}`;
}

document.getElementById('copyUrlButton').addEventListener('click', function () {
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
