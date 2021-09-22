class FilledBoxDrawer{

  constructor(params, noiseGrid){

    this.params = params;
    this.noiseGrid = noiseGrid;

  }

  draw(){

    for(let i=0;i<this.params.numX;i++){
      for(let j=0;j<this.params.numY;j++){

        console.log(this.noiseGrid);
        console.log(this.params.startColor,
                              this.params.endColor,
                              map(this.noiseGrid.grid[i][j],
                                  this.noiseGrid.minmax.min,
                                  this.noiseGrid.minmax.max, 0, 1))
        let cmyk = this.arrayLerp(this.params.startColor,
                              this.params.endColor,
                              map(this.noiseGrid.grid[i][j],
                                  this.noiseGrid.minmax.min,
                                  this.noiseGrid.minmax.max, 0, 1));

        push();
        translate((this.params.boxSize+this.params.between)*i+this.params.margin,
                  (this.params.boxSize+this.params.between)*j+this.params.margin);
        for(let v=0;v<cmyk.length;v++){
          let color = COLOR_MAP[v]; // c, m, y or k
          console.log(0,0,this.params.boxSize,this.params.boxSize,
            this.noiseGrid, color, this.params.maxLinesPerBoxColor, cmyk);
          this.drawFilledRectColor(0,0,this.params.boxSize,this.params.boxSize,
            this.noiseGrid.grid[i][j]*PI, color, floor(this.params.maxLinesPerBoxColor*cmyk[v]/100)
          );
        }
        pop();
      }
    }

  }

  arrayLerp(first, second, pct){

    let result = [];

    for(let k=0; k<first.length; k++){
      result.push(first[k]*(1-pct) + second[k]*pct);
    }

    return(result);
  }

  drawFilledRectColor(x, y, w, h, theta, strokeColor, numLines){

    push();
    // stroke(strokeColor[0], strokeColor[1], strokeColor[2]);
    stroke(strokeColor);
    translate(x,y);

    if(theta==0 || theta == PI){ // horizontal

      for(let l=0; l<numLines;l++){
        let startLoc = random(0,h);
        line(0,startLoc,w,startLoc);
      }

    } else if(theta == PI/2){ // vertical

      for(let l=0; l<numLines;l++){
        let startLoc = random(0,w);
        line(startLoc,0,startLoc,h);
      }

    } else if(theta > 0 && theta < PI/2){ //left bottom going to top/right

      let startLoc=0;

      for(let l=0; l<numLines; l++){

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

      for(let l=0; l<numLines; l++){

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

}
