//TODO
//round answers with long decimals so that they don’t overflow the screen.
//Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

//BONUS
//Let them type in decimals, the . can only be pressed once per number
//add a backspace button
//add KEYBOARD SUPPORT

let num1 = '';
let num2 = '';
let operator = null;
let expectingNum2 = false;
let isNum1Perc = false;
let isNum2Perc = false;

const basicOperators = ["+", "-", "x", "/"];
const operatorIds = ["btn-plus", "btn-minus", "btn-multiply", "btn-divide"];
const display = document.getElementById("display");
const kayboard = document.getElementById("keyboard");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const percent = (a = 1, b) => (a * b) / 100;

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
      display.value = divide(num1, num2);
      break;
  }
}

keyboard.addEventListener("click", function (e) {
  if (e.target.classList.contains("calc-btn")) {
    const key = e.target.textContent

    display.value += key;
    if (!isNaN(key) || key === '.' || key === '%'  || (key === '-'  && !expectingNum2 && num1 === '') || (key === '-' && expectingNum2 && num2 === '')) {
        if (!expectingNum2) {
          num1 += key;
          if(key === '%') {
            isNum1Perc = true;
          }
        } else {
          num2 += key;
          if(key === '%') {
            isNum2Perc = true;
          }
        }
      }
    
      if (!(num1 == '') && basicOperators.includes(key)) {
        operator = key;
        expectingNum2 = true;
      }

    if(num1 != '' && num2 != '' && operator != null) {
        if (operatorIds.includes(e.target.id)) {
            if (operator != null) {
                if(isNum1Perc) {
                    num1 = percent(parseFloat(num1))
                }
                if(isNum2Perc) {
                    num2 = percent(parseFloat(num1), parseFloat(num2));
                }
                operate(parseFloat(num1), parseFloat(num2), operator);
                num1 = parseFloat(display.value);
                num2 = '';
                isNum1Perc = false;
                isNum2Perc = false;
                display.value += operator;
            }
          }
      
          if (e.target.id === "btn-equals") {
            if(isNum1Perc) {
                num1 = percent(parseFloat(num1))
            }
            if(isNum2Perc) {
                num2 = percent(parseFloat(num1), parseFloat(num2));
            }
            operate(parseFloat(num1), parseFloat(num2), operator);
            num1 = parseFloat(display.value);
            operator = null;
            num2 = '';
            isNum1Perc = false;
            isNum2Perc = false;
          }
    }
    
    if(e.target.id === "btn-backspace" && display.value.length > 0) {
        let newDisplay = display.value.split("");
        display.value = newDisplay.splice(0, display.value.length - 2).join("");
    }

    if (e.target.id === "btn-clear") {
        display.value = "";
        num1 = '';
        num2 = '';
        operator = null;
        expectingNum2 = false;
        isNum1Perc = false;
        isNum2Perc = false;
      }
  }
});
