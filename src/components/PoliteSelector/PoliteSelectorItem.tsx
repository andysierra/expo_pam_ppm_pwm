import { MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import './PoliteSelector.css';

interface props {
  to          : string,
  className?  : string|object,
  title?      : string,
  icon?       : string,
  onClick?    : MouseEventHandler
}

export const PoliteSelectorItem = ({
  to,
  className = '',
  title = 'Untitled',
  icon = '',
  onClick = ()=>{}
}:props) => {

  return (
    <NavLink to={to} className={
      `text-dark d-flex flex-column justify-content-between 
      align-items-center w-100 py-2 polite-item`
      + className }
      onClick={onClick}>
      <div><i className={icon+' display-6'}></i></div>
      <div><small>{title}</small></div>
    </NavLink>
  )
}
