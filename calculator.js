function add(num1, num2){
    return num1 + num2;
}

function substract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){
    switch(operator){
        case "plus":
            return add(num1, num2);
            break;
        case "minus":
            return substract(num1, num2);
            break;
        case "multiply":
            return multiply(num1, num2);
            break;
        case "divide":
            return divide(num1, num2);
            break;
        default:
            //
    }
}

// DOM-Selectors
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const equalsTo = document.querySelector("#equalsTo");
let equationDisplay = document.querySelector("#equationDisplay");
let numbersDisplay = document.querySelector("#numbersDisplay");
let resultDisplay = document.querySelector("#resultDisplay");

let currentNumber = "";
let currentOperator = "";

let numbers = [];
let operators = [];

// Display numbers after click
numbers.forEach((button) => {

    button.addEventListener("click", (e) => {
        equationDisplay.textContent += e.target.textContent;
        numbersDisplay.textContent += e.target.textContent;
    })
})

// Display operators after click
operators.forEach((button) => {
    button.addEventListener("click", (e) => {
        currentOperator = e.target.id;
        // If operator is directly clicked after another operator

        if ( /\+|\-|\*|\//.test(equationDisplay.textContent[equationDisplay.textContent.length - 2]) ){
            equationDisplay.textContent = equationDisplay.textContent.substring(0, equationDisplay.textContent.length - 2) + " " + e.target.textContent + " ";
        } else {
            // Display the number
            equationDisplay.textContent += " " + e.target.textContent + " ";

            // Save the number
            currentNumber = numbersDisplay.textContent;
            numbersDisplay.textContent = "";
        }        
    })
})

// Operates result
equalsTo.addEventListener("click", (e) => {
    let lastNumber = numbersDisplay.textContent;
    resultDisplay.textContent = operate(currentOperator, Number(currentNumber), Number(lastNumber));
    numbersDisplay.textContent = "";
})

// Clear display
clearButton.addEventListener("click", (e) => {
    equationDisplay.textContent = "";
    numbersDisplay.textContent = "";
    resultDisplay.textContent = "";

    currentNumber = "";
    currentOperator = "";
})

/*
// Helper method: Give me the number after the second to last operator
function indexOfLastNumber(str){
    let lastIndex = 0;
    let regex = /\+|\-|\*|\//;

    if(str.search(regex) === str.length - 2){
        alert("klappt das?");
        return lastIndex;
    }

    for (let i = 0; i < str.length; i++){
        if (regex.test(str[i])){    // We want to get the last operator
            lastIndex = i + 2;      // + 2 because you want the number, not the operator + space
        }
    }
    return lastIndex;
}
*/

// ToDo/Improvement: 
// Save all typed numbers and operators into arrays (?)
// Write a function to solve complex equations (e.g. multiply > division > plus minus)
