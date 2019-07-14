function add(num1, num2){
    return Number(num1) + Number(num2);
}

function substract(num1, num2){
    return Number(num1) - Number(num2);
}

function multiply(num1, num2){
    return Number(num1) * Number(num2);
}

function divide(num1, num2){
    return Number(num1) / Number(num2);
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
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const equalsToButton = document.querySelector("#equalsTo");
let equationDisplay = document.querySelector("#equationDisplay");
let numbersDisplay = document.querySelector("#numbersDisplay");
let resultDisplay = document.querySelector("#resultDisplay");

/*
let currentNumber = "";
let currentOperator = "";
*/

let numbers = [];
let operators = [];

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
        operators.push(e.target.id);
        // If operator is directly clicked after another operator

        if ( /\+|\-|\*|\//.test(equationDisplay.textContent[equationDisplay.textContent.length - 2]) ){
            equationDisplay.textContent = equationDisplay.textContent.substring(0, equationDisplay.textContent.length - 2) + " " + e.target.textContent + " ";
        } else {
            // Display the number
            equationDisplay.textContent += " " + e.target.textContent + " ";

            // Save the number
            numbers.push(numbersDisplay.textContent);
            numbersDisplay.textContent = "";
        }        
    })
})

// Operates result
equalsToButton.addEventListener("click", (e) => {
    // Add the last typed number to the equation
    numbers.push(numbersDisplay.textContent);

    // Do multiplication and division first (for complex equations)
    for (let i = 0; i < operators.length; i++){
        if (operators[i] === "multiply"){
            numbers[i] = multiply(numbers[i], numbers[i+1]);
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
        } else if (operators[i] === "divide"){
            numbers[i] = divide(numbers[i], numbers[i+1]);
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
        } 
    }

    // Now do addition and substraction step by step
    // ToDo: Looks very copy-pasty!
    for (let i = 0; i <= operators.length; i++){
        if (operators[i] === "plus"){
            numbers[i] = add(numbers[i], numbers[i + 1]);
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
        } else if (operators[i] === "minus"){
            console.log("Komm ich hier rein?");
            numbers[i] = substract(numbers[i], numbers[i+1]);
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
        }
    }

    
    // Seltsam: Warum muss ich das nochmal hard coden?
    if (operators[0] === "plus"){
        numbers[0] = add(numbers[0], numbers[1]);
        numbers.splice(1, 1);
        operators.splice(1, 1);
    } else if (operators[0] === "minus"){
        numbers[0] = substract(numbers[0], numbers[1]);
        numbers.splice(0 + 1, 1);
        operators.splice(0, 1);
    }
    

    console.log("In the end the numbers are: " + numbers);
    console.log("In the end the operators are: " + operators);

})

// Clear display
clearButton.addEventListener("click", (e) => {
    equationDisplay.textContent = "";
    numbersDisplay.textContent = "";
    resultDisplay.textContent = "";

    numbers = [];
    operators = [];
})

