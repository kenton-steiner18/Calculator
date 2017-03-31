/*
Author: Sunny Patel 3/26
Modified: Jenn Alarcon 3/26
Chaged Expression inttial value
Modified: Raphael Huang 3/30
Added memeory function
*/

var Calculator = function() {
	this.display = document.getElementById("display").display;

	this.memory = document.getElementById("display").memory;
	// Uncomment this when the history element is created
	//this.history = document.getElementById("display").history;

	this.buttons = document.getElementById("mainbuttons");

	this.currentInput = "";
	this.memoryValue = "";
	this.memoryResult = [0];
	this.expression=[];
	this.result = 0;
	this.opMode = true;

	/*
	Author: Sunny Patel 3/26
	Replaces the textfield in the display with input str.
	*/
	this.updateDisplay = function(str) {
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
	Clears the displays and reset the currentInput
	*/
	this.clear = function() {
		this.updateDisplay("");
		this.updateMemory("");
		this.currentInput = "";
		this.result = 0;
		this.memoryValue = "";
		this.expression=[];
		this.opMode = true;
	}

	/*
	Author: Sunny Patel 3/26
	Updates the expression value based off the input digit
	this.currentInput = #this.expresssionValue*10 + digit

	Modified: Jenn Alarcon 3/26
	Wasn't adding digits right when multiplying by ten. 
	-Minor Change, to just add digit to end of string

	Modified: Jenn Alarcon 3/28
	Added the current number field
	*/
	this.updateCurrentInput = function(digit) {
		this.currentInput += digit;
	}

	/*
	Author: Jenn Alarcon 3/28
	Evaulate expression
	Modified 3/30: (Kenton) changed to match new variables
	and reset the memory and display fields
	Modified: Tony Su 3/30
		fixed the issue with divided by zero.
	*/
	this.evaluateExpression = function(){
		// Take the values from the expression stack
		var num2 = parseFloat(this.expression.shift());
		var op = this.expression.shift();
		var num1 = parseFloat(this.expression.shift());

		//Perform the specified operation
		if(op == "+"){
			this.result = num1 + num2;
		}else if(op == "*"){
			this.result = num1 * num2;
		}else if(op == "/" && num2 != 0){
			this.result = num1 / num2;
		}else if(op == "/" && num2 == 0){
			this.result = "Error";
		} else if(op == "-"){
			this.result = num1 - num2;
		}

		// Update the current input and memory fields
		this.currentInput = " ";
		this.memoryValue = this.result + " ";
		this.updateMemory(this.memoryValue);
		this.updateDisplay(this.currentInput);

		// Store the result in expression in case the user wants to use this value
		this.expression=[this.result];
	}
};


/*
Author: Sunny Patel & Jenn Alarcon & Raphael Huang & Kenton Steiner 3/26
Adds event listeners to calc's buttons.
*/
var addListeners = function(calc) {

	/* Add event listener for the backspace button
	Author: Kenton Steiner 3/30
	*/
	var backspace = calc.buttons.backspace;
	var backFunc = function() {
		calc.currentInput = calc.currentInput.substring(0,calc.currentInput.length-1);
		calc.updateDisplay(calc.currentInput);
	}
	backspace.addEventListener("click", backFunc, false);


	/* Add event listener for the decimal point
	Modified 3/29: Kenton Steiner
	Removed the checkDot value and used indexOf to determine if the decimal
	point was already present in the current value.
	Modified 3/30: Kenton - If the first thing entered for a number is a 
	decimal point, it now displays 0. instead of just the decimal
	-Was causing errors in operation evaluation
	*/
	var dot = calc.buttons.dot;
	var dotFunc = function() {
		/* If a decimal point is entered first, update the display with a 
		zero in front of the decimal point
		*/
		if (calc.opMode) {
			// Move the operation to memory and the history
			calc.memoryValue += calc.currentInput;
			calc.updateMemory(calc.memoryValue);
	
			// Update the display with the decimal value
			calc.currentInput = "0";
			calc.updateDisplay(calc.currentInput);
			calc.opMode = false;
		}
		// If a decimal point has not been used yet, update the value
		if (calc.currentInput.indexOf('.') == -1) {
			calc.currentInput += this.value;
			calc.updateDisplay(calc.currentInput);
		}
	}		
	dot.addEventListener("click", dotFunc, false);
	
	
	/* Add event listener for = button
	Modified: 3/30 Kenton - Added if statements for different calculator
	states 
	Modified: 3/30 Raphael - Added the display error
	*/
	var equals = calc.buttons.equal;
	var equalsFunc = function() {
		//Add the current number to the expression stack
		calc.expression.unshift(calc.currentInput);
		/* If only a number has been input thus far,
		simply transfer the number to the memory field
		*/
		if (calc.expression.length == 1) {
			calc.memoryValue = calc.currentInput;
			calc.updateMemory(calc.memoryValue);
			calc.updateDisplay("");
		}
		else if(calc.expression.length == 3){
			calc.evaluateExpression();
		}

		// Display error if the memory value is NaN
		if (isNaN(calc.memoryValue)){
			calc.updateMemory("Error");
		}	
	} 
	equals.addEventListener("click", equalsFunc, false);
	
	
	/* Add event listener for CLEAR button
	Modified: Kenton (3/30) - Minor Change - removed checkDot variable
	*/
	var clear = calc.buttons.clear;	
	var clearFunc = function() {
		calc.clear();
	}
	clear.addEventListener("click", clearFunc, false);

	
	/* Add event listener for each NUMBER button
	Modifications: 3/30 Kenton
	Included if statements for various states the calculator could be
	in when a number is pressed
	*/
	var numberFunc = function() {
		/* If there is a result on the expression stack, clear the
		stack, the memory value, and the memory field
		*/
		if (calc.expression.length == 1) {
			calc.memoryValue = "";
			calc.updateMemory(calc.memoryValue);
			calc.expression = [];
		} 
		/*  If there are two values in the stack, move the operation
		from the Display to the Memory, and clear Display
		*/
		else if (calc.expression.length == 2 && calc.opMode) {
			calc.memoryValue += calc.currentInput;
			calc.updateMemory(calc.memoryValue);
			calc.currentInput = "";
		}

		// Update the currentInput with the number given
		calc.updateCurrentInput(this.value);
		calc.updateDisplay(calc.currentInput);

		// Set opMode to false so the function won't keep updating 
		// memory after an operation has been entered
		calc.opMode = false;
	}
	// retrieve all the elements with the name numbers. This is
	// expected to be all the form elements that are numbers.
	for (var i=0; i < calc.buttons.numbers.length; i++) {
		calc.buttons.numbers[i].addEventListener("click", numberFunc, false);
	}

	
	/* Author: Jenn 3/28
	Modified: Kenton 3/30 - Rewrote the function to have the calculator
	display the values in a different format than previously.
	Added a check for if the previous event was selecting an operation
	and if it was, the new symbol replaces the old one
	*/
	var opsFunc = function(){			
		var ops = ["+", "-", "*", "/"];
		// If the current input is not an operation
		if (!calc.opMode) {
			if (calc.expression.length == 0) {
				//add the number to the expression stack
				calc.expression.unshift(calc.currentInput);
				
				// Update the string in the memory, clear current display
				calc.memoryValue = calc.currentInput + " ";
				calc.updateMemory(calc.memoryValue);
				}
			else if (calc.expression.length == 2) {
				calc.expression.unshift(calc.currentInput);
				}

			/* If there are three values on the stack
				1. Evaluate the expression
				2. Display the result in the memory field
				3. Clear the expression stack and push the result as the first value
				4. Display the operation selected to perform on 
					the result of the previous expression
			*/
			if(calc.expression.length == 3) {
				// Call evaluate to perform steps 1 through 3
				calc.evaluateExpression();
				}
			calc.opMode = true;
				
			//Push the operation onto the expression stack
			calc.expression.unshift(this.value);
				
			//Update the current input Display and currentInput
			calc.currentInput = this.value;
			calc.updateDisplay(calc.currentInput);
			} //If the current input is an operation
		else {
			// Switch the op value in the expression stack and display
			calc.currentInput = this.value;
			calc.updateDisplay(calc.currentInput);
			calc.expression.shift();
			calc.expression.unshift(this.value);
		}
	} //END OF OPS FUNCTION

	/* Author: Jenn  3/28
	Modified: Kenton (3/30) 
	Made the addEventListener all one line
	*/
	for (var i=0; i < calc.buttons.ops.length; i++) {
		calc.buttons.ops[i].addEventListener("click", opsFunc, false);
	}

	/* Author: Tony Su 3/30
	Add Event Listener for % button
	*/
	var percent = calc.buttons.percentage;
    var ops = ["+", "-", "*", "/"];
	var percentFuc = function(){
		if (calc.currentInput != " "){
			if(ops.indexOf(calc.currentInput) == -1){
				var result = parseFloat(calc.currentInput);
				result /=100;
				calc.currentInput = String(result);
				calc.updateDisplay(calc.currentInput);
			}
			else if(calc.memoryValue.length != " "){
                var result = parseFloat(calc.memoryValue);
                result /= 100;
                calc.memoryValue = String(result);
                calc.updateMemory(calc.memoryValue);
            }
		}
		else if(calc.memoryValue.length != " "){
			var result = parseFloat(calc.memoryValue);
			result /= 100;
			calc.memoryValue = String(result);
			calc.updateMemory(calc.memoryValue);
		}
	}
	percent.addEventListener("click",percentFuc,false);

	/* Author: Raphael 3/30
	 Add Event Listener for M+ button
	 Modified: Tony Su 3/30
	 	M+ can calucate the decimal number now.
	 */
	var ma =  calc.buttons.madd;	
	var maddFuc = function(){
		var ops = ["+", "-", "*", "/"];
		// check if there is a input number in display, then add it to memory result
		if (calc.currentInput.length > 0 && ops.indexOf(calc.currentInput) == -1 && calc.currentInput != " "){
			calc.memoryResult[0] += parseFloat(calc.currentInput);
		}
		// if there is no input number in display, then add the memory value
		else{
			calc.memoryResult[0] += parseFloat(calc.memoryValue);
		}
		// clean the calculater
		calc.clear();
	}
	ma.addEventListener("click", maddFuc, false);


	/* Author: Raphael 3/30
	 Add Event Listener for M- button
	 Modified: Tony Su 3/30
	 	M-i can calucate the decimal number now.
	 */
	var mm =  calc.buttons.mminus;	
	var mminusFuc = function(){
		var ops = ["+", "-", "*", "/"];
		// check if there is a input number in display, then minus it to memory result
		if (calc.currentInput.length > 0 && ops.indexOf(calc.currentInput) == -1 && calc.currentInput != " "){
			calc.memoryResult[0] -= parseFloat(calc.currentInput);
		}
		// if there is no input number in display, then minus the memory value
		else{
			calc.memoryResult[0] -= parseFloat(calc.memoryValue);
		}
		// clean the calculater
		calc.clear();
	}
	mm.addEventListener("click", mminusFuc, false);


	/* Author: Raphael 3/30
	 Add Event Listener for MR button
	 Modified: Tony Su 3/30
	 	fix the bug that append the MR value onto the memory result.
	 */
	var mr =  calc.buttons.mr;	
	var mrFuc = function(){
		// if there is non zero value, then display it
		if(calc.memoryResult[0] != 0) {
			calc.memoryValue = " ";
			calc.memoryValue += calc.memoryResult[0];
			calc.updateMemory(calc.memoryValue + " ");
			calc.currentInput = " ";
			calc.updateDisplay(calc.currentInput);
			// Store the result in expression
			calc.expression=[calc.memoryValue];
			calc.opMode = false;
		}
	}
	mr.addEventListener("click", mrFuc, false);
	
	/* Author: Raphael 3/30
	 Add Event Listener for MC button
	 */
	var mc =  calc.buttons.mc;	
	var mcFuc = function(){
		// clean the memory
		if(calc.memoryResult[0] != 0) {
			calc.memoryResult[0] = 0;
			// clean the calculater
			calc.clear();
		}
	}
	mc.addEventListener("click", mcFuc, false);

	/* Author: Sunny 3/30
     Test box gets larger the more characters there are.
    */
    var maxWidth = 28;
    var baseBoxWidth = 16;
    var currentBoxWidth = baseBoxWidth;
    var dynamicSizeFunc = function() {
		if (calc.display.value.length > maxWidth) {	
			/*
			 For every character after the 27th character, increase 
			size of box by .6 em every time the length of the textbox is 
			larger than the previous
			*/
			currentBoxWidth += .6;
			maxWidth++;
			calc.display.style.width = currentBoxWidth + "em";
		} else {
		  calc.display.style.width = baseBoxWidth + "em";
		  currentBoxWidth = baseBoxWidth;
		  maxWidth = 28;
		}
	}
	var allButtons = document.querySelectorAll("input[type=button]");
	for (var i = 0; i < allButtons.length; i++) {
		allButtons[i].addEventListener("click", dynamicSizeFunc, false);
	}
}

var calc = new Calculator();
addListeners(calc);
