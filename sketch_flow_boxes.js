// Setup
const PARAMS ={
  margin: 50,
  between: 5,
  boxSize: 45,
  canvasX: 1100,
  canvasY: 1400,
  numX: 20,
  numY: 20,
  startColor: [0, 33, 80, 0],
  endColor: [80, 47, 0, 0],
  maxLinesPerBoxColor: 50,
  noiseSize: 0.2
}

const COLOR_MAP = ['cyan', 'magenta', 'yellow', 'black'];
let filledBoxDrawer;

function mousePressed(){
  save("squareFlowCMYK.svg");
}

function setup(){

  createCanvas(PARAMS.canvasX,PARAMS.canvasY,SVG);
  strokeWeight(1);
  noLoop();

  noiseGrid = new NoiseGrid(PARAMS.numX, PARAMS.numY, PARAMS.noiseSize);
  filledBoxDrawer = new FilledBoxDrawer(PARAMS, noiseGrid);

}

function draw(){

  filledBoxDrawer.draw();

}
