  // grabs information from a field on the page and listens for an put and feeds it to new function. 
  const uniqueIDInput2 = document.getElementById("unique-id");
  uniqueIDInput2.addEventListener("input", blockSpecialDash);

  // This is a function listens for input (of a dash) above and saves a copy of the input in the code. 
  function blockSpecialDash(event) {
      // saves inout to the below const variable
      const inputField = event.target;
      // create a blank let variable to save the edited input. 
      let inputValue = inputField.value;
      // Replace "-" with "0" and save to the let variable.
      inputValue = inputValue.replace(/-/g, "0");

      // update's the page / input vlaue by pasteing he 0 from the let variable. 
      inputField.value = inputValue;
  }