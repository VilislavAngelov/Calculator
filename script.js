//BONUS
//add KEYBOARD SUPPORT

let num1 = '';
let num2 = '';
let operator = null;
let expectingNum2 = false;
let isNum1Perc = false;
let isNum2Perc = false;
let isNum1Dec = false;
let isNum2Dec = false;

const btnCollection = document.querySelectorAll('.calc-btn');
const validKeys = Array.from(btnCollection, button => button.textContent);
const basicOperators = ["+", "-", "x", "/"];
const operatorIds = ["btn-plus", "btn-minus", "btn-multiply", "btn-divide"];
const display = document.getElementById("display");
const kayboard = document.getElementById("keyboard");

const add = (a, b) => Math.round((a + b) * 1e15) / 1e15;
const subtract = (a, b) => Math.round((a - b) * 1e15) / 1e15;
const multiply = (a, b) => Math.round((a * b) * 1e15) / 1e15;
const divide = (a, b) => Math.round((a / b) * 1e15) / 1e15;
const percent = (a, b = 1) => Math.round(((b * a) / 100) * 1e15) / 1e15;

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
        if(num2 === 0) {
            display.value = "Snarky Error Message";
            break;
        }
      display.value = divide(num1, num2);
      break;
  }
}

document.addEventListener("keydown", function (e) {
    doCalc(e);
})

keyboard.addEventListener("click", function (e) {
//   if (e.target.classList.contains("calc-btn")) {
//     const key = e.target.textContent
    
    
//   }

    doCalc(e);
});

function doCalc(e) {
    let key = null;
    if(validKeys.includes(e.key)) {
        key = e.key;
    }
    if(validKeys.includes(e.target.textContent)) {
        key = e.target.textContent;
    }

    if (!isNaN(key) || key === '.' || key === '%'  || (key === '-'  && !expectingNum2 && num1 === '') || (key === '-' && expectingNum2 && num2 === '')) {
        if((isNum1Perc && key === '%') || (isNum1Dec && key === '.' && !expectingNum2) || (isNum2Perc && key === '%') || (isNum2Dec && key === '.' && expectingNum2)) {
            return;
        }
        if (!expectingNum2) {
          num1 += key;
          display.value += key;
          if(key === '%') {
            isNum1Perc = true;
          }
          if(key === '.') {
            isNum1Dec = true;
          }
        } else {
          num2 += key;
          display.value += key;
          if(key === '%') {
            isNum2Perc = true;
          }
          if(key === '.') {
            isNum2Dec = true;
          }
        }
        return
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
                isNum1Dec = false;
                isNum2Dec = false;
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
            isNum1Dec = false;
            isNum2Dec = false;
          }
    }

    if(num1 != '' && isNum1Perc && num2 == '') {
        display.value = percent(parseFloat(num1));
    }

    if (!(num1 == '') && basicOperators.includes(key)) {
        operator = key;
        expectingNum2 = true;
        let chkDisp = display.value.split("").reverse()
        if(!basicOperators.includes(chkDisp[0])) {
            display.value += operator;
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
        isNum1Dec = false;
        isNum2Dec = false;
      }

    // check if e.target.textcontent is a valide key
    // const key = e.target.textConent
    // ||
    // check if e.key is a valid key 
    // const key = e.key
}
