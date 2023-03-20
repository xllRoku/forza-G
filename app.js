const form = document.getElementById("form");
const btnLolign = document.getElementById("lolgin");

btnLolign.addEventListener("click", () => {
  btnLolign.classList.add("clickit");
  setTimeout(() => {
    btnLolign.classList.remove("clickit");
  }, 200);
});

const users = {
  email: "jhinlmlz@gmail.com",
  password: "123456789",
};

const getFormValues = (form) => {
  const formData = {};
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    const name = input.name;
    const value = input.value;
    formData[name] = value;
  });
  return formData;
};

const displayError = (id, message) => {
  console.log(message);

  const span = document.getElementById(id);
  span.textContent = message;
  span.style.display = "block";
};

const hideError = (id) => {
  const span = document.getElementById(id);
  span.style.display = "none";
};

const validationRules = {
  email: {
    required: true,
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    errorMessage: {
      generic: "This field is required",
      unique: "The email isn't correct",
    },
    id: "email-error",
  },
  password: {
    required: true,
    errorMessage: {
      generic: "This field is required",
      unique: "The password should have at least 10 characters",
    },
    id: "password-error",
  },
};

const generarString = (longitud = 8) => {
  let result = "";
  const abc = "abcdefghijklmnopqrstuvwxyz".split(""); // Espacios para convertir cara letra a un elemento de un array
  for (i = 0; i <= longitud; i++) {
    const random = Math.floor(Math.random() * abc.length);
    result += abc[random];
  }
  return result;
};

const clickButton = () => {
  document.querySelector("#lolgin").click();
};

const setPassword = () => {
  const password = generarString();
  document.getElementById("email").value = users.email;
  document.getElementById("password").value = password;
  console.log(password);
};

setInterval(() => {
  setTimeout(setPassword, 1000);
}, 1500);

setInterval(() => {
  setTimeout(clickButton, 1250);
}, 1350);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = getFormValues(form);

  Object.keys(validationRules).forEach((field) => {
    const valueInput = values[field];
    const rule = validationRules[field];

    const theInputIsEmpty = rule && !valueInput;
    const incorrectPattern = rule.pattern && !rule.pattern.test(valueInput);

    if (valueInput === users["email"]) {
      displayError("credentials-error", "incorrect credentials");
    } else {
      if (theInputIsEmpty) displayError(rule.id, rule.errorMessage.generic);
      else {
        if (incorrectPattern) displayError(rule.id, rule.errorMessage.unique);
        else hideError(rule.id);
      }
    }
  });
});
