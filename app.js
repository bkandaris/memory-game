// addEventListener starts when the initial HTML document has been loaded and parsed allowing the game to run
document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    {
      name: 'Dog1',
      img: 'images/Dog1.png',
    },
    {
      name: 'Dog2',
      img: 'images/Dog2.png',
    },
    {
      name: 'Dog3',
      img: 'images/Dog3.png',
    },
    {
      name: 'Dog4',
      img: 'images/Dog4.png',
    },
    {
      name: 'Dog5',
      img: 'images/Dog5.png',
    },
    {
      name: 'Dog6',
      img: 'images/Dog6.png',
    },
    {
      name: 'Dog1',
      img: 'images/Dog1.png',
    },
    {
      name: 'Dog2',
      img: 'images/Dog2.png',
    },
    {
      name: 'Dog3',
      img: 'images/Dog3.png',
    },
    {
      name: 'Dog4',
      img: 'images/Dog4.png',
    },
    {
      name: 'Dog5',
      img: 'images/Dog5.png',
    },
    {
      name: 'Dog6',
      img: 'images/Dog6.png',
    },
  ];
  // Sort method sorts the cardArray in place and returns the sorted array
  // Default sort order is ascending and converts the elements into strings
  // Then use the built in Math.random() function to randomize the order of the cards
  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  // Using the querySelector method to show the user the results of the game
  const resultDisplay = document.querySelector('#result');
  // Arrays we will use to compare cards and clear the winners
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  //Board Creation
  // Looping over the array to create the elements for each cards and display the images
  // Adding classes for styling the fronts and backs, giving them unique id's and adding an event listener for user clicks
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('class', 'sizeCards');
      card.setAttribute('src', '../images/Blank.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }

  //Match Checking
  function checkForMatch() {
    const cards = document.querySelectorAll('img');
    // Assigning variables used to compare with eachother later
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', '../images/Blank.png');
      cards[optionTwoId].setAttribute('src', '../images/Blank.png');
      // alerting the user that they have made an error
      swal({
        title: 'Ut oh',
        text: 'You have clicked the same image twice',
        icon: 'error',
      });
      // if the ids match, the user is alerted that they have found a match
    } else if (cardsChosen[0] === cardsChosen[1]) {
      swal({
        title: 'Good job!',
        text: 'You found a match!',
        icon: 'success',
      });
      // if a match is found, we change the image on the board to show that the user has already selected these cards then remove the event listener so that the cards cannot be clicked anymore
      // Then push the the cardChosen to the cardsWon array to keep track if the game has been finished
      cards[optionOneId].setAttribute('src', '../images/Back.png');
      cards[optionTwoId].setAttribute('src', '../images/Back.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
      // if cards do not match, we reset them to 'blank' and alert the user that they did not select two matching cards
    } else {
      cards[optionOneId].setAttribute('src', '../images/Blank.png');
      cards[optionTwoId].setAttribute('src', '../images/Blank.png');
      swal({
        title: 'Oops!',
        text: 'Try again!',
        icon: 'error',
      });
    }
    // Resetting the arrays after a match has not been found so we can compare on the user's next try
    cardsChosen = [];
    cardsChosenId = [];
    // Adding text to the document and using the .length array method to check to see if all of the matches have been found
    // If all the matches have been found the user is alerted that they have won and can use the button on the bottom of the screen to restart the game to play again
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      swal({
        title: 'Congratulations!',
        text: 'You have matched all of the cards!',
        icon: 'success',
      });
    }
  }

  //Flipping method to be added to all of the cards
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 400);
    }
  }
  // Calling the function so the code above runs and the user can play the game
  createBoard();
});
