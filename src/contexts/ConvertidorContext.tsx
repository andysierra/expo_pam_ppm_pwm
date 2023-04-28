import { createContext, useEffect, useState } from "react";
import { contextParam, CvtData, CvtResult } from "../types/dto";

interface props { children:React.ReactNode };

export const ctx = createContext<contextParam>({
  data: {}, setData: undefined, results: {}, setResults: undefined, config: {}
});

export const ConvertidorContext = ({ children }: props) => {

  const [data, setData] = useState<CvtData>({
    bits        : 4,
    signed      : true,
    intervalos  : Math.pow(2,8)
  });

  const [results, setResults] = useState<CvtResult>({
    spanVoltage : 0,
    sgmVoltage  : 0
  });

  const [config, setConfig] = useState({
    showOps : true
  })

  useEffect(() => {
    //config.showOps && console.log(data)
  }, [data]);

  useEffect(() => {
    //config.showOps && console.log(results)
  }, [results]);

  return (
    <ctx.Provider value={{ data, setData, results, setResults, config }}>
      {children}
    </ctx.Provider>
  );
}
