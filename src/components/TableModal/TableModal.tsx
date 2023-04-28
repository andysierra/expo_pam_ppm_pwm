import { useContext, useState } from 'react';
import { appctx } from '../../contexts/AppContext';
import { ctx } from '../../contexts/ConvertidorContext';
import './TableModal.css';

export const TableModal = ({ isVisible = false }) => {

  const { setApp }        = useContext(appctx);
  const { data, results } = useContext(ctx);
  const [state, setState] = useState({ left: true });

  return isVisible ? (
    <div className="position-absolute w-100 h-100" id="exampleModal">
      <div className="modal-dialog modal-dialog-scrollable h-75">
        <div className="modal-content shadow-lg ">
          <div className="modal-header py-0">
            <div className="w-100 d-flex flex-row justify-content-center">
              <div className="
            d-flex flex-column justify-content-center w-50">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`btn btn-sm btn-${state.left ? '' : 'outline-'}dark`}
                    onClick = {()=>{setState(s => ({...state, left:true}))}}>
                    Segmentos
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm btn-${state.left ? 'outline-' : ''}dark`}
                    onClick = {()=>{setState(s => ({...state, left:false}))}}>
                    Intervalos
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => { setApp!(app => ({ ...app, tableModal: false })) }}></button>
          </div>
          <div className="modal-body p-0">
            {
              state.left ?
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Segmento #</th>
                      <th scope="col">Tamaño (mV)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      results.sgmTable!.map(
                        row => 
                        <tr key={row[0]}>
                          <th scope="row">{row[0]}</th>
                          <td>{row[1]+' - '+row[2]}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
                :
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Intervalo #</th>
                      <th scope="col">Tamaño (mV)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      results.spanTable!.map(
                        row => 
                        <tr key={row[0]}>
                          <th scope="row">{row[0]}</th>
                          <td>{row[1]+' - '+row[2]}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
            }
          </div>
        </div>
      </div>
    </div>
  ) : <></>
}
