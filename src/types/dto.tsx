export interface contextApp {
  app       : App, 
  setApp    : React.Dispatch<React.SetStateAction<App>> | undefined
}

export interface App {
  tableModal : boolean
}

export interface contextParam { 
  data       : CvtData, 
  setData    : React.Dispatch<React.SetStateAction<CvtData>> | undefined,
  results    : CvtResult, 
  setResults : React.Dispatch<React.SetStateAction<CvtResult>> | undefined,
  config     : any
}

export type analizeFun = (text:string)=>void;

export interface contextLab2Param {
  data      : Lab2Data, 
  setData   : React.Dispatch<React.SetStateAction<Lab2Data>> | undefined,
  analize?  : analizeFun
}

export interface Config {
  
}

export interface CvtData {
  mediaType?  : string,
  nombre?     : string,
  bin?        : (0|1)[],
  bits?       : number,
  signed?     : boolean,
  itvPorSgm?  : number,
  intervalos? : number,
  uniforme?   : boolean
}

export interface Lab2Data {
  inputText : string
}

export interface CvtResult {
  spanVoltage?  : number,
  sgmVoltage?   : number,
  sgmTable?     :[number, number, number][],
  spanTable?    :[number, number, number][],
  binChunks?    :string[]
}

export interface Point {
  xValue: number,
  yValue: number
}