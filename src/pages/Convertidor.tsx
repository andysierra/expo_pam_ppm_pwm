import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { ParamSelector } from "../components/ParamSelector/ParamSelector"
import { PoliteSelector } from "../components/PoliteSelector/PoliteSelector"
import { PoliteSelectorItem } from "../components/PoliteSelector/PoliteSelectorItem"
import { TableModal } from "../components/TableModal/TableModal"
import { appctx } from "../contexts/AppContext"
import { ConvertidorContext } from "../contexts/ConvertidorContext"
import Pages from "./Pages"

export const Convertidor = () => {

  const {app} = useContext(appctx);

  return (
    <ConvertidorContext>
      <TableModal isVisible={app.tableModal}/>
      <div className="w-100 h-100 row mx-auto">
        <div className="d-none d-md-block col-md-5 col-lg-5">

          <PoliteSelector 
            title = "Fuente Digital"
            onSelect={(e:UIEvent)=>{console.log(e)}}>
            <PoliteSelectorItem to="/texto" title="Texto" icon="bi bi-chat-left-dots"/>
            <PoliteSelectorItem to="/imagen" title="Imagen" icon="bi bi-file-earmark-image"/>
            <PoliteSelectorItem to="/decode" title="Decodificar" icon="bi bi-soundwave"/>
          </PoliteSelector>

          <ParamSelector title="Parámetros"></ParamSelector>
        </div>
        <div className="col-12 col-sm-12 col-md-7 col-lg-7 ">
          <Routes>
            <Route path="/texto"       element={ <Pages.Texto/>  }/>
            <Route path="/imagen"      element={ <Pages.Imagen/>  }/>
            <Route path="/decode"      element={ <Pages.Decode/>  }/>
          </Routes>
        </div>
      </div>
    </ConvertidorContext>
  )
}