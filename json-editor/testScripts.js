// temp test functions for debugging

// load-tests.js

// load-tests.js

document.addEventListener('DOMContentLoaded', function () {
    const placeholder = document.getElementById('test-buttons-placeholder');
    if (placeholder) {
      fetch('test-buttons.html')
        .then((response) => response.text())
        .then((data) => {
          placeholder.innerHTML = data;
        })
        .catch((error) => {
          console.error('Error loading test buttons:', error);
        });
    } else {
      console.error('Error: Placeholder element not found.');
    }
  });

function testLoadJson() {
  const sampleJson = `
{
    "data": {
        "products": [
            {
                "title": "Loans & Car Finance",
                "orderID": 1,
                "iconID": 3,
                "items": [
                    {
                        "title": "Loan Calculator",
                        "secureUrl": "https://www.exampleurl.com/calculator",
                        "orderID": 1,
                        "tag": "tagref111",
                        "platform": "both"
                    }
                ]
            }
        ]
    }
}`;
  document.getElementById('jsonInput').value = sampleJson;
  displayJson();
  console.log('Test Load JSON: ', jsonData);
}

function testAddItem() {
  const productIndex = 0;
  const newItem = {
    title: 'New Loan Option',
    secureUrl: 'https://www.exampleurl.com/new-loan',
    orderID: 2,
    tag: 'tagref112',
    platform: 'both',
  };

  if (jsonData.data && jsonData.data.products[productIndex]) {
    jsonData.data.products[productIndex].items.push(newItem);
    updateJsonDisplay();
    displayJson();
    console.log('Test Add Item: ', jsonData.data.products[productIndex]);
  } else {
    console.error('Product not found for adding item');
  }
}

function testRemoveItem() {
  const productIndex = 0;

  if (jsonData.data && jsonData.data.products[productIndex]) {
    jsonData.data.products[productIndex].items.pop();
    updateJsonDisplay();
    displayJson();
    console.log('Test Remove Item: ', jsonData.data.products[productIndex]);
  } else {
    console.error('Product not found for removing item');
  }
}

function testMoveItem() {
  if (jsonData.data && jsonData.data.products.length > 1) {
    moveItem(['data', 'products'], 0, 1); // Move first product down
    console.log('Test Move Item Down: ', jsonData.data.products);
    moveItem(['data', 'products'], 1, -1); // Move it back up
    console.log('Test Move Item Up: ', jsonData.data.products);
  } else {
    console.error('Not enough products to test moving items');
  }
}

function testLoadSampleJson() {
  loadSampleJson();
  setTimeout(() => {
    console.log('Test Load Sample JSON: ', jsonData);
  }, 1000); // Wait for 1 second to allow the fetch to complete
}
