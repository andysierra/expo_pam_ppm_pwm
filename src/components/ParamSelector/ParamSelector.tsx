import './ParamSelector.css';
import { useSinuidalWave } from "../../hooks/useSinuidalWave";
import { Chart } from "../Chart/Chart"
import React, { useEffect, useRef, useState } from 'react';
import { useParamSelector } from './useParamSelector';

interface props {
  className?: string | undefined
  title?: string
}

export const ParamSelector = ({ className, title }: props) => {

  const {data, onBitChange, onSignChange, onUniformChange} = useParamSelector();

  const { xValues, yValues } = useSinuidalWave(
    10, 
    data.bits!/2, 
    data.signed?data.intervalos!/2:data.intervalos!/2, 
    0, 
    data.signed?0:data.intervalos!/2
  );
  
  return (
    <div className={'d-flex flex-column justify-content-between px-1 py-2'
      + className}>

      <div><p className="px-2">{title || 'Untitled'}</p></div>

      <Chart
        xValues = { xValues }
        yValues = { yValues }
        options = {{
          xLabel      : '# muestras',
          yLabel      : 'Voltaje = 1v',
          strokeWidth : 1,
          strokeColor : 'black',
          sampleColor : 'gray',
          signed      : data.signed,
          dimension   : { height: 220, padding: 0, yTicks: 10}
        }}
        className="w-100 py-0"
      ></Chart>

      <div className="d-flex flex-row justify-content-around py-0 my-0">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <input
            type      = "number"
            min       = { 4 }
            max       = { 16 }
            value     = { data.bits }
            className = "my-0 py-0 simpleNumber w-50" 
            onKeyDown = { e => e.preventDefault() } // user can not edit directly
            onChange  = { e => onBitChange(e.target) } />
          <div>
            <small><b>Bits de muestra</b></small>
          </div>
        </div>

        <div className="
            d-flex flex-column justify-content-center align-items-start
            flex-grow-1">
          <div className="btn-group" role="group">
            <button 
              type="button" 
              className={"btn btn-sm btn-dark "+(data.signed?'active':'')}
              onClick={()=>{ onSignChange(true) }}>
                Signed
            </button>
            <button 
              type="button" 
              className={"btn btn-sm btn-dark "+(!data.signed?'active':'')}
              onClick={()=>{ onSignChange(false) }}>
                Unsigned
            </button>
          </div>
          <div className="btn-group" role="group">
            <button 
              type="button" 
              className={"btn btn-sm btn-dark "+(data.uniforme?'active':'')}
              onClick={()=>{ onUniformChange(true) }}>
                Uniforme
            </button>
            <button 
              type="button" 
              className={"btn btn-sm btn-dark "+(!data.uniforme?'active':'')}
              onClick={()=>{ onUniformChange(false) }}>
                No Uniforme
            </button>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="mb-0 mt-1 py-0">2<sup><b>{data.bits}</b></sup> = {data.intervalos!}</p>
            <small className="my-0 py-0"><b className="my-0 py-0">Intervalos</b></small>
          </div>
        </div>

        {
          data.signed && <div className="d-flex flex-column justify-content-around">
            <small>+{data.intervalos!/2}</small>
            <small>-{data.intervalos!/2}</small>
          </div>
        }
      </div>
    </div>

  )
}
