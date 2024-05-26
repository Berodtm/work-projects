let jsonData = {};
let expandedState = {}; // Object to keep track of expanded state

function encodeAmpersands(jsonString) {
  return jsonString.replace(/&(?!amp;)/g, '&amp;');
}

function decodeAmpersands(text) {
  return typeof text === 'string' ? text.replace(/&amp;/g, '&') : text;
}

function readAndEncodeJson(inputId) {
  const jsonInput = document.getElementById(inputId).value;
  return encodeAmpersands(jsonInput);
}

function parseJson(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Invalid JSON:', e);
    return null;
  }
}

function updateTextarea(textareaId, text) {
  document.getElementById(textareaId).value = text;
}

function clearElementHtml(element) {
  element.innerHTML = '';
}

function updateUi(jsonData, outputId) {
  const outputDiv = document.getElementById(outputId);
  clearElementHtml(outputDiv);
  createEditableFields(jsonData, outputDiv);
  if (jsonData && jsonData.data && jsonData.data.products) {
    populateProductDropdown();
    populateItemDropdown();
    updatePreview();
  }
}

function displayJson() {
  const encodedJson = readAndEncodeJson('jsonInput');
  jsonData = parseJson(encodedJson);

  if (jsonData) {
    updateTextarea('jsonInput', encodedJson);
    updateUi(jsonData, 'output');
    captureExpandedState(); // Capture expanded state
    updatePreview();
    restoreExpandedState(); // Restore expanded state
  } else {
    document.getElementById('output').innerText = 'Invalid JSON!';
  }
  console.log(jsonData);
}

function setValueAt(path, value) {
  const encodedValue = encodeAmpersands(value);

  let obj = jsonData;
  for (let i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]];
    if (obj === undefined) {
      return;
    }
  }
  obj[path[path.length - 1]] = encodedValue;

  updateJsonDisplay();
  updatePreview();
}

function addBlurListenerAndUpdateField(input, path, key) {
  input.addEventListener('blur', function () {
    const newValue = input.value;
    const encodedValue = encodeAmpersands(newValue);

    if (newValue !== encodedValue) {
      input.value = encodedValue;
    }

    setValueAt(path.concat(key), encodedValue);
    displayJson();
  });
}

function createEditableFields(data, parentElement, path = []) {
  parentElement.innerHTML = ''; // Clear current content before adding new fields

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const title = item.title ? item.title : `Item ${index + 1}`;

      const div = document.createElement('div');
      div.className = 'item-container';

      const buttonDiv = document.createElement('div');
      buttonDiv.className = 'item-buttons';

      if (index > 0) {
        const upButton = document.createElement('button');
        upButton.textContent = `Move Up: ${title}`;
        upButton.onclick = function () {
          moveItem(path, index, -1);
        };
        buttonDiv.appendChild(upButton);
      }

      if (index < data.length - 1) {
        const downButton = document.createElement('button');
        downButton.textContent = `Move Down: ${title}`;
        downButton.onclick = function () {
          moveItem(path, index, 1);
        };
        buttonDiv.appendChild(downButton);
      }

      const deleteButton = document.createElement('button');
      deleteButton.textContent = `Delete ${title}`;
      deleteButton.onclick = function () {
        deleteItem(path, index);
      };
      buttonDiv.appendChild(deleteButton);

      const duplicateButton = document.createElement('button');
      duplicateButton.textContent = `Duplicate ${title}`;
      duplicateButton.onclick = function () {
        duplicateItem(path, index);
      };
      buttonDiv.appendChild(duplicateButton);

      const addKeyValueButton = document.createElement('button');
      addKeyValueButton.textContent = `Add Key-Value to ${title}`;
      addKeyValueButton.onclick = function () {
        addKeyValuePairToObject(path, index);
      };
      buttonDiv.appendChild(addKeyValueButton);

      div.appendChild(buttonDiv);

      const label = document.createElement('span');
      label.className = 'json-key';
      label.innerHTML = `<h2>Item ${index + 1}: ${title}</h2>`;
      label.style.display = 'block';
      label.style.textAlign = 'center';
      div.appendChild(label);

      const innerDiv = document.createElement('div');
      innerDiv.style.margin = '10px 20px';
      createEditableFields(item, innerDiv, path.concat(index));
      div.appendChild(innerDiv);

      parentElement.appendChild(div);
    });
  } else if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach((key) => {
      if (['data', 'products', 'items'].includes(key)) {
        createEditableFields(data[key], parentElement, path.concat(key));
      } else {
        const div = document.createElement('div');
        div.className = 'kv-pair';

        const span = document.createElement('span');
        span.textContent = key + ': ';
        div.appendChild(span);

        if (typeof data[key] === 'object' && data[key] !== null) {
          const nestedDiv = document.createElement('div');
          nestedDiv.style.marginLeft = '20px';
          createEditableFields(data[key], nestedDiv, path.concat(key));
          div.appendChild(nestedDiv);
        } else {
          const input = document.createElement('input');
          input.type = 'text';
          input.value = encodeAmpersands(data[key].toString());

          addBlurListenerAndUpdateField(input, path, key);

          div.appendChild(input);

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.className = 'delete-button';
          deleteButton.onclick = function () {
            removeKeyValue(path, key);
          };
          div.appendChild(deleteButton);
        }
        parentElement.appendChild(div);
      }
    });
  } else {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = encodeAmpersands(data.toString());

    addBlurListenerAndUpdateField(input, path);

    parentElement.appendChild(input);
  }
}

function addKeyValuePairToObject(path, index) {
  console.log(
    'addKeyValuePairToObject called with path:',
    path,
    'and index:',
    index
  );

  // Get the specific object where the new key-value pair will be added
  let obj = getValueAt(path.concat(index));
  console.log('Target object to add key-value:', obj);

  if (obj && typeof obj === 'object') {
    let key = prompt('Enter new key:');
    if (!key) {
      alert('Key cannot be empty.');
      return;
    }
    let value = prompt('Enter value for ' + key + ':');
    if (value === null) {
      alert('Process cancelled.');
      return;
    }
    obj[key] = encodeAmpersands(value); // Encode ampersands in the new value

    updateJsonDisplay(); // Update the JSON textarea
    displayJson(); // Refresh the UI
  } else {
    console.error('Target object is not valid for adding key-value pair');
  }
}

function removeKeyValue(path, key) {
  console.log('removeKeyValue called with path:', path, 'and key:', key);

  const parentPath = path;
  const obj = getValueAt(parentPath);
  console.log('Object at path:', parentPath, obj);

  if (obj && obj.hasOwnProperty(key)) {
    console.log(`Deleting key "${key}" from`, obj);
    delete obj[key];
    updateJsonDisplay();
    displayJson();
  } else {
    console.error('Key not found or object is undefined');
  }
}

function duplicateItem(path, index) {
  const arr = getValueAt(path);
  if (arr && index >= 0 && index < arr.length) {
    const newItem = JSON.parse(JSON.stringify(arr[index]));
    arr.splice(index + 1, 0, newItem);

    updateJsonDisplay();
    displayJson();
  }
}

function deleteItem(path, index) {
  const arr = getValueAt(path);
  if (arr && index >= 0 && index < arr.length) {
    arr.splice(index, 1);

    updateJsonDisplay();
    displayJson();
  }
}

function moveItem(path, index, direction) {
  const arr = getValueAt(path);
  if (!arr || index + direction < 0 || index + direction >= arr.length) {
    return;
  }

  const item = arr.splice(index, 1)[0];
  arr.splice(index + direction, 0, item);

  updateJsonDisplay();
  displayJson();
}

function getValueAt(path) {
  let obj = jsonData;
  for (let i = 0; i < path.length; i++) {
    obj = obj[path[i]];
    if (obj === undefined) {
      console.error('Path is invalid at', path[i]);
      return undefined;
    }
  }
  return obj;
}

function updateJsonDisplay() {
  document.getElementById('jsonInput').value = JSON.stringify(
    jsonData,
    null,
    2
  );
}

function addObjectToSelectedProduct() {
  const productIndex = document.getElementById('productSelect').value;
  const productTitle = jsonData.data.products[productIndex].title;
  addNewObjectToCategory(productTitle);
}

function addNewObjectToCategory(categoryTitle) {
  const numberOfPairs = parseInt(
    prompt('How many key/value pairs would you like to add?')
  );
  if (isNaN(numberOfPairs) || numberOfPairs <= 0) {
    alert('Please enter a valid number greater than 0.');
    return;
  }

  const newItem = {};

  for (let i = 0; i < numberOfPairs; i++) {
    const key = prompt('Enter key ' + (i + 1) + ':');
    if (!key) {
      alert('Key cannot be empty. Restarting process.');
      return;
    }
    const value = prompt('Enter value for ' + key + ':');
    if (value === null) {
      alert('Process cancelled.');
      return;
    }
    newItem[key] = value;
  }

  const category = jsonData.data.products.find(function (product) {
    return product.title === categoryTitle;
  });

  if (category) {
    if (!category.items) {
      category.items = [];
    }
    category.items.push(newItem);

    updateJsonDisplay();
    displayJson();
  }
}

function populateProductDropdown() {
  const select = document.getElementById('productSelect');
  select.innerHTML = '';
  if (jsonData.data && jsonData.data.products) {
    jsonData.data.products.forEach(function (product, index) {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = product.title;
      select.appendChild(option);
    });
  }
}

function populateItemDropdown() {
  const productIndex = document.getElementById('productSelect').value;
  const select = document.getElementById('itemSelect');
  select.innerHTML = '';

  if (!jsonData.data.products[productIndex].items) {
    jsonData.data.products[productIndex].items = [];
  }

  const items = jsonData.data.products[productIndex].items;
  items.forEach(function (item, index) {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = item.title || 'Item ' + index;
    select.appendChild(option);
  });
}

function removeSelectedItem() {
  const productIndex = document.getElementById('productSelect').value;
  const itemIndex = document.getElementById('itemSelect').value;

  if (!jsonData.data.products[productIndex].items) {
    alert('No items to remove.');
    return;
  }

  jsonData.data.products[productIndex].items.splice(itemIndex, 1);

  updateJsonDisplay();
  displayJson();
}

function updatePreview() {
  const preview = document.getElementById('previewContent');
  preview.innerHTML = '';

  if (jsonData && jsonData.data && jsonData.data.products) {
    jsonData.data.products.forEach(function (product, productIndex) {
      const productDiv = document.createElement('div');
      productDiv.className = 'collapsible';

      // Restore expanded state
      if (expandedState[productIndex]) {
        productDiv.classList.add('active');
      }

      const productText = document.createElement('div');
      productText.className = 'collapsible-text';
      productText.textContent = decodeAmpersands(product.title);

      const arrowDiv = document.createElement('div');
      arrowDiv.className = 'collapsible-arrow';

      productDiv.appendChild(productText);
      productDiv.appendChild(arrowDiv);

      productDiv.onclick = function () {
        this.classList.toggle('active');
        // Update the expanded state
        expandedState[productIndex] = this.classList.contains('active');
      };

      const itemList = document.createElement('div');
      itemList.className = 'collapsible-content';

      if (product.items && product.items.length > 0) {
        const ul = document.createElement('ul');
        ul.style.listStyleType = 'none'; // Remove bullet points
        ul.style.paddingLeft = '15px'; // Indent the list items
        product.items.forEach(function (item) {
          const li = document.createElement('li');
          li.textContent = decodeAmpersands(item.title);
          ul.appendChild(li);
        });
        itemList.appendChild(ul);
      }

      productDiv.appendChild(itemList);
      preview.appendChild(productDiv);
    });
  } else {
    preview.textContent = 'No products to display';
  }
}

function captureExpandedState() {
  jsonData.data.products.forEach((product, index) => {
    const productDiv = document.querySelector(
      `.collapsible:nth-child(${index + 1})`
    );
    expandedState[index] = productDiv.classList.contains('active');
  });
}

function restoreExpandedState() {
  document.querySelectorAll('.collapsible').forEach((productDiv, index) => {
    if (expandedState[index]) {
      productDiv.classList.add('active');
    }
  });
}

function updateJsonDisplay() {
  document.getElementById('jsonInput').value = JSON.stringify(
    jsonData,
    null,
    2
  );
}

function moveItem(path, index, direction) {
  const arr = getValueAt(path);
  if (!arr || index + direction < 0 || index + direction >= arr.length) {
    return;
  }

  const item = arr.splice(index, 1)[0];
  arr.splice(index + direction, 0, item);

  updateJsonDisplay();
  captureExpandedState(); // Capture state before updating UI
  displayJson(); // Refresh the entire UI including editable fields
  restoreExpandedState(); // Restore state after updating UI
}

populateProductDropdown();
