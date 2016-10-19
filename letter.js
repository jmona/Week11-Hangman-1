function letter(letterForFunction){
  this.character = letterForFunction;
  this.appear = false;
  this.displayedCharacter = function(){
    if(this.appear === true){
      return this.character;
    }else {
      return "_"
    }
  }
};

exports.letter = letter;