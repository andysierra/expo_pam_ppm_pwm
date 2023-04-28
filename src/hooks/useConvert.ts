import { useContext, useState } from "react";
import { constants } from "../contexts/constants";
import { ctx } from "../contexts/ConvertidorContext";

export const useConvert = () => {

  const { data, setData, results, setResults }  = useContext(ctx);
  const [output, setOutput]   = useState<string>("");

  const print = (line:string) => {
    setOutput(console => console+(console.length<1? line : "\n"+line));
    console.log(line);
  }

  const go = ()=>{
    // gather params
    let sgmIntervals = Math.round((data.signed?(data.intervalos!/2):data.intervalos!)/data.bits!);
    setData!(d => ({...d, itvPorSgm:sgmIntervals}));
    print("Parámetros para la conversión: "+JSON.stringify(data));

    // get coefficients
    const [op, coefficient] = getCoefficients(sgmIntervals);
    print(op);

    // get span voltage
    let spanVoltage = constants.maxExcursion/(sgmIntervals*coefficient);
    print('Voltaje del intervalo: '+spanVoltage+'v = '+(spanVoltage*1000)+'mv');
    spanVoltage = spanVoltage*1000;
    setResults!(res => ({...res, spanVoltage:spanVoltage}));

    // get segment voltage
    const sgmVoltage = sgmIntervals*spanVoltage;
    print('Voltaje del segmento: '+sgmIntervals+' * '+spanVoltage+' = '+sgmVoltage+'mv');
    setResults!(res => ({...res, sgmVoltage:sgmVoltage}));

    // get segment table
    const sgmTable:[number, number, number][] = makeSgmTable(sgmVoltage);
    print('Tabla de segmentos: [');
    sgmTable.forEach(row => print(`[${row}]`));
    print(']');
    setResults!(res => ({...res, sgmTable:sgmTable}));

    // get span table
    const spanTable:[number, number, number][] = makeSpanTable(sgmIntervals, spanVoltage);
    print('Tabla de intervalos: [');
    spanTable.forEach(row => print(`[${row}]`));
    print(']');
    setResults!(res => ({...res, spanTable:spanTable}));

    // get binary chunks
    const binChunks:string[] = getChunks();
    print('muestras: [');
    binChunks.forEach(row => print(`[${row}]`));
    print(']');
    setResults!(res => ({...res, binChunks:binChunks}));
  }



  const getCoefficients = (sgmIntervals:number):[string,number] => {
    let result:number = 0;
    let str=sgmIntervals.toString()+' * (';

    if(data.uniforme) {
      for(let j=1; j<=data.bits!; j++) str += 'x +';
      result = data.bits!;
      str += ') = '+result;
    }
    else {
      for(let j=1; j<=data.bits!; j++) {
        str += j+'x +';
        result+=j
      };
      str += ') = '+result;
    }

    return [str,result];
  }



  const makeSgmTable = (sgmVoltage:number):[number, number, number][]=> {
    let res:[number, number, number][] = [];

    let nonUniformIncrement = 1;
    for(let i=0; i<data.bits!; i++){
      nonUniformIncrement+=i;
      res.push([i, sgmVoltage!*i, data.uniforme? sgmVoltage*(i+1) : sgmVoltage*(i+nonUniformIncrement)]);
    }

    return res;
  }



  const makeSpanTable = (sgmIntervals:number, spanVoltage:number):[number, number, number][]=> {
    let res:[number, number, number][] = [];

    for(let i=0; i<sgmIntervals; i++){
      res.push([i, spanVoltage!*i, spanVoltage*(i+1)]);
    }

    return res;
  }



  const getChunks = ():string[]=> {
    let res:string[] = [];

    if(data.bin) {
      for(let i=0; i<data.bin!.length; i+=data.bits!){
        let chunk:string = data.bin!.slice(i,i+data.bits!).join('');

        // fill with zero if there are incomplete chunks
        if(chunk.length<data.bits!) {
          let aux:string = '';
          aux += chunk
          for(let i=0; i<data.bits!-chunk.length; i++)
            aux += '0';
          chunk = aux;
        }

        res.push(chunk);
      }
    }

    return res;
  }


  return {
    results,
    output,
    setOutput,
    go
  };
}
