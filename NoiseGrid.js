class NoiseGrid{

  constructor(nrow, ncol, noiseSize){

    var grid = new Array(nrow);

    for(let i=0; i<nrow; i++){
      grid[i] = new Array(ncol); //arrayLerp(start,end,i/nrow);
      for(let j=0; j<ncol; j++){
        grid[i][j] = noise(i*noiseSize, j*noiseSize);
      }
    }

    this.grid = grid;
    this.minmax = this.getMinMax();

  }

  getMinMax(){

    let minVal = 1;
    let maxVal = 0;

    for(let i=0; i< this.grid.length; i++){
      for(let j=0; j< this.grid[i].length; j++){
        if(this.grid[i][j] < minVal){
          minVal = this.grid[i][j];
        }
        if(this.grid[i][j] > maxVal){
          maxVal = this.grid[i][j];
        }
      }
    }

    return({min:minVal, max:maxVal})

  }


}
