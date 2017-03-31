# Project 5
### JavaScript Calculator

### Program Execution

In order to run the javascript calculator, just need open the Calculator.html. The calculator is based on the RPN (Reverse Polish notation). The calculator can do add, subtract, multiply, divide, clear, delete, take percentage and memory functions by clicking the buttons on the calculator. 

### Roles
* Overall Project Manager: Sunny Patel
* Coding Manager: Kenton Steiner
* Testing Manager: Tony Su
* Documentation: Raphael Huang

### Contributions
###### Sunny Patel
- Initialized the Calculater function with basic button and display functionality using event handlers
- Initialized the addListeners function with the functionality mentioned above
- Modfied Jenn's HTML setup to work as intended with our Javascript functions
- CSS Styling
- Fixed bug so that text wasn't cut off. Now overflow increases the size of the text box temporarily
###### Kenton Steiner
- Reprogrammed the evalutation of expressions to make it cleaner.  
- Various bug fixing involving the order that operations and numbers are input into the calculator.  
- Pair programmed the CSS styling of the Calculator in the web browser with Sunny.  
- Added a backspace (DEL) button functionality
###### Tony Su
- Fixed some bugs in the memory feature.
- Updated evaluateExpression to deal with the divided by zero case.
- Added precentage feature, with cooresponding buttons.
- writing the testing plan.
###### Raphael Huang
- Wrote some part of the addListeners function  
- Added the memorya memory feature, with corresponding buttons.
- Fixed some bugs in addListeners.
- Updated documentation and made sure the program was commented accordingly.
###### Jenn Alarcon
- Worked on evaluation of expressions.
- Wrote HTML set up for calculator. 
- Wrote parts of the addListeners function.
- Worked on equals and ops functions.

### Testing Plan

This testing plan is aim to test the Javascript Calculator as a complete, integrated system. The display field is the textfield on the buttom and the memory field is the textfield on the top. 
1. You need to run the program by excuting Calculator.html. 
2. You should click every number buttons and deciaml buttons as many times as you want. The result will show on the display field. 
3. Once you are condident, you can then test the four operations, + - * /. You can enter random number as operands to test each operation. You can use another calculator to verify the result. 
4. You can test DEL and CLEAR. Choosing any number or operation, you can click those two buttons at any time to see whether they can delete or clear the display field and memory field. 
5. You can test the percentage button. Click the percentage button will divided the current number by 100. The number in the display field will have priority over the number in memory field.If there are no number in the display field, then the number in memory field will be divided by 100. 
6. The final step is to test the memory feature. Just like a old calculator, you can store a value in memory register using MR button. Use MC button to clear the value in memory register. Use M+ to add the value to the memory register. If there is no value in meomory register before, ,memory register will store the current value. The number in the display field will have priority over the number in memory field.If there are no number in the display field, then the number in memory field will be stored. M- button has similar function with M+. Instead of add the value to memory regsiter, M- substract the value from the memory register. If there is no value in memory register, the memory register will take the negative value of the current number. 
