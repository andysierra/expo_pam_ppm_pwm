import './Navbar.css';

interface props {
  title?      : string
  className?  : string | object,
  children?   : JSX.Element[]
}

export const Navbar = ({ title, className='', children=[] }: props) => {
  return (
    <nav className={'navbar navbar-expand-md navbar-light '+className}>
      <div className="container-fluid">

        <a className="navbar-brand" href="#">
          { title || 'Untitled' }
        </a>

        <button 
          className       = "navbar-toggler" 
          type            = "button" 
          data-bs-toggle  = "collapse" 
          data-bs-target  = "#navbarNavAltMarkup">
          <span className = "navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            { children }
          </div>
        </div>

      </div>
    </nav>
  )
}
