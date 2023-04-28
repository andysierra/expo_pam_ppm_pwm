import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { AppContext } from './contexts/AppContext';
import Pages from './pages/Pages';

const App = () => {
  return (
    <AppContext>
      <Navbar title="Prácticas" className="my-0 py-0">
        <NavLink className="nav-link" to="/" end>             Convertidor   </NavLink>
        <NavLink className="nav-link" to="/laboratorio2" end> Laboratorio2  </NavLink>
        <NavLink className="nav-link" to="about" end>         About         </NavLink>
      </Navbar>
      <hr />
      <Routes>
        <Route path="/expo_pam_ppm_pwm/*"              element={ <Pages.Convertidor/>  }/>
        <Route path="/expo_pam_ppm_pwm/about"          element={ <Pages.About/>        }/>
        <Route path="/expo_pam_ppm_pwm/laboratorio2"   element={ <Pages.Laboratorio2/> }/>
        <Route path="*"               element={ <Pages.Notfound/>     }/>
      </Routes>
    </AppContext>
  )
}

export default App;