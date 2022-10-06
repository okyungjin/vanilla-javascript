const colors = [
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34"
];

setRandomBackgroundColor();
const button = document.querySelector('button');
button.addEventListener('click', setRandomBackgroundColor);

function setRandomBackgroundColor() {
  const [firstColor, secondColor] = getRandomTwoDiffColor();
  const body = document.querySelector('body');
  body.style.background = `linear-gradient(${firstColor}, ${secondColor})`;
}

function getRandomTwoDiffColor() {
  const index1 = getRandomInt(0, colors.length);
  let index2 = getRandomInt(0, colors.length);

  // prevent to get same color
  while (index1 === index2) {
    index2 = getRandomInt(0, colors.length);
  }

  return [colors[index1], colors[index2]];
}

// [from, to)
function getRandomInt(min, max) {
  const random = Math.random() * (max - min);
  return Math.floor(random) + min;
}