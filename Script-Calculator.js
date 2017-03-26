/*
Author: Sunny Patel 3/26
*/
var Calculator = function() {
	this.display = document.getElementById("display").display;
	this.buttons = document.getElementById("mainbuttons")
	this.expressionValue = 0;
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
	this.expressionValue = 0;
    */
    this.clear = function() {
    	this.updateDisplay("");
    	this.expressionValue = 0;
    }

    /*
	Author: Sunny Patel 3/26
	Updates the expression value based off the input digit
	this.expressionValue = #this.expresssionValue*10 + digit
    */
	this.updateExpressionValue = function(digit) {
    	this.expressionValue *= 10;
		this.expressionValue += digit;
    }


};

/*
Author: Sunny Patel & Jenn Alarcon3/26
Adds event listeners to calc's buttons.
*/
var addListeners = function(calc) {
	/*
	add event listener for = button
	*/
	var equals = calc.buttons.equal;
	var equalsFunc = function() {
		calc.updateDisplay(calc.expressionValue);
	}
   	equals.addEventListener("click", equalsFunc, false);
   	/*add event listener for CLEAR button
   	*/
   	var clear = calc.buttons.clear;
   	var clearFunc = function() {
   		calc.clear();
   	}
   	clear.addEventListener("click", clearFunc, false);
   	/*
   	add event listener for each NUMBER button
   	*/
   	// retrieve all the elements with the name numbers. This is
   	// expected to be all the form elements that are numbers.
   	var funcs = [];
   	var numberFunc = function(i) {
   		return function() {
   			calc.updateExpressionValue(i);
   			calc.updateDisplay(calc.expressionValue);
   		}
   	}
   	// create 10 functions that print display the values 0-9 to display
   	for (var i=0; i < calc.buttons.numbers.length; i++) {
   		funcs[i] = numberFunc(i);
   	}
   	// assign those 10 functions to appropriate buttons
   	for (var j=0; j < calc.buttons.numbers.length; j++) {
   		var element = calc.buttons.numbers[j];
   		element.addEventListener("click", funcs[element.value], false);
   	}
}
var calc = new Calculator();
addListeners(calc);