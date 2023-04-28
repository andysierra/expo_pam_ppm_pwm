import React, { Children, useState } from 'react';
import './PoliteSelector.css';
import { PoliteSelectorItem } from './PoliteSelectorItem';

interface props {
  onSelect?   : Function|undefined,
  className?  : string|object,
  title?      : string,
  children?   : JSX.Element[];
}

export const PoliteSelector = ({
  onSelect  = undefined, 
  className = '',
  title     = 'Untitled',
  children  = []
}:props) => {

  const [active, setActive] = useState<number>(-1);
  let i=0;

  // TODO: fix
  const handleOnSelect = (key:number) => {
    setActive(key);
    onSelect && onSelect();
  }

  return (
    <div className={'d-flex flex-column justify-content-between px-1 py-2'
      + className }>
      
      <div><p className="px-2">{title}</p></div>

      <div className="d-flex flex-row justify-content-center my-2 overflow-auto">
        {
          children.map(
            child => <PoliteSelectorItem 
                        {...child.props}
                        className = {(((i+1)==active)? 'polite-item-active ' : '')+(child.props.className || '')}
                        key       = {++i}
                        onClick   = {()=>{handleOnSelect(i+1)}}/>
          )
        }
      </div>
    </div>
  )
}
