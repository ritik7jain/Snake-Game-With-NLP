//Game By Ritik Jain
let label = "Starting the Game";

let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/PjIWkhCuB/';


function preload() {
  classifier = ml5.soundClassifier(modelURL + 'model.json');
}


let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(740, 540);

  classifyAudio();
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(4);
  snake = new Snake();
  foodLocation();
}

function classifyAudio() {
  classifier.classify(gotResults);
}
function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function controlSnake() {
  if (label === "left") {
    snake.setDir(-1, 0);
  } else if (label === "right") {
    snake.setDir(1, 0);
  } else if (label === "down") {
    snake.setDir(0, 1);
  } else if (label === "up") {
    snake.setDir(0, -1);
  }
}

function draw() {
  background(255);


  textSize(32);
  fill(0);
  text(label, 10, 50);

  scale(rez);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  controlSnake();
}
