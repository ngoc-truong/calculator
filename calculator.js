function add(num1, num2){
    secondNumZero(num2); // If second number is the dividebyzero error message, return it (or else it will be NaN)
    return Number(num1) + Number(num2);
}

function substract(num1, num2){
    secondNumZero(num2); 
    return Number(num1) - Number(num2);
}

function multiply(num1, num2){
    secondNumZero(num2); 
    return Number(num1) * Number(num2);
}

function divide(num1, num2){
    if (num2 === 0 || num2 === "0"){
        return divideByZero;
    }
    return Number(num1) / Number(num2);
}

// Helper function: If num2 = "Sorry...", return num2
function secondNumZero(secondNum){
    if (secondNum === divideByZero){
        return divideByZero;
    }
}



// Operates result
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
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const equalsToButton = document.querySelector("#equalsTo");
let equationDisplay = document.querySelector("#equationDisplay");
let numbersDisplay = document.querySelector("#numbersDisplay");
let resultDisplay = document.querySelector("#resultDisplay");

let numbers = [];
let operators = [];
let divideByZero = "Sorry, you cannot divide by 0!";

// Display numbers after click
numberButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        equationDisplay.textContent += e.target.textContent;
        numbersDisplay.textContent += e.target.textContent;
    })
})

// Display operators after click
operatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // If operator is directly clicked after another operator
        if ( /\+|\-|\*|\//.test(equationDisplay.textContent[equationDisplay.textContent.length - 2]) ){
            equationDisplay.textContent = equationDisplay.textContent.substring(0, equationDisplay.textContent.length - 2) + " " + e.target.textContent + " ";
            operators[operators.length - 1] = e.target.id;
        } else {
            // Display the number
            equationDisplay.textContent += " " + e.target.textContent + " ";

            // Save number and operator in array
            numbers.push(numbersDisplay.textContent);
            operators.push(e.target.id);
            numbersDisplay.textContent = "";
        }        
    })
})

// Do calculations
equalsToButton.addEventListener("click", (e) => {
    // If nothing has been entered yet, return
    if (numbersDisplay.textContent === ""){
        return;
    }

    // Add the last typed number to the equation
    numbers.push(numbersDisplay.textContent);
    
    // Precedence: multipl > division > addition/substraction
    for (let i = 0; i < operators.length; i++){
        if (operators[i] === "multiply"){
            replaceResult(i, "multiply", numbers, operators);
        }
    }
    numbers = clearX(numbers);
    operators = clearX(operators);

    for (let i = 0; i < operators.length; i++){
        if (operators[i] === "divide"){
            replaceResult(i, "divide", numbers, operators);
        } 
    }
    numbers = clearX(numbers);
    operators = clearX(operators);

    // Addition and substraction
    for (let i = 0; i <= operators.length; i++){
        if (operators[i] === "plus"){
            replaceResult(i, "plus", numbers, operators);
        } else if (operators[i] === "minus"){
            replaceResult(i, "minus", numbers, operators);
        }
    }
    numbers = clearX(numbers);
    operators = clearX(operators);

    // Print rounded result or error message on display
    if (isNaN(numbers[0])){
        resultDisplay.textContent = numbers[0];
    } else {
        resultDisplay.textContent = Number.isInteger(numbers[0]) ? numbers[0] : numbers[0].toFixed(4);
    }
    clearAll();
})

// Helper functions
// Because I replace every finished calculated with an x, the x has to be cleared in new loops
function clearX(array){
    return array.filter(item => item !== "x");
}

// Replaces the result of an intermediate step in the arrays
function replaceResult(index, operator, nums, ops){
    if (nums[index] === divideByZero){
        nums[index + 1] = divideByZero;
        nums[index] = divideByZero;
    } else {
        nums[index + 1] = operate(operator, nums[index], nums[index + 1]);
        nums[index] = "x";
    }
    ops[index] = "x";
}

// Clear display
clearButton.addEventListener("click", (e) => {
    clearAll();
    resultDisplay.textContent = "";
})

function clearAll(){
    equationDisplay.textContent = "";
    numbersDisplay.textContent = "";
    numbers = [];
    operators = [];
}

