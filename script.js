// Assignment Code
var generateBtn = document.querySelector("#generate");

// arrays for possible letters used in password generations
var upperCase  =  [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  ];
var lowerCase  = [
  "a","b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  ];
var numbers  = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];
var symbols  = [
  "!", "@", "#", "$", "%", "^", "&", "*",
];

// function to determine password length and criteria
function lengthPrompt(a, b, c, d, e, f, ){
  var length = parseInt(prompt("How long would you like your password?"));

  if (isNaN(length) === true){
    alert("Must be a number!");
    return;
  }
  if (length < 8){
    alert("A password less than 8 characters is not very secure!");
    return;
  }
  if (length > 128){
    alert("That would be way too long of a password!");
    return;
  }  

  var upperCaseConfirm = confirm('Click Ok if you want upper case letters');
  var lowerCaseConfirm = confirm('Click Ok if you want lower case letters');
  var numbersConfirm = confirm('Click Ok if you want numbers');
  var symbolsConfirm = confirm('Click Ok if you want special characters');

  if (upperCaseConfirm === false && lowerCaseConfirm === false && numbersConfirm === false && symbolsConfirm === false) {
    alert('You must choose at least one character type for your password! ')
    return;
  }

  var criteriaObject = {
    finalLength: length,
    upperCaseState: upperCaseConfirm,
    lowerCaseState: lowerCaseConfirm,
    numbersState: numbersConfirm,
    symbolsState: symbolsConfirm,
  }
  
  return criteriaObject;
}

// function to pick a random character from an array for use in the password
function pickRandomCharacter(array){
  var randPicker =  array[Math.floor(Math.random()*array.length)];
  return randPicker;
}

// password generation logic
function generatePassword() {
  var passLength = lengthPrompt();
  var passwordPool = [];
  var needsPool = [];
  var finalPassword = [];
  var conditonCounter = 0

  // adds characters to password pool if chosen in the prompt and sets aside guaranteed characters to make sure the password meets all conditions
  if (passLength.upperCaseState){
    passwordPool = passwordPool.concat(upperCase);
    needsPool.push(pickRandomCharacter(upperCase));
    conditonCounter++;
  }
  if (passLength.lowerCaseState){
    passwordPool = passwordPool.concat(lowerCase);
    needsPool.push(pickRandomCharacter(lowerCase));
    conditonCounter++;
  }
  if (passLength.numbersState){
    passwordPool = passwordPool.concat(numbers);
    needsPool.push(pickRandomCharacter(numbers));
    conditonCounter++;
  }
  if (passLength.symbolsState){
    passwordPool = passwordPool.concat(symbols);
    needsPool.push(pickRandomCharacter(symbols));
    conditonCounter++;
  }

  // creates for loop length 
  var finalLength = passLength.finalLength - conditonCounter

  // initializes the beginning of the password
  var passwordPossible = [];

  // loop to create inital password letters without the guaranteed letters
  for (i = 0; i < finalLength; i++) {    
    var compGuess = passwordPool[Math.floor(Math.random()*passwordPool.length)];
    passwordPossible.push(compGuess);    
  }

  // combines guaranteed pool and the initial pool to creat the final password
  finalPassword = passwordPossible.concat(needsPool);

  return finalPassword.join('');
}

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  
  passwordText.value = password;

}



// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
