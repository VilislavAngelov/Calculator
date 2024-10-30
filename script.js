//TODO
//ifd we have an operator se already and a operator is selected again, the opearte an owhat we have and otupt the result with the new operator waiting for input
//Your calculator should not evaluate more than a single pair of numbers at a time.
//round answers with long decimals so that they don’t overflow the screen.
//Pressing “clear” should wipe out any existing data. Make sure the user is really starting fresh after pressing “clear”
//Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

//BONUS
//Let them type in decimals, the . can only be pressed once per number
//add a backspace button
//add KEYBOARD SUPPORT

let num1;
let num2;
let operator;

const basicOperators = ["+", "-", "x", "/"];
const operatorIds = ["btn-plus", "btn-minus", "btn-multiply", "btn-divide"];
const display = document.getElementById("display");
const kayboard = document.getElementById("keyboard");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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
    display.value += e.target.textContent;
    if (e.target.id === "btn-clear") {
      display.value = "";
      num1 = undefined;
      num2 = undefined;
      operator = undefined;
    }

    if (operatorIds.includes(e.target.id)) {
      if (operator != undefined) {
        let expr = display.value.split("");
        exprEval = expr.splice(0, expr.length - 1);
        for (let i = 0; i < exprEval.length; i++) {
          if (basicOperators.includes(exprEval[i])) {
            num1 = exprEval.splice(0, i).join("");
            operator = exprEval.splice(0, 1).toString();
            i = 0;
            num2 = exprEval.splice(0, exprEval.length);
          }
          operate(parseInt(num1), parseInt(num2), operator);
          num1 = parseInt(display.value);
          operator = expr.join("");
          num2 = undefined;
          display.value += operator;
        }
      }
      operator = e.target.id;
    }

    if (e.target.id === "btn-equals") {
      let expr = display.value.split("");
      for (let i = 0; i < expr.length; i++) {
        if (basicOperators.includes(expr[i])) {
          num1 = expr.splice(0, i).join("");
          operator = expr.splice(0, 1).toString();
          i = 0;
        }
        if (expr[i] == "=") {
          num2 = expr.splice(0, i).join("");
        }
      }
      operate(parseInt(num1), parseInt(num2), operator);
      num1 = parseInt(display.value);
      operator = undefined;
      num2 = undefined;
    }
  }
});
