function app() {
  //Get DOM variables and container
  const formNode = document.getElementById("myForm");
//   const buttonNode = document.getElementById("mySubmit");

  const firstnameInput = document.getElementById("firstname");
//   const firstnameError = document.getElementById("firstnameError");

  const lastnameInput = document.getElementById("lastname");
//   const lastnameError = document.getElementById("lastnameError");

  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  const passwordInput = document.getElementById("password");
//   const passwordError = document.getElementById("passwordError");

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
    submitForm();
  }
  function isEmpty(node) {
    console.log(`Node : ${node.id}, Value : ${node.value}`);
    if (
      node.value !== null &&
      node.value !== undefined &&
      node.value.trim() !== ""
    ) {
      console.log("Not null, not undefined, not empty")
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
  function controlInput(index) {
    console.log("=================");
    console.log("FOO => ", index);
    console.log("isOK ? (before checked) ", index.isOk);
    console.log("ID targeted : ", index.nodeElement.id);
    console.log("Value targeted : ", index.nodeElement.value);
    if(isEmpty(index.nodeElement)){
      console.log(" is Empty ? : ", isEmpty(index.nodeElement));
      if(index.nodeElement.id == "email"){
        emailMessageError = "Email Address cannot be empty";
        console.log(emailMessageError);
      }
      index.isOk = false;
      return;
    }
    if(index.nodeElement.id == "email" && !isEmail(index.nodeElement.value)){
      console.log(" is Email ? : ",isEmail(index.nodeElement.value));
      emailMessageError = "Looks like this is not an email";
      console.log(emailMessageError);
      index.isOk = false;
      return;
    }
    index.isOk = true;
  }
  function showError(index, event) {
    if(index.nodeElement.id == "email"){
      const emailMessageErrorContainer = document.getElementById("emailError");
      emailMessageErrorContainer.textContent = emailMessageError;
    }
    if(!index.isOk){
      // console.log("index ==> ",index);
        index.nodeElement.classList.add("error--outline");
        let errorIcon = document.getElementById(index.nodeElement.id).nextSibling.nextSibling;
        errorIcon.classList.add("error--visible");
        // console.log("errorIcon targeted ===> ", errorIcon);
        // console.log("errorIcon.id => ", errorIcon.id);
        // index.nodeElement.nextSibling.nextSibling.classList.add("error-visible");
        let errorMessage = document.getElementById(errorIcon.id).nextSibling.nextSibling;
        errorMessage.classList.add("error--visible");
        // console.log("errorMessage targeted ===> ", errorMessage);

        event.preventDefault();
    }
  }
  function clear(index) {
    console.log("Clear of ", index.nodeElement.id);
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
      // e.preventDefault();
      // Init the node array with all "isOK" value to "FALSE" before checking them
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
      nodeTable.map(inputTargeted => controlInput(inputTargeted));
      console.log("nodeTable ==> ", nodeTable);
      nodeTable.map( inputTargeted => showError(inputTargeted, e));
    });
  }
}
window.addEventListener("load", app);
