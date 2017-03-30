/*
Author: Sunny Patel 3/26
Modified: Jenn Alarcon 3/26
Chaged Expression inttial value
*/

var Calculator = function() {
	this.display = document.getElementById("display").display;

	this.memory = document.getElementById("display").memory;

	this.buttons = document.getElementById("mainbuttons");

	this.displayValue = "";
	this.currentNumber = "";
	this.ops = [];
	this.numbers =[];
	this.evalExpression = 0;
	this.lastOpEquals = false;




	/*
	Author: Sunny Patel 3/26
	Replaces the textfield in the display with input str.
	*/
	this.updateCalcDisplay = function(str) {
		this.display.value = str;
	}

	/*
	Author: Jenn Alarcon 3/28
	Replaces the textfield in the memory field with input str.
	*/
	this.updateMemory = function(str) {
		this.memory.value = str;
	}


	/*
	Author: Sunny Patel & Jenn Alarcon 3/26
	Clears the display and reset the displayValue
	this.display.value = "";
	this.displayValue = "";
	this.display.memory = "";

	*/

	this.clear = function() {
		this.updateCalcDisplay("");
		this.updateMemory("");

		this.displayValue = "";
		this.evalExpression = "";
		this.currentNumber = "";

		this.ops = [];
		this.numbers =[];

		this.lastOpEquals = false;


	}

	/*
	Author: Sunny Patel 3/26
	Updates the expression value based off the input digit
	this.displayValue = #this.expresssionValue*10 + digit

	Modified: Jenn Alarcon 3/26
	Wasn't adding digits right when multiplying by ten. -Minor Change, to just add digit to end of string

	Modified: Jenn Alarcon 3/28
	Added the current number field
	*/
	this.updatedisplayValue = function(digit) {
		this.displayValue += digit;
		this.currentNumber += digit;
	}

	/*
	Author: Jenn Alarcon 3/28
	Evaulate expression
	*/

	this.evaluateExpression = function(){

		var op = this.ops.pop();

		var num2 = parseFloat(this.numbers.shift());
		var num1 = parseFloat(this.numbers.shift());

		if(op == "+"){
			this.evalExpression = num1 + num2;
		}else if(op == "*"){
			this.evalExpression = num1 * num2;
		}else if(op == "/"){
			this.evalExpression = num1 / num2;
		}else if(op == "-"){
			this.evalExpression = num1 - num2;
		}

		this.displayValue = this.evalExpression;
		//add new value to memory (i.e. the number stack)
		this.numbers.unshift(this.evalExpression);
		this.evalExpression = 0;
	}

};

/*
Author: Sunny Patel & Jenn Alarcon & Raphael Huang & Kenton Steiner 3/26
Adds event listeners to calc's buttons.
*/
var addListeners = function(calc) {
	/*
	add event listener for the decimal point
	Modified 3/29: Kenton Steiner
	Removed the checkDot value and used indexOf to determine if the decimal
	point was already present in the current value.
	*/
	var dot = calc.buttons.dot;
	var dotFunc = function() {
		if (calc.displayValue.indexOf('.') == -1) {
					calc.displayValue += this.value;
					calc.updateCalcDisplay(calc.displayValue);
		}
	}
		
		dot.addEventListener("click", dotFunc, false);
	
	
		/*
		add event listener for = button
		*/
		var equals = calc.buttons.equal;
		var equalsFunc = function() {
			//add to numbers stack
			calc.numbers.unshift(calc.currentNumber);
			calc.displayValue += " ";
	
			if(calc.numbers.length == 2){
				//window.alert(calc.ops.length);
				calc.evaluateExpression();
				//user need to enter a number
				calc.displayValue += " ";
	
			}
			calc.updateMemory(calc.displayValue);
			calc.updateCalcDisplay("");
			calc.lastOpEquals = true;
	
		}
		equals.addEventListener("click", equalsFunc, false);
	
	
		/*
		add event listener for CLEAR button
		*/
		// prevent there are more than one dots for one number
		var clear = calc.buttons.clear;
	
		var clearFunc = function() {
			calc.clear();
		}
		clear.addEventListener("click", clearFunc, false);
	
	
		/*
		add event listener for each NUMBER button
		*/
		var numberFunc = function() {
			
			calc.updatedisplayValue(this.value);
			calc.updateCalcDisplay(calc.displayValue);
		}
		// retrieve all the elements with the name numbers. This is
		// expected to be all the form elements that are numbers.
		for (var i=0; i < calc.buttons.numbers.length; i++) {
			calc.buttons.numbers[i].addEventListener("click", numberFunc, false);
		}
	
		/*
		add event listener for each OPS button
		*/
		var opsFunc = function(){
	
			// check whether there is just one OPS between two numbers, overwrite the first OPS
			var check = true;
	
			var ops = ["+", "-", "*", "/"];
			for (var i =0; i < ops.length && check; i++){
				if(calc.displayValue.length > 0 && calc.displayValue.charAt(calc.displayValue.length - 1) == ops[i]){
					calc.displayValue = calc.displayValue.substring(0, calc.displayValue.length - 1);
				}
			}
	
			// at the beginning, the OPS just can be "-",
			if(calc.displayValue.length == 0 && this.value != "-"){
				check = false;
			}
	
	
			//***Author: Jenn ****
			//***UPDATE DISPLAY****/
			if (check){
	
	
				//add to numbers stack
				calc.numbers.unshift(calc.currentNumber);
				//clear current number
				calc.currentNumber ="";
				//add space after to display space betweeen current and next num
				calc.displayValue += " ";
	
				//push op onto the stack
				calc.ops.unshift(this.value);
	
				//if there is two values on the stack
				if(calc.numbers.length == 2){
					//window.alert(calc.ops.length);
					calc.evaluateExpression();
					//user need to enter a number
					calc.displayValue += " ";
	
				}
				//update memory with the op chosen next
				calc.updateMemory(this.value);
				calc.updateCalcDisplay(calc.displayValue);
			}
	
	} //END OF OPS FUNCTION

	for (var i=0; i < calc.buttons.ops.length; i++) {
		calc.buttons.ops[i].addEventListener("click", opsFunc, false);
	}
	//***Author: Jenn ****



}





var calc = new Calculator();
addListeners(calc);
