var letter = require('./letter.js');
var Word = function(gameWord){
  this.word = gameWord;
  this.letterArray = [];
  this.found = false;
  this.fillLetterArray = function(){
    for (var i = 0; i <this.word.length; i++) {
      this.letterArray.push(new letter.letter(this.word[i].toUpperCase()));
    }
  }
  
  this.wordCheck = function() {
    var returnCounter = 0;
    for (var i = 0; i < this.letterArray.length; i++) {
      if(this.letterArray[i].appear !== true){
        return false 
      }else if (this.letterArray[i].appear === true){
        returnCounter ++; 
      }
    }
    if (returnCounter === this.letterArray.length){
      return true; 
    }else{
      return false; 
    }
  }

  this.checkLetter = function(guessedLetter) {
    var lettersReturned = 0;
        for (var i = 0; i < this.letterArray.length; i++) {
          if (this.letterArray[i].character.toUpperCase() === guessedLetter) {
            this.letterArray[i].appear = true;
            lettersReturned ++;
          }
        }
    return lettersReturned;
  };

  this.showWord = function() {
    var string = "";
      for (var i = 0; i < this.letterArray.length; i++) {
        string += this.letterArray[i].displayedCharacter();
      }
    return string;
  };
};


exports.Word = Word;