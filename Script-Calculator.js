/*
Author: Sunny Patel 3/26
*/
var Calculator = function() {
	this.display = document.getElementById("display").display;
	this.buttons = document.getElementById("mainbuttons")
	this.expressionValue;
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
    	var e = this.buttons.equal;
    	e.addEventListener("click", function()
    	{this.updateDisplay(this.expressionValue)}, false);

    }
};

var calc = new Calculator();
