import { useContext } from 'react';
import {ctxLab2} from '../../../contexts/Lab2Context'
import { analizeFun } from '../../../types/dto';

interface props {
  action?: analizeFun
}

export const Lab2TextArea = ({ action }:props) => {

  const {data, setData} = useContext(ctxLab2);

  return (
    <div>
      <p><i className="bi bi-pencil-square"></i>&nbsp;Ingrese un texto</p>
      <textarea 
        style     = {{ resize: 'none' }}
        className = "w-100 form-control" 
        name      = "lab2_txa" 
        id        = "lab2_txa" 
        onChange  = { e => setData!({inputText: e.target.value}) }
        value     = { data.inputText }
        cols = {30} rows = {10}>
      </textarea>
      <div className="d-flex flex-row justify-content-between">
        <p>{ data.inputText.length }<b> caracteres</b></p>
        <button 
          className = "btn btn-success my-1"
          onClick   = { e => action && action(data.inputText) }>
          <i className="bi bi-play-fill"></i>&nbsp;Codificar
        </button>
      </div>
    </div>
  )
}
