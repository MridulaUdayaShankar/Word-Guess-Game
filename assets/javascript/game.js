// function to check for  duplicates in a string- in this case: the words in the array
Array.prototype.getDuplicates = function () {
    var duplicates = {};
    for (var i = 0; i < this.length; i++) {
        if(duplicates.hasOwnProperty(this[i])) {
            duplicates[this[i]].push(i);
        } else if (this.lastIndexOf(this[i]) !== i) {
            duplicates[this[i]] = [i];
        }
    }

    return duplicates;
};
// -----------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function(e) {
  //global variables
  var wins = 0,
    losses,
    guessesLeft,
    computerGuess,
    duplicatesInString,
    guessesSoFar,
    dashes;

  //array of all the letters to be used in the game for guessing
  var arrayWord = ["Guitar","Violin","Trumpet","Piano","Tabla","Saxophone","Santur","Harp","Drums","Ukulele"];

  //function to reset all variables and get new letter as computer's guess using Math.random function
  function getNewGuess() {
    dashes = [];
    guessesSoFar = [];
    computerGuess = arrayWord[Math.floor(Math.random() * arrayWord.length)].toLowerCase();

    //using the getDuplicates() function to remove the duplicate letters in a word
    //split function causes the string to be split with '' for each character 
    duplicatesInString = computerGuess.split('').getDuplicates();


    for (i = 0; i < computerGuess.length; i++) {
      dashes.push(" _ ");
    }
    guessesLeft = computerGuess.length;
    document.getElementById("showWord").innerHTML = dashes;
    }
    //initiate function to get first guess & variable assignments
    getNewGuess();
// -----------------------------------------------------------------------------------------

  // on key press and release by the user, assign to userInput variable and convert to lowercase
document.onkeyup = function(event) {
    guessesLeft--;
    var userInput = event.key.toLowerCase();

    // Display list of all inputs given by the user so far
    guessesSoFar.push(userInput);

    //to get the index of each letter in the word: index is the index of "t","r","u" etc in the word trumpet
    var index = computerGuess.indexOf(userInput);


    //check the condition for user input=the letter in the word
    if (index !== -1) {
      dashes[index] = userInput;
    }
    // if computer picks the same letter as the user, the user wins 
    //join() function causes the characters that are seperated by '' to form a string
    if (dashes.join('') === computerGuess) {
        wins++;
    }
    //if guessesLeft reduces to 0, reset the game stats
    if (guessesLeft === 0 || guessesSoFar.length === computerGuess.length) {
      getNewGuess();
    }
    
// ---------------------------------------------------------------------------------------------
//Finally, display all the stats to HTML

    document.getElementById("showLetters").innerHTML = guessesSoFar;
    document.getElementById("winsCounter").innerHTML = wins;
    document.getElementById("showWord").innerHTML = dashes;
    document.getElementById("guessesCounter").innerHTML = guessesLeft;
    
  };
});
