document.addEventListener('DOMContentLoaded', (event) => {
    const checkIfLive = async () => {
      const ids = document.getElementById('generated-ids').value.split('\n');
      const resultsContainer = document.getElementById('live-check-results');
      resultsContainer.innerHTML = ''; // Uncomment to clear previous results
      for (let id of ids) {
        if (id.trim() === '') continue;
        const url = `https://content.lloydsbankinggroup.com/api/assets/${id}.json`; // Adjusted to point to a JSON file
        console.log(url);
        try {
          const response = await fetch(url);
          console.log('url is ' + url);
          if (response.ok) {
            // Assuming you only want to check if the request was successful
            resultsContainer.innerHTML += `<div>${id} - <span style="color: red;">ID already in use</span></div>`;
          } else {
            resultsContainer.innerHTML += `<div>${id} - <span style="color: green;">ID not in use</span></div>`;
          }
        } catch (error) {
          console.error('Fetch error:', error);
          resultsContainer.innerHTML += `<div>${id} - <span style="color: red;">Fetch error - This only works in chrome. </span></div>`;
        }
      }
     };
     document.getElementById('checkId').addEventListener('click', checkIfLive);
  
  });