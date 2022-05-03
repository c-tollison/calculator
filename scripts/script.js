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

clearButton.addEventListener("click", clear);

deleteButton.addEventListener("click", () => {
	let string = bottomScreen.innerHTML;
	if (string[string.length - 1] == ".") {
		decimalEnabled = true;
	}
	bottomScreen.innerHTML = string.slice(0, -1);
});

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		bottomScreen.innerHTML += button.innerHTML;
	});
});

operatorButtons.forEach((button) => {
	button.addEventListener("click", () => {
		let number = parseFloat(bottomScreen.innerHTML);
		pressedOperator(number, button.innerHTML);
	});
});

equalButton.addEventListener("click", () => {
	if (bottomScreen.innerHTML != "" && !firstEntry) {
		equal();
	}
});

decimalButton.addEventListener("click", () => {
	if (decimalEnabled) {
		bottomScreen.innerHTML += decimalButton.innerHTML;
		decimalEnabled = false;
	}
});

let add = (number1, number2) => {
	return number1 + number2;
};

let subtract = (number1, number2) => {
	return number1 - number2;
};

let multiply = (number1, number2) => {
	return number1 * number2;
};

let divide = (number1, number2) => {
	return number1 / number2;
};

function clear() {
	operations = [];
	topScreen.innerHTML = "";
	bottomScreen.innerHTML = "";
	firstEntry = true;
}

function pressedOperator(number, operator) {
	if (firstEntry) {
		operations[0] = number;
		operations[1] = operator;
		topScreen.innerHTML = operations[0] + " " + operations[1];
		bottomScreen.innerHTML = "";
		firstEntry = false;
		decimalEnabled = true;
	} else if (bottomScreen.innerHTML != "") {
		if (number == 0 && operations[1] == "÷") {
			alert("No division by zero!");
			bottomScreen.innerHTML = "";
			return;
		}
		operations[2] = number;
		operations[0] = operate(operations[0], operations[2], operations[1]);
		operations[1] = operator;
		topScreen.innerHTML = operations[0] + " " + operations[1];
		bottomScreen.innerHTML = "";
		decimalEnabled = true;
	}
}

function operate(value1, value2, operation) {
	switch (operation) {
		case "x":
			return multiply(value1, value2);
		case "÷":
			return divide(value1, value2);
		case "+":
			return add(value1, value2);
		case "-":
			return subtract(value1, value2);
	}
}

function equal() {
	let number = parseFloat(bottomScreen.innerHTML);
	if (number == 0 && operations[1] == "÷") {
		alert("No division by zero!");
		bottomScreen.innerHTML = "";
		return;
	}
	let sum = operate(operations[0], number, operations[1]);
	topScreen.innerHTML = sum;
	bottomScreen.innerHTML = "";
	firstEntry = true;
	decimalEnabled = true;
}
