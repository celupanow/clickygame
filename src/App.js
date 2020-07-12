import React, { Component } from 'react';
import NavBar from "./components/NavBar/index";
import Icon from "./components/Icon/index";
import characters from "./characters.json";
import './App.css';

class App extends Component {

  //setting the states for characters, empty array, score, and message to display

  state = {
    characters,
    clickedId: [],
    score: 0,
    message: "One Ring To Rule Them All and In The Darkness Bind Them! Click A Character To Start."
  };

  //shuffles the character order
  componentDidMount() {
    this.setState({
      characters: this.shuffle(this.state.characters)
    });
  }

  //a function to tell whether or not that character has already been clicked
  isClicked = (clickedCharacter) => {
    for (let i = 0; i < this.state.clickedId.length; i++) {
      if (this.state.clickedId[i] === clickedCharacter) {
        return true;
      }
    }
    return false;
  };

  //when a character is clicked, this function will run
  clickedCharacter = id => {
    //we taking the id of the character
    const clickedCharacter = id;
    //check to see if the character has been clicked
    const hasBeenClicked = this.isClicked(clickedCharacter);

    //if the character has been clicked
    if (hasBeenClicked) {
      //set the state - shuffle the characters, empty the array, put score to zero, and display message
      this.setState({
        characters: this.shuffle(this.state.characters),
        clickedId: [],
        score: 0,
        message: "One Does Not Simply Walk Into Mordor. Try Again."
      })
    //if character has not been clicked
    } else {
      //increment the score
      let newScore = this.state.score + 1;
      //if the score is equal to the amount of characters there are
      if (newScore === this.state.characters.length) {
        //set the state - shuffle the characters, empty array, set score back to zero, and display winning message
        this.setState({
          characters: this.shuffle(this.state.characters),
          clickedId: [],
          score: 0,
          message: "Middle-Earth is Saved! You Win!"
        });
      //if the score is not equal to the amount of characters there are
      } else {
        //push the clicked character id to the empty array
        this.state.clickedId.push(clickedCharacter);
        //set the state - shuffle the characters, set the score to the new score, and display the message
        this.setState({
          characters: this.shuffle(this.state.characters),
          score: newScore,
          message: "Correct! You're One Step Closer To Destroying The Ring..."
        });
      }
    }
  };

  //this is for shuffling the characters
  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  //here we are rendering elements to the DOM, including sending the score and message to the NavBar component
  render() {
    return (
      <div>

        <NavBar score={this.state.score} message={this.state.message} />
        <div className="gridWrapper">
          <div className="grid">
            {this.state.characters.map(character => (
              <Icon
                clickedCharacter={this.clickedCharacter}
                id={character.id}
                key={character.id}
                image={character.image}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

}

export default App;
