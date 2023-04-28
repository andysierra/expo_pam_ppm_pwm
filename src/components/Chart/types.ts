interface dimension {
  width?              : number,
  height?             : number,
  padding?            : number,
  xTicks?             : number,
  yTicks?             : number,
  boundingClientRect? : DOMRect
}

export interface ChartOpts {
  title?        : string,
  xLabel?       : string,
  yLabel?       : string,
  signed?       : boolean,
  strokeWidth?  : number,
  strokeColor?  : string,
  sampleColor?  : string
  dimension     : dimension
}