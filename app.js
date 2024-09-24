function app() {
  //Get DOM variables and container
  const formNode = document.getElementById("myForm");
  const firstnameInput = document.getElementById("firstname");
  const lastnameInput = document.getElementById("lastname");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  let emailMessageError = "";

  let nodeTable = [
    {
      nodeElement: firstnameInput,
      isOk: false,
    },
    {
      nodeElement: lastnameInput,
      isOk: false,
    },
    {
      nodeElement: emailInput,
      isOk: false,
    },
    {
      nodeElement: passwordInput,
      isOk: false,
    },
  ];

  Init();

  function Init() {
    console.log("App on");
    message = "";
    console.log(nodeTable);
    // console.log(nodeTable[1].nodeElement.id);
    controlOnChange();
    submitForm();
  }
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
  function isEmail(value) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;
    if (value.match(emailRegex)) {
      return true;
    }
    return false;
  }
  function showError(node, nodeMessage) {
    node.classList.add("error--outline");
    let errorIcon = document.getElementById(node.id).nextSibling.nextSibling;
    errorIcon.classList.add("error--visible");
    nodeMessage.classList.add("error--visible");
  }
  function cleanError(node, nodeMessage) {
    node.classList.contains("error--outline") && node.classList.remove("error--outline");
    let errorIcon = document.getElementById(node.id).nextSibling.nextSibling;
    errorIcon.classList.contains("error--visible") && errorIcon.classList.remove("error--visible");
    nodeMessage.classList.contains("error--visible") && nodeMessage.classList.remove("error--visible");
  }
  function controlAndShowError(node){
    let messageErrorContainer = document.getElementById(node.id).nextSibling.nextSibling.nextSibling.nextSibling;
    console.log(messageErrorContainer);
    if(isEmpty(node)){
      if(node.id == "email"){
        emailMessageError = "Email Address cannot be empty";
        messageErrorContainer.textContent = emailMessageError;
      }
      showError(node, messageErrorContainer);
      return;
    }
    if(node.id == "email" && !isEmail(node.value)){
      emailMessageError = "Looks like this is not an email";
      messageErrorContainer.textContent = emailMessageError;
      showError(node, messageErrorContainer);
      return;
    }
    cleanError(node, messageErrorContainer);
  }
  function controlOnChange() {
    formNode.addEventListener("keyup", e => {
      console.log(e.target);
      let inputTargeted = document.getElementById(e.target.id);
      console.log("inputTargeted.id ??? ", inputTargeted.id);
      controlAndShowError(inputTargeted);
    });
  }
  


  function controlInput_1(index) {
    if(isEmpty(index.nodeElement)){
      if(index.nodeElement.id == "email"){
        emailMessageError = "Email Address cannot be empty";
      }
      index.isOk = false;
      return;
    }
    if(index.nodeElement.id == "email" && !isEmail(index.nodeElement.value)){
      emailMessageError = "Looks like this is not an email";
      index.isOk = false;
      return;
    }
    index.isOk = true;
  }
  function showError_1(index, event) {
    if(index.nodeElement.id == "email"){
      const emailMessageErrorContainer = document.getElementById("emailError");
      emailMessageErrorContainer.textContent = emailMessageError;
    }
    if(!index.isOk){
        index.nodeElement.classList.add("error--outline");
        let errorIcon = document.getElementById(index.nodeElement.id).nextSibling.nextSibling;
        errorIcon.classList.add("error--visible");
        let errorMessage = document.getElementById(errorIcon.id).nextSibling.nextSibling;
        errorMessage.classList.add("error--visible");
        event.preventDefault();
    }
  }
  function clear(index) {
    if(index.nodeElement.id == "email"){
      const emailMessageErrorContainer = document.getElementById("emailError");
      emailMessageErrorContainer.textContent = "";
      emailMessageError = "";
    }
    index.nodeElement.classList.contains("error--outline") && index.nodeElement.classList.remove("error--outline");
    let errorIcon = document.getElementById(index.nodeElement.id).nextSibling.nextSibling;
    errorIcon.classList.contains("error--visible") && errorIcon.classList.remove("error--visible");
    let errorMessage = document.getElementById(errorIcon.id).nextSibling.nextSibling;
    errorMessage.classList.contains("error--visible") && errorMessage.classList.remove("error--visible");
  }
  function hideError() {
    nodeTable = [
      {
        nodeElement: firstnameInput,
        isOk: false,
      },
      {
        nodeElement: lastnameInput,
        isOk: false,
      },
      {
        nodeElement: emailInput,
        isOk: false,
      },
      {
        nodeElement: passwordInput,
        isOk: false,
      },
    ];
    nodeTable.map(inputTargeted => clear(inputTargeted));
  }
  function submitForm() {
    emailMessageError = "";
    formNode.addEventListener("submit", (e) => {
      hideError();
      nodeTable = [
        {
          nodeElement: firstnameInput,
          isOk: false,
        },
        {
          nodeElement: lastnameInput,
          isOk: false,
        },
        {
          nodeElement: emailInput,
          isOk: false,
        },
        {
          nodeElement: passwordInput,
          isOk: false,
        },
      ];
      nodeTable.map(inputTargeted => controlInput_1(inputTargeted));
      nodeTable.map( inputTargeted => showError_1(inputTargeted, e));
    });
  }
}
window.addEventListener("load", app);
