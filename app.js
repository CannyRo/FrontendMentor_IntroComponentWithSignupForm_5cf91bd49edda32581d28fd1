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
    console.log(nodeTable[1].nodeElement.id);
    submitForm();
  }
  function isEmpty(node) {
    console.log(`Node : ${node}, Value : ${node.value}`);
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
  function showError(node) {
    if (node.tagName == "input") {
      node.classList.add("error--outline");
    } else {
      node.classList.add("error--visible");
    }
  }
  function controlInput(index) {
    console.log("ID targeted : ", index.nodeElement.id);
    console.log("Value targeted : ", index.nodeElement.value);
    if ((index.nodeElement.id == "email")) {
      if (isEmpty(index.nodeElement)) {
        emailMessageError = "Email Address cannot be empty";
        emailError.textContent = emailMessageError;
        index.nodeElement.isOK = false;
        return;
      } else if (isEmail(index.nodeElement.value)) {
        emailMessageError = "Looks like this is not an email";
        emailError.textContent = emailMessageError;
        index.nodeElement.isOK = false;
        return;
      } else {
        index.nodeElement.isOK = true;
        return;
      }
    } else {
      if (isEmpty(index.nodeElement)) {
        index.nodeElement.isOK = false;
        return;
      } else {
        index.nodeElement.isOK = true;
        return;
      }
    }
  }
  function controlError(index) {
    if(!index.nodeElement.isOK){
        index.nodeElement.classList.add("error--outline");
        index.nodeElement.nextSibling.add("error--visible");
        index.nodeElement.nextSibling.nextSibling.add("error-visible");
        e.preventDefault();
    }
  }
  function submitForm() {
    emailMessageError = "";
    formNode.addEventListener("submit", (e) => {
      e.preventDefault();
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
      nodeTable.map( inputTargeted => {
        let targetId = inputTargeted.nodeElement.id;
        let targetNode = document.getElementById("targetId");
        console.log("inputTargeted ID", inputTargeted.nodeElement.id);
        console.log("inputTargeted value", inputTargeted.nodeElement.value);
        controlInput(inputTargeted);
      })
      console.log("nodeTable ==> ", nodeTable);
    });
  }
}
window.addEventListener("load", app);
