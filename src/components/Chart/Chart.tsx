import { useEffect, useRef } from "react"
import { ChartOpts } from "./types"
import { useD3Splineline } from "../../hooks/useD3Splineline";
import * as d3 from 'd3';
//import { useOnResizeEnd } from "../../hooks/useOnResizeEnd";

interface props {
  xValues : number[],
  yValues : number[],
  options : ChartOpts,
  className? : string | undefined
}

export const Chart = ({xValues=[], yValues=[], options, className}:props) => {

  const svgRef = useRef<SVGSVGElement>(null);

  // pending to implement:
  // const {width, height, resizing, setCallback} = useOnResizeEnd();

  useEffect(() => {
    options.dimension.boundingClientRect = svgRef.current?.getBoundingClientRect();
    useD3Splineline(d3.select(svgRef.current), xValues, yValues, options);
  }, [xValues, yValues, screen.width, screen.height]);

  return ( 
    <svg 
      ref       = { svgRef } 
      width     = { options.dimension.width } 
      height    = { options.dimension.height } 
      className = { className }>
      {/* SVG Managed by D3.js */}
    </svg>
  )
}
