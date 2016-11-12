var prompt = require('prompt');
var clear = require('clear');
var Word = require('./word.js');
var gameFile = require('./game.js');

//start game
prompt.start();

game = {
  correctWords : 0,
  guessesRemaining : 10, 
  currentWord : null, 
  startGame : function (wrd){
    this.resetGuesses();
    this.lettersAlreadyGuessed = "";
    this.currentWord = new Word.Word(gameFile.wordsForGames.wordBank[Math.floor(Math.random()* gameFile.wordsForGames.wordBank.length)].toUpperCase());
    this.currentWord.fillLetterArray(); 
    this.promptUser();
  },
  resetGuesses : function(){
    this.guessRemaining = 10;
  },
  promptUser : function(){
    var self = this;
    //hopefully the syntax of var self = this is correct
    prompt.get(['guessLetter'], function(err, result) {
      clear();
      var userInput = result.guessLetter.toUpperCase();

      //changed result.guessedLetter.length to result.guessLetter.length to match prompt test of guessLetter
      if (result.guessLetter.length>1 || self.lettersAlreadyGuessed.includes(userInput) || /[^A-Z]/.test(userInput)) {
        //[^A-Z] should test if string only contains letters. fingers crossed
        console.log('\nUSER ERROR!!!\n');
        console.log('Please enter one letter that has not been used');
        console.log('You guessed: ' + userInput);
        console.log('Letters already guessed: '+self.lettersAlreadyGuessed);
          console.log('\n\nGuesses remaining: ', self.guessesRemaining);
          console.log(self.currentWord.showWord());
          console.log('Already guessed: ');
          console.log(self.lettersAlreadyGuessed);
        self.promptUser();
      }else{
        console.log('The letter you guessed: ' + userInput);
        self.lettersAlreadyGuessed += userInput;
        var matchedLetters = self.currentWord.checkLetter(userInput);
        if (matchedLetters == 0){
          console.log('Try Again!');
          self.guessesRemaining--;
        }else{
          console.log('Correct!');

          if(self.currentWord.wordCheck()){
            console.log(self.currentWord.showWord());
            console.log('You Won!');
            return; 
          }
        }
        console.log('Guesses Remaining: ', self.guessesRemaining);
        console.log(self.currentWord.showWord());
        console.log('Letters Guessed: ');
        console.log(self.lettersAlreadyGuessed);

        if ((self.guessesRemaining > 0) && (self.currentWord.found == false)){
          self.promptUser();
        }
        else if(self.guessesRemaining == 0){
          clear();
          console.log('Game Over. ', self.currentWord.word);
        }else{
          console.log(self.currentWord.showWord());
        }
    }
    });
  }
};

game.startGame();