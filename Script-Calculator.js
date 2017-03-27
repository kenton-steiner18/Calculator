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
	var dot = calc.buttons.dot;
	var dotFunc = function() {
		calc.expressionValue += this.value;
		calc.updateDisplay(calc.expressionValue);
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
   	var clear = calc.buttons.clear;
   	var clearFunc = function() {
   		calc.clear();
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
        	calc.expressionValue += this.value;
        	calc.updateDisplay(calc.expressionValue);
    	}
    	for (var i=0; i < calc.buttons.ops.length; i++) {
   		var element = calc.buttons.ops[i];
   		element.addEventListener("click", opsFunc, false);
    	}


}
var calc = new Calculator();
addListeners(calc);
