const form = document.getElementById("form") as HTMLFormElement;
const btnLolign = document.getElementById("lolgin") as HTMLButtonElement;

type IForm = {
  [key: string]: string;
};

type IAuth = {
  [key: string]: any;
};

const users = {
  email: "jhinlmlz@gmail.com",
  password: "123456789",
};

const auth: IAuth = {
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

const getFormValues = (form: HTMLFormElement) => {
  const formData: IForm = {};
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    const name = input.name;
    const value = input.value;
    formData[name] = value;
  });
  return formData;
};
const displayError = (id: string, message: string) => {
  console.log(message);

  const span = document.getElementById(id) as HTMLElement;
  span.textContent = message;
  span.style.display = "block";
};
const hideError = (id: any) => {
  const span = document.getElementById(id) as HTMLElement;
  span.style.display = "none";
};
const generatePassword = (longitud = 8) => {
  let result = "";
  const abc = "abcdefghijklmnopqrstuvwxyz".split(""); // Espacios para convertir cara letra a un elemento de un array
  for (let i = 0; i <= longitud; i++) {
    const random = Math.floor(Math.random() * abc.length);
    result += abc[random];
  }
  return result;
};
const animationClick = () => {
  btnLolign.classList.add("clickit");
  setTimeout(() => {
    btnLolign.classList.remove("clickit");
  }, 200);
};
const setPassword = () => {
  const password = generatePassword();
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;

  emailInput.value = users.email;
  passwordInput.value = password;

  console.log(password);
};
const clickButton = () => {
  const btn = document.querySelector("#lolgin") as HTMLButtonElement;
  btn.click();
};
const onSubmit = (event: any) => {
  event.preventDefault();

  const values = getFormValues(form);

  Object.keys(auth).forEach((authField) => {
    const valueInput = values[authField];
    const rule = auth[authField];

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
};

btnLolign.addEventListener("click", animationClick);

form.addEventListener("submit", onSubmit);

const start = () => {
  setInterval(() => {
    setTimeout(setPassword, 1500);
  }, 1500);

  setInterval(() => {
    setTimeout(clickButton, 1750);
  }, 1550);
};

start();
