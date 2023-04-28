import { CvtData, CvtResult } from "../types/dto";

export const useGraphVoltages = (data:CvtData, results:CvtResult, setOutput:React.Dispatch<React.SetStateAction<string>>) => {
  console.table(results.sgmTable);
  console.table(results.spanTable);

  let xValues:number[] = [];
  let yValues:number[] = [];

  const sgmSection = (data.bits!-1).toString(2).length;
  const itvSection = (data.itvPorSgm!-1).toString(2).length;
  
  const print = (line:string) => {
    setOutput(console => console+(console.length<1? line : "\n"+line));
  }

  print('# de bits para segmentos: '+results.sgmTable?.length+'; # de bits para intervalos: '+results.spanTable?.length);
  print('# de segmentos: '+results.sgmTable?.length+'; # de intervalos: '+results.spanTable?.length);
  let x = 0;
  results.binChunks?.forEach(chunk => {

    const binSgm = chunk.slice(1,sgmSection+1);
    const sgmId = parseInt(binSgm,2);
    const segment = results.sgmTable![sgmId][1];
    print('Segmento: '+binSgm+' = '+sgmId+' ('+segment+')');

    const binItv = chunk.slice(sgmSection+1,chunk.length);
    const itvId = parseInt(binItv,2);

    const interval1 = results.spanTable![itvId][1];
    const interval2 = results.spanTable![itvId][2];

    console.log(interval1, interval2);

    const minVoltage = segment + interval1;
    const maxVoltage = segment + interval2;
    const prom = (minVoltage+maxVoltage)/2;

    xValues.push(x);
    yValues.push(prom*(chunk.charAt(0)=='1'? 1 : -1));
    x++;
  });

  print('');
  return {
    xValues, yValues
  }
}
