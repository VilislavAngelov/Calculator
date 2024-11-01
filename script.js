let num1 = "";
let num2 = "";
let operator = null;
let expectingNum2 = false;
let isNum1Perc = false;
let isNum2Perc = false;
let isNum1Dec = false;
let isNum2Dec = false;

//mapping keyboard keys to button id's
const keyMappings = {
  0: "btn-0",
  1: "btn-1",
  2: "btn-2",
  3: "btn-3",
  4: "btn-4",
  5: "btn-5",
  6: "btn-6",
  7: "btn-7",
  8: "btn-8",
  9: "btn-9",
  "+": "btn-plus",
  "-": "btn-minus",
  "*": "btn-multiply", // Map "*" to multiply button
  "/": "btn-divide",
  Enter: "btn-equals",
  "=": "btn-equals",
  ".": "btn-dot",
  "%": "btn-percent",
  Backspace: "btn-backspace",
  c: "btn-clear",
  C: "btn-clear",
};

const btnCollection = document.querySelectorAll(".calc-btn");
const validKeys = Array.from(btnCollection, (button) => button.textContent);
const basicOperators = ["+", "-", "x", "/"];
const operatorIds = ["btn-plus", "btn-minus", "btn-multiply", "btn-divide"];
const display = document.getElementById("display");
const keyboard = document.getElementById("keyboard");

//basic calculator functions, only allow 14 digits
const add = (a, b) => Math.round((a + b) * 1e14) / 1e14;
const subtract = (a, b) => Math.round((a - b) * 1e14) / 1e14;
const multiply = (a, b) => Math.round(a * b * 1e14) / 1e14;
const divide = (a, b) => Math.round((a / b) * 1e14) / 1e14;
const percent = (a, b = 1) => Math.round(((b * a) / 100) * 1e14) / 1e14;

//determine which calculation we're doing
function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      display.value = add(num1, num2);
      break;
    case "-":
      display.value = subtract(num1, num2);
      break;
    case "x":
      display.value = multiply(num1, num2);
      break;
    case "/":
      if (num2 === 0) {
        display.value = "Snarky Error Message";
        break;
      }
      display.value = divide(num1, num2);
      break;
  }
}

//listen for keyboard events
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;

  //checks if the key exists in the calculator
  if (keyMappings.hasOwnProperty(key)) {
    const buttonId = keyMappings[key];
    const buttonElement = document.getElementById(buttonId);
//if there is such element, click on it
    if (buttonElement) {
      buttonElement.click();
    }

    if (key === "Backspace" || key === "Enter" || key === "=") {
      event.preventDefault();
    }
  }
}

//listen for click and handle calculations
keyboard.addEventListener("click", function (e) {
  if (e.target.classList.contains("calc-btn")) {

    key = e.target.textContent;

    //this is checking if the input is numeric and allowing num1 to be negative,decimal or a percent
    if (
      !isNaN(key) ||
      key === "." ||
      key === "%" ||
      (key === "-" && !expectingNum2 && num1 === "") ||
      (key === "-" && expectingNum2 && num2 === "")
    ) {
        //the same but for num 2
      if (
        (isNum1Perc && key === "%") ||
        (isNum1Dec && key === "." && !expectingNum2) ||
        (isNum2Perc && key === "%") ||
        (isNum2Dec && key === "." && expectingNum2)
      ) {
        return;
      }
      //setting num1, setting flags if decimal or percentage
      if (!expectingNum2) {
        num1 += key;
        display.value += key;
        if (key === "%") {
          isNum1Perc = true;
        }
        if (key === ".") {
          isNum1Dec = true;
        }
        //setting num2, setting flags if decimal or percentage
      } else {
        num2 += key;
        display.value += key;
        if (key === "%") {
          isNum2Perc = true;
        }
        if (key === ".") {
          isNum2Dec = true;
        }
      }
      return;
    }

    //do an operation, only if all the numbers and operator are filled in
    if (num1 != "" && num2 != "" && operator != null) {
      if (operatorIds.includes(e.target.id)) {
        if (operator != null) {
            //checking if percentage, do this operation first and then do the global operation
          if (isNum1Perc) {
            num1 = percent(parseFloat(num1));
          }
          if (isNum2Perc) {
            num2 = percent(parseFloat(num1), parseFloat(num2));
          }
          operate(parseFloat(num1), parseFloat(num2), operator);
          num1 = parseFloat(display.value);
          resetCalculator();
          
          expectingNum2 = true;
        }
      }
      
      if (e.target.id === "btn-equals") {
        //same as the one above could maybe refactor it into a function
        if (isNum1Perc) {
          num1 = percent(parseFloat(num1));
        }
        if (isNum2Perc) {
          num2 = percent(parseFloat(num1), parseFloat(num2));
        }
        operate(parseFloat(num1), parseFloat(num2), operator);
        num1 = parseFloat(display.value);
        resetCalculator();
        expectingNum2 = true;
      }
    }

    if (num1 != "" && isNum1Perc && num2 == "") {
      display.value = percent(parseFloat(num1));
    }

    //adding the operator from an expression calculated by an operator for example 8+8+ will give 16+ and we wait for 2nd num input.
    if (!(num1 == "") && basicOperators.includes(key)) {
      operator = key;
      expectingNum2 = true;
      let chkDisp = display.value.split("").reverse();
      if (!basicOperators.includes(chkDisp[0])) {
        display.value += operator;
      }
    }

    //backspace, deteles the last thing written
    if (e.target.id === "btn-backspace" && display.value.length > 0) {
      let newDisplay = display.value.split("");
      display.value = newDisplay.splice(0, display.value.length - 2).join("");
    }

    if (e.target.id === "btn-clear") {
        resetCalculator();
        num1 = "";
        display.value = "";
    }
  }
});

function resetCalculator() {
    num2 = "";
    operator = null;
    expectingNum2 = false;
    isNum1Perc = false;
    isNum2Perc = false;
    isNum1Dec = false;
    isNum2Dec = false;
  }