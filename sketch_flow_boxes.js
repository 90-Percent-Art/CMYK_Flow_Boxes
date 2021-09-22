// Grid
let margin = 50;
let between = 5;
let boxSize = 45;
let canvasX=1100;
let canvasY=1400;
let numX=20;
let numY=20;

// Color
// let startColor = [0,18,34,5]; // start color of gradient (0-100) values
// let endColor = [34,16,0,5]; // end color of gradient (0-100) values
let startColor = [0, 33, 80, 0];
let endColor = [80, 47, 0, 0];
const COLOR_MAP = ['cyan', 'magenta', 'yellow', 'black'];

// Lines
let maxLines=50;
let noiseSize=0.1;

let angleGrid;

function mousePressed(){
  save("squareFlowCMYK.svg");
}

function setup(){
  createCanvas(canvasX,canvasY,SVG);
  strokeWeight(1);
  noLoop();

  noiseGrid = makeNoiseGrid(numX, numY, noiseSize);

}

function draw(){

  let noiseVal,angle,cmyk;
  let color;

  for(i=0;i<numX;i++){
    for(j=0;j<numY;j++){
      push();
      translate((boxSize+between)*i+margin, (boxSize+between)*j+margin);

      cmyk = arrayLerp(startColor, endColor, map(noiseGrid[i][j],0.2,0.8,0,1));
      console.log(map(noiseGrid[i][j],0.2,0.8,0,1));

      for(v=0;v<cmyk.length;v++){

        color = COLOR_MAP[v]; // c, m, y or k
        drawFilledRectColor(0,0,boxSize,boxSize, noiseGrid[i][j]*PI, color, floor(maxLines*cmyk[v]/100));

      }
      pop();
    }
  }

}

function drawFilledRectColor(x, y, w, h, theta, strokeColor, numLines){

  push();
  // stroke(strokeColor[0], strokeColor[1], strokeColor[2]);
  stroke(strokeColor);
  translate(x,y);

  if(theta==0 || theta == PI){ // horizontal

    for(l=0; l<numLines;l++){
      let startLoc = random(0,h);
      line(0,startLoc,w,startLoc);
    }

  } else if(theta == PI/2){ // vertical

    for(l=0; l<numLines;l++){
      let startLoc = random(0,w);
      line(startLoc,0,startLoc,h);
    }

  } else if(theta > 0 && theta < PI/2){ //left bottom going to top/right

    let startLoc=0;

    for(l=0; l<numLines; l++){

      // random location along left / bottom
      let sideDecide = random(0,1);
      let startY, startX;

      if(sideDecide < h/(h+w*tan(theta))){
        startY = random(0,h);
        startX = 0;
      } else{
        startY=h;
        startX=random(0,w);
      }

      // Compute where the triangle intersects with right side
      let endY = tan(theta)*(w-startX);

      if(endY <= startY){// it hits the right side
        line(startX, startY, w, startY-endY);
      }else{
        let endX = startY/tan(theta);
        line(startX, startY, startX+endX, 0);
      }

      startLoc = startLoc + (w+h)/numLines;

    }
  } else if(theta < PI && theta > PI/2){

    for(l=0; l<numLines; l++){

      let phi = PI-theta;
      let sideDecide = random(0,1);
      let startY, startX;

      if(sideDecide < h/(h+w*tan(phi))){
        startY = random(0,h);
        startX = w;
      } else{
        startY=h;
        startX=random(0,w);
      }

      let endY = tan(phi)*(startX);

      if(endY<=startY){
        line(startX, startY, 0, startY-endY);
      }else{
        let endX = startY/tan(phi);
        line(startX, startY, startX-endX, 0);
      }
    }
  }
  pop();

}

function makeNoiseGrid(nrow, ncol, size){

  var grid = new Array(nrow);

  for(i=0; i<nrow; i++){
    grid[i] = new Array(ncol); //arrayLerp(start,end,i/nrow);
    for(j=0; j<ncol; j++){
      grid[i][j] = noise(i*size, j*size);
    }
  }

  return(grid);

}

function arrayLerp(first, second, pct){

  result = [];

  for(k=0; k<first.length; k++){
    result.push(first[k]*(1-pct) + second[k]*pct);
  }

  return(result);
}
