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
	Updates the expression value based off the input digit
	this.expressionValue = #this.expresssionValue*10 + digit
    */
	this.updateExpressionValue = function(digit) {
    	this.expressionValue *= 10;
		this.expressionValue += digit;
    }

    /*
	Author: Sunny Patel 3/26
    */
    this.addListeners = function() {
    	// add event listener for equals button
    	var equals = this.buttons.equal;
		var equalsFunc = function() {
			this.updateDisplay(this.expressionValue);
		}
    	equals.addEventListener("click", equalsFunc, false);
    	// add event listener for each number button
    	var numberFunc = function() {
    		this.updateExpressionValue(element.value);
    		this.updateDisplay(this.expressionValue);
    	}
    	// retrieve all the elements with the name numbers. This is
    	// expected to be all the form elements that are numbers.
    	
    	var numbers = document.getElementsByName("numbers");
    	for (var i=0; i < this.buttons.numbers.length; i++) {
      		element = this.buttons.numbers[i];
    		element.addEventListener("click", numberFunc, false);
    	}
    	
    }
};

var calc = new Calculator();
calc.addListeners();