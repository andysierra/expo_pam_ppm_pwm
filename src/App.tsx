import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import Pages from './pages/Pages';

const App = () => {
  return (
    <>
      <Navbar title="Prácticas" className="my-0 py-0">
        <NavLink className="nav-link" to="/" end>     Convertidor   </NavLink>
        <NavLink className="nav-link" to="about" end> About         </NavLink>
      </Navbar>
      <hr />
      <Routes>
        <Route path="/"       element={ <Pages.Convertidor/>  }/>
        <Route path="/about"  element={ <Pages.About/>        }/>
        <Route path="/*"      element={ <Pages.Notfound/>     }/>
      </Routes>
    </>
  )
}

export default App;