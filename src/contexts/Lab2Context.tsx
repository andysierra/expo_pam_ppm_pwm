import React, {createContext, useState} from 'react'
import { analizeFun, contextLab2Param, Lab2Data } from "../types/dto";
import { useAnalisis } from '../pages/laboratorio2/hooks/useAnalisis';

interface props {
  children: React.ReactNode;
}

export const ctxLab2 = createContext<contextLab2Param>({
  data    : { inputText: '' },
  setData : undefined,
  analize : undefined
});

export const Lab2Context = ({ children }:props) => {

  const [data, setData] = useState<Lab2Data>({inputText: ''});
  const [analize, setAnalize] = useState<analizeFun>(useAnalisis().analize);

  return (
    <ctxLab2.Provider value={{ data, setData, analize }}>
      { children }
    </ctxLab2.Provider>
  )
}