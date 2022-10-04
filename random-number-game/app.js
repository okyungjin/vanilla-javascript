const randomNumberForm = document.querySelector('#random-number-form');
const maxRangeInput = randomNumberForm.querySelector('#max-range');
const guessNumberInput = randomNumberForm.querySelector('#guess-number');

const resultElem = document.querySelector('.result');
const scoreElem = document.querySelector('.score');

const MIN_NUMBER = 0;

const onGuessNumberSubmit = (event) => {
  event.preventDefault();

  const guessedNumber = guessNumberInput.valueAsNumber;
  const randomInt = getRandomInt(MIN_NUMBER, maxRangeInput.value);

  resultElem.innerText = generateResultMessage(guessedNumber, randomInt);
  scoreElem.innerText = guessedNumber === randomInt ? 'You won!' : 'You lost!'
}

const generateResultMessage = (guessed, random) => {
  return `You chose: ${guessed}, the machine chose: ${random}.`;
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

randomNumberForm.addEventListener('submit', onGuessNumberSubmit);
