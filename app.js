function app() {
  //Get DOM variables and container
  const formNode = document.getElementById("myForm");

  let emailMessageError = "";
  let countError = 0;

  //Call or run the Init function
  Init();

  // Functions
  //// => Sequence of functions with listener onChange and onSubmit
  function Init() {
    console.log("App on");
    message = "";
    controlOnChange();
    controlOnSubmit();
  }
  //// => Check if an HTML element like input is empty or not
  function isEmpty(node) {
    if (
      node.value !== null &&
      node.value !== undefined &&
      node.value.trim() !== ""
    ) {
      return false;
    }
    return true;
  }
  //// => Check if a value is an emain or not
  function isEmail(value) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;
    if (value.match(emailRegex)) {
      return true;
    }
    return false;
  }
  //// => Show error by adding CSS class 
  function showError(node, nodeMessage) {
    node.classList.add("error--outline");
    let errorIcon = document.getElementById(node.id).nextSibling.nextSibling;
    errorIcon.classList.add("error--visible");
    nodeMessage.classList.add("error--visible");
  }
  //// => Hide error by remove CSS class 
  function cleanError(node, nodeMessage) {
    node.classList.contains("error--outline") && node.classList.remove("error--outline");
    let errorIcon = document.getElementById(node.id).nextSibling.nextSibling;
    errorIcon.classList.contains("error--visible") && errorIcon.classList.remove("error--visible");
    nodeMessage.classList.contains("error--visible") && nodeMessage.classList.remove("error--visible");
  }
  //// => Sequence of isEmpty(), isEmail(), cleanError()
  function controlAndShowError(node){
    let messageErrorContainer = document.getElementById(node.id).nextSibling.nextSibling.nextSibling.nextSibling;
    if(isEmpty(node)){
      if(node.id == "email"){
        emailMessageError = "Email Address cannot be empty";
        messageErrorContainer.textContent = emailMessageError;
      }
      countError++;
      showError(node, messageErrorContainer);
      return;
    }
    if(node.id == "email" && !isEmail(node.value)){
      emailMessageError = "Looks like this is not an email";
      messageErrorContainer.textContent = emailMessageError;
      countError++;
      showError(node, messageErrorContainer);
      return;
    }
    cleanError(node, messageErrorContainer);
  }
  //// => Run the control sequence on change
  function controlOnChange() {
    formNode.addEventListener("keyup", e => {
      let inputTargeted = document.getElementById(e.target.id);
      controlAndShowError(inputTargeted);
    });
  }
  //// => Run the control sequence on submit
  function controlOnSubmit() {
    formNode.addEventListener("submit", e => {
      countError = 0;
      let inputTable = document.getElementsByTagName("input");
      for (const [key, value] of Object.entries(inputTable)) {
        controlAndShowError(value);
      }
      if(countError > 0){
        e.preventDefault();
      }
    })
  }
}
window.addEventListener("load", app);
