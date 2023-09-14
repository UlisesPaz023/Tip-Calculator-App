const billInput = document.getElementById("billInput");
const numberOfPeopleInput = document.getElementById("numberOfPeopleInput");
const btns = document.querySelectorAll(".spliter__tipButton");
const amountPrice = document.querySelectorAll(".amount__price");
const resetButton = document.getElementById("resetButton");
const customInput = document.getElementById("customInput");
const form = document.getElementById("form");
const msg = document.querySelectorAll(".spliter__msg");
const spliterInput = document.querySelectorAll(".spliter__input");
let isFocusInput = false;

resetButton.addEventListener("click", (e)=> {
  e.preventDefault();
  form.reset();
  amountPrice[0].textContent = `$0.00`;
  amountPrice[1].textContent = `$0.00`;
});

const obtenerValorInput = () => {
  return parseFloat(billInput.value);
};

const changeContent = (valor1, valor2) => {
  amountPrice[0].textContent = `$${valor1}`;
  amountPrice[1].textContent = `$${valor2}`;
};

const applyBorderStyle = (element, isValid) => {
  if (isValid) {
    element.style.border = ".2rem solid transparent";
  } else {
    element.style.border = ".2rem solid red";
  }
};

const applyErrorMessage = (element, message) => {
  element.textContent = message;
};


const validations = () => {
  const billValue = obtenerValorInput();
  const customValue = customInput.value;
  const peopleValue = numberOfPeopleInput.value;

  const isBillValid = billValue !== 0 && !isNaN(billValue);
  const isCustomValid = !isFocusInput || (customValue !== '' && customValue !== '0');
  const isPeopleValid = peopleValue !== '' && peopleValue !== '0';

  applyBorderStyle(spliterInput[0], isBillValid);
  applyErrorMessage(msg[0], isBillValid ? '' : 'Can not be zero.');

  applyBorderStyle(customInput, isCustomValid);
  applyErrorMessage(customInput, isCustomValid ? '' : 'Can not be zero.');

  applyBorderStyle(spliterInput[1], isPeopleValid);
  applyErrorMessage(msg[1], isPeopleValid ? '' : 'Can not be zero.');

  return isBillValid && isCustomValid && isPeopleValid;
};

const cleanValue = (intNumberInput) => {
  intNumberInput.addEventListener("input", () => {
    const value = intNumberInput.value;
    const cleanedValue = value.replace(/[^0-9]/, '');
    intNumberInput.value = cleanedValue;
  });
};

cleanValue(numberOfPeopleInput);

let calculator = (eachBtn, event) => {
  event.preventDefault();

  if(!validations()){
    return;
  }

  const btnValue = parseFloat(eachBtn.value);
  const inputValue = obtenerValorInput();
  const tipAmountPerPerson = ((btnValue * inputValue) / 100) /numberOfPeopleInput.value;
  const totalPerPerson = (inputValue + ((btnValue * inputValue)/100))/numberOfPeopleInput.value;
  changeContent(tipAmountPerPerson.toFixed(2), totalPerPerson.toFixed(2)); 
};

customInput.addEventListener("focus", ()=>{
  isFocusInput = true;
  customInput.removeAttribute("placeholder");
});

customInput.addEventListener("blur", () => {
  isFocusInput = false;
  if (!customInput.value.trim()) {
    customInput.setAttribute("placeholder", "Custom");
  }
});

btns.forEach((eachBtn, index)=> {
  if(index<5){
    eachBtn.addEventListener("click", (event) => {
      calculator(eachBtn, event);
    });
  } else {
    eachBtn.addEventListener("keyup", (event)=>{
      if(event.key === "Enter"){
        calculator(eachBtn, event);
      }
    });
  }
});
