let operations = [];
let firstEntry = true;
let decimalEnabled = true;

const topScreen = document.querySelector(".top-screen");
const bottomScreen = document.querySelector(".bottom-screen");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const decimalButton = document.querySelector(".decimal");
const equalButton = document.querySelector(".equal");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");

/**
 * Event listener that will call the clear function on click
 */
clearButton.addEventListener("click", clear);

/**
 * Event listener to will clear the screen by one space
 */
deleteButton.addEventListener("click", () => {
	let string = bottomScreen.innerHTML;
	//if the space we are clearing is a decimal then reenable button
	if (string[string.length - 1] == ".") {
		decimalEnabled = true;
	}
	//remove last space
	bottomScreen.innerHTML = string.slice(0, -1);
});

/**
 * Event listener that will add a number to screen on click
 */
numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		bottomScreen.innerHTML += button.innerHTML;
	});
});

/**
 * Also you to key in numbers to screen
 */
document.addEventListener("keydown", (e) => {
	//only print if between 0 and 9
	if (e.key >= 0 && e.key < 10) {
		bottomScreen.innerText += e.key;
	}
});

/**
 * Event listener that will listen for operator buttons
 * to be clicked
 */
operatorButtons.forEach((button) => {
	button.addEventListener("click", () => {
		//make the string into a number
		let number = parseFloat(bottomScreen.innerHTML);
		//send it number and the operator
		pressedOperator(number, button.innerHTML);
	});
});

/**
 * Event listener that will listen for equal button to be pressed
 */
equalButton.addEventListener("click", () => {
	//only allow press if we have atleast one number saved
	//and there is a second number on screen
	if (bottomScreen.innerHTML != "" && !firstEntry) {
		equal();
	}
});

/**
 * Event Listener that will listen for decimal to be pressed
 */
decimalButton.addEventListener("click", () => {
	//only allow if decimal is enabled
	if (decimalEnabled) {
		bottomScreen.innerHTML += decimalButton.innerHTML;
		decimalEnabled = false;
	}
});

/**
 * Adds two numbers together
 * @param {number} number1
 * @param {number} number2
 * @returns sum of the two numbers
 */
let add = (number1, number2) => {
	return number1 + number2;
};

/**
 * Subtracts two numbers together
 * @param {number} number1
 * @param {number} number2
 * @returns difference of the two numbers
 */
let subtract = (number1, number2) => {
	return number1 - number2;
};

/**
 * Multiplies two numbers together
 * @param {number} number1
 * @param {number} number2
 * @returns product of two numbers
 */
let multiply = (number1, number2) => {
	return number1 * number2;
};

/**
 * Divides two numbers together
 * @param {number} number1
 * @param {number} number2
 * @returns Quotient of two numbers
 */
let divide = (number1, number2) => {
	return number1 / number2;
};

/**
 * Clears the screen of all numbers
 * resets calculator
 */
function clear() {
	operations = [];
	topScreen.innerHTML = "";
	bottomScreen.innerHTML = "";
	firstEntry = true;
	decimalEnabled = true;
}

/**
 * This functions handles a operator being pressed.
 * Stores values and computes each step when operator is pressed.
 * @param {number} number
 * @param {string} operator
 */
function pressedOperator(number, operator) {
	//No numbered stored yet and number on the screen
	if (firstEntry && bottomScreen.innerHTML != "") {
		//stores first value in array
		operations[0] = number;
		operations[1] = operator;
		//change the top of screen to display the number and operator picked
		topScreen.innerHTML = operations[0] + " " + operations[1];
		bottomScreen.innerHTML = "";
		firstEntry = false;
		decimalEnabled = true;
	}
	//one numbered stored and number on the screen
	else if (bottomScreen.innerHTML != "") {
		//check for division by zero
		if (isDivisionByZero(number, operations[1])) {
			return;
		}
		//store second number in array
		operations[2] = number;
		//compute each step in order because we did not press equal
		operations[0] = operate(operations[0], operations[2], operations[1]);
		//add next operator to queue
		operations[1] = operator;
		topScreen.innerHTML = operations[0] + " " + operations[1];
		bottomScreen.innerHTML = "";
		decimalEnabled = true;
	}
}

/**
 * Performs an operation on the numbers based on the operator
 * sent in
 * @param {number} value1
 * @param {number} value2
 * @param {string} operation that will be performed on values
 * @returns rounded value of operation that was performed
 */
function operate(value1, value2, operation) {
	let sum;
	//Determines which operation to do
	switch (operation) {
		case "x":
			sum = multiply(value1, value2);
			break;
		case "÷":
			sum = divide(value1, value2);
			break;
		case "+":
			sum = add(value1, value2);
			break;
		case "-":
			sum = subtract(value1, value2);
			break;
	}
	//round to two decimal places
	return Math.round(sum * 100) / 100;
}

/**
 * The will perform the operation specified between the two numbers
 */
function equal() {
	let number = parseFloat(bottomScreen.innerHTML);
	//do not allow division by zero
	if (isDivisionByZero(number, operations[1])) {
		return;
	}
	//perform operatin on the numbers
	let sum = operate(operations[0], number, operations[1]);
	//display and reset calculator
	topScreen.innerHTML = sum;
	bottomScreen.innerHTML = "";
	firstEntry = true;
	decimalEnabled = true;
}

/**
 * Checks for division by zero
 * @param {number} number
 * @param {string} operator
 * @returns boolean true if division by zero; false if not
 */
function isDivisionByZero(number, operator) {
	if (number == 0 && operator == "÷") {
		alert("No division by zero!");
		bottomScreen.innerHTML = "";
		decimalEnabled = true;
		return true;
	}

	return false;
}
