import { useContext } from 'react';
import { ctxLab2, Lab2Context } from '../../contexts/Lab2Context';
import { Lab2TextArea } from './components/Lab2TextArea';
import './Laboratorio2.css';

export const Laboratorio2 = () => {

  const { analize } = useContext(ctxLab2);
  console.log(analize)

  return (
    <Lab2Context>
      <div className="row mx-2">
        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 d-flex flex-column justify-content-end">
          <div className="d-flex flex-column justify-content-start flex-grow-1">
            { analize? <Lab2TextArea action={ analize }/> : <></> }
          </div>
          <hr className="my-0"/>
          <div className="d-flex flex-column justify-content-start flex-grow-1">
            <p>graph</p>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 table-responsive">
          <table className="table table-sm table-hover table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">LETRA</th>
                <th scope="col">Pk</th>
                <th scope="col">I(Sk)</th>
                <th scope="col">Entropia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>A</td>
                <td>ρ</td>
                <td>前</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>0.1</td>
                <td>0.98</td>
                <td>0.01</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td >1.435</td>
                <td>3.424</td>
                <td>6.7544</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Lab2Context>
  )
}
