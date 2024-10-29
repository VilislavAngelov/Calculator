//TODO
//functions to populate the disaplay 
//make the calc work
//opearate()
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

const basicOperators = ['+', '-', 'x', '/'];
const display = document.getElementById("display");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(num1, num2, operator) {

    switch(operator) {
        case '+':
            display.value = add(num1, num2);
            break;
        case '-':
            display.value = subtract(num1, num2);
            break;
        case 'x':
            display.value = multiply(num1, num2);
            break;
        case '/':
            display.value = divide(num1, num2);
            break;
    }
}

document.addEventListener("click", function(e) {
    display.value += e.target.textContent;
    if(e.target.id === "btn-clear"){
        display.value = "";
    }

    if(e.target.id === 'btn-equals') {
        let expr = display.value.split("");
        for(let i = 0; i < expr.length; i++) {
            if(basicOperators.includes(expr[i])){
                num1 = expr.splice(0, i).join("");
                operator = expr.splice(0, 1).toString();
                i = 0;
            }
            if(expr[i] == '='){
                num2 = expr.splice(0, i).join("");
            }
        }
        operate(parseInt(num1), parseInt(num2), operator)
    }
})

