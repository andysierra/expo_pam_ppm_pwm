import { useContext, useEffect, useRef, useState } from "react";
import { Chart } from "../../components/Chart/Chart"
import { appctx } from "../../contexts/AppContext";
import { ctx } from "../../contexts/ConvertidorContext";
import { useConvert } from "../../hooks/useConvert";
import { useGetBinaryArray } from "../../hooks/useGetBinaryArray";
import { useGraphVoltages } from "../../hooks/useGraphVoltages";

export const Texto = () => {

  const { setApp }                      = useContext(appctx);
  const { data, setData }               = useContext(ctx);
  const {results, output, setOutput, go}           = useConvert();
  const {bin, setMedia}                 = useGetBinaryArray('text');
  const [text, setText]                 = useState("");
  const [tableVisible, setTableVisible] = useState(false);
  const [graphCoords, setGraphCoords]   = useState<{x:number[], y:number[]}>({x:[], y:[]});
  const consoleRef                      = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bin.length && setData!(d => ({...d, mediaType:'text', bin:bin, nombre:text}));
  }, [bin]);

  useEffect(() => {
    consoleRef.current!.scrollTop = consoleRef.current!.scrollHeight;
  }, [output])

  useEffect(() => {
    if(results.sgmTable) setTableVisible(true);
  }, [results.sgmTable])
  
  useEffect(() => {
    if(results.binChunks) {
      let {xValues, yValues} = useGraphVoltages(data, results, setOutput);
      setGraphCoords({
        x: xValues,
        y: yValues
      });
    }
  }, [results.binChunks])
  

  return (
    <div className='d-flex flex-column h-100'>
      <div className="d-flex flex-column align-items-end flex-stretch-1">
        <input 
          className="form-control"
          placeholder="Ingrese el texto aquí"
          type="text" 
          name="text"
          onChange={e=>{setMedia(e.target.value); setText(e.target.value)}} 
          id="text"/>

        <div className="d-flex flex-row justify-content-end">
          {tableVisible && <button 
            className="btn btn-dark btn-sm my-2 mx-1"
            onClick={()=>{ setApp!(app => ({...app, tableModal:!app.tableModal})) }}>
            <i className="bi bi-file-earmark-spreadsheet-fill">&nbsp;</i>
            Ver tablas
          </button>}
          <button 
            className="btn btn-dark btn-sm my-2 mx-1"
            onClick={()=>go()}>
            <i className="bi bi-file-binary-fill">&nbsp;</i>
            Convertir
          </button>
        </div>

        <hr className="pt-0 mt-0 w-100"/>
      </div>

      <div className="align-items-center flex-grow-1 d-flex flex-column">
        {
          graphCoords.x.length>0 ? <Chart
            xValues = { graphCoords.x }
            yValues = { graphCoords.y }
            options = {{
              xLabel      : '# muestras',
              yLabel      : 'Voltaje = 1v',
              strokeWidth : 1,
              strokeColor : 'black',
              sampleColor : 'gray',
              signed      : true,
              dimension   : { height: 220, padding: 0, yTicks: 256/50}
            }}
            className="w-100 py-0"
            /> 
          :
            <div>
              <p className="display-5">
                <i className="bi bi-pencil-fill">&nbsp;</i>
                Ingrese un texto
              </p>
            </div>
        }
        <textarea 
          className={"w-100 flex-grow-1 console"+(graphCoords.x.length>0? '' : 'invisible border-0')}
          name="console" 
          id="console"
          value={output}
          ref={consoleRef}
          readOnly={true}
          >  
        </textarea>
      </div>

    </div>
  )
}