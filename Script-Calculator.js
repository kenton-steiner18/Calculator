/*
Author: Sunny Patel 3/26
Modified: Jenn Alarcon 3/26
Chaged Expression inttial value
*/

var Calculator = function() {
	this.display = document.getElementById("display").display;
	this.buttons = document.getElementById("mainbuttons")
	this.expressionValue = "";
	/*
	Author: Sunny Patel 3/26
	Replaces the textfield in the display with input str.
	*/
	this.updateDisplay = function(str) {
		this.display.value = str;
	}

	/*
	Author: Sunny Patel 3/26
	Clears the display and reset the expressionValue
	this.display.value = "";
	this.expressionValue = "";
	*/
	this.clear = function() {
		this.updateDisplay("");
		this.expressionValue = "";
	}

	/*
	Author: Sunny Patel 3/26
	Updates the expression value based off the input digit
	this.expressionValue = #this.expresssionValue*10 + digit

	Modified: Jenn Alarcon 3/26
	Wasn't adding digits right when multiplying by ten. -Minor Change, to just add digit to end of string
	*/
	this.updateExpressionValue = function(digit) {
		this.expressionValue += digit;
	}

};

/*
Author: Sunny Patel & Jenn Alarcon & Raphael Huang 3/26
Adds event listeners to calc's buttons.
*/
var addListeners = function(calc) {
	/*
	add event listener for . button
	*/
	var checkDot = true;
	var dot = calc.buttons.dot;
	var dotFunc = function() {
		if (checkDot){
			calc.expressionValue += this.value;
			calc.updateDisplay(calc.expressionValue);
			checkDot = false;
		}
	}

	dot.addEventListener("click", dotFunc, false);


	/*
	add event listener for = button
	*/
	var equals = calc.buttons.equal;
	var equalsFunc = function() {
		calc.expressionValue = eval(calc.expressionValue);
		calc.updateDisplay(calc.expressionValue);
	}
	equals.addEventListener("click", equalsFunc, false);


	/*
	add event listener for CLEAR button
	*/
	// prevent there are more than one dots for one number
	var clear = calc.buttons.clear;

	var clearFunc = function() {
		calc.clear();
		checkDot = true;
	}
	clear.addEventListener("click", clearFunc, false);


	/*
	add event listener for each NUMBER button
	*/
	var numberFunc = function() {
		//window.alert("You pressed: "+this.value);
		calc.updateExpressionValue(this.value);
		calc.updateDisplay(calc.expressionValue);
	}
	// retrieve all the elements with the name numbers. This is
	// expected to be all the form elements that are numbers.
	for (var i=0; i < calc.buttons.numbers.length; i++) {
		var element = calc.buttons.numbers[i];
		element.addEventListener("click", numberFunc, false);
	}

	/*
	add event listener for each OPS button
	*/
	var opsFunc = function(){

		// check whether there is just one OPS between two numbers, overwrite the first OPS
		var check = true;

		var ops = ["+", "-", "*", "/"];
		for (var i =0; i < ops.length && check; i++){
			if(calc.expressionValue.length > 0 && calc.expressionValue.charAt(calc.expressionValue.length - 1) == ops[i]){
				calc.expressionValue = calc.expressionValue.substring(0, calc.expressionValue.length - 1);
			}
		}

		// at the beginning, the OPS just can be "-",
		if(calc.expressionValue.length == 0 && this.value != "-"){
			check = false;
		}

		if (check){
			calc.expressionValue += this.value;
			calc.updateDisplay(calc.expressionValue);
			checkDot = true;
		}

	}
	for (var i=0; i < calc.buttons.ops.length; i++) {
		var element = calc.buttons.ops[i];
		element.addEventListener("click", opsFunc, false);
	}


}
var calc = new Calculator();
addListeners(calc);
