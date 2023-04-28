export const useSinuidalWave = (
  yLimit      : number, 
  sampling    : number,
  stretching  : number,
  xOffset     : number,
  yOffset     : number) => {

  const getDots = (xLimit:number) => {
    let xValues:number[] = [];
    let yValues:number[] = [];
    sampling = sampling? sampling : 1;

    for(let i=0; i<xLimit; i+=1/sampling) {
      xValues.push(i);
      yValues.push((Math.sin(i+xOffset)*stretching)+yOffset);
    }
    return {xValues, yValues};
  }

  return getDots(yLimit);
}
