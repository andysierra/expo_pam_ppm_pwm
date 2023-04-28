import { ChartOpts } from "../components/Chart/types";
import * as d3 from 'd3';

export const useD3Splineline = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  xValues: number[],
  yValues: number[],
  options: ChartOpts
) => {

  let { 
    width, 
    height, 
    padding=0, 
    xTicks=0, 
    yTicks=0
  } = options.dimension;

  const tickSize = 2;

  const draw = () => {
    if (!svg) {
      console.log('SVG is null');
      return null;
    }

    // width given or computed
    if(!width) width = options.dimension.boundingClientRect?.width || 0;
    if(!height) height = options.dimension.boundingClientRect?.height || 0;

    // get points (IN d3.js ALWAYS [number,number][], eg. [[x1,y1], [x2,y2] ...])
    let xMin: number = 0;
    let xMax: number = 0;
    let yMin: number = 0;
    let yMax: number = 0;
    const data: [number,number][] = xValues.map((xValue, i) => {
      xMin = xValue < xMin ? xValue : xMin;
      xMax = xValue > xMax ? xValue : xMax;
      yMin = yValues[i] < yMin ? yValues[i] : yMin;
      yMax = yValues[i] > yMax ? yValues[i] : yMax;
      return [xValue, yValues[i]];
    });

    // prepare ticks
    xTicks = xTicks<1? xMax : xTicks;
    yTicks = yTicks<1? yMax : yTicks;
    const fontHeight = 10;
    const fontWidth = Math.trunc(xMax).toString().length * 20;
    const masterTranslation = `translate(${tickSize + fontWidth},${tickSize + fontHeight})`;
    const xOffset = width-padding*2-tickSize*fontWidth;
    const yOffset = height-padding*2-tickSize*fontHeight*2;
    const xAxisHeight = (height - padding * 2 - 40)/(options.signed?2:1);
    const yAxisPosition = padding+fontWidth;

    // make axis
    const xScale = d3.scaleLinear()
      .range([(padding+fontWidth), xOffset])
      .domain([xMin, xMax]);

    const yScale = d3.scaleLinear()
      .range([yOffset, padding])
      .domain([yMin, yMax]);
    
    // begin draw
    svg.selectAll('*').remove();
    const g = svg.append('g').attr('transform', masterTranslation);

    const xAxis = d3.axisBottom(xScale).ticks(xTicks);
    const yAxis = d3.axisLeft(yScale).ticks(yTicks);

    // x axis label
    let xLabel = options.xLabel || 'X';
    g.append('g')
    .call(g => g.append("text")
    .attr('transform', masterTranslation)
    .attr("x", xOffset-padding-fontWidth-(xLabel.length*10)/2)
    .attr("y", xAxisHeight)
    .attr("fill", "currentColor")
    .attr('font-size','0.7em')
    .attr('font-weight', 'bold')
    .attr("text-anchor", "start")
    .text(xLabel));

    // y axis label
    let yLabel = options.yLabel || 'Y'
    g.append('g')
    .call(g => g.append("text")
    .attr("x", padding-fontWidth)
    .attr("y", padding)
    .attr("fill", "currentColor")
    .attr('font-size','0.7em')
    .attr('font-weight', 'bold')
    .attr("text-anchor", "start")
    .text(yLabel));

    g.append('g')
      .classed('axis', true)
      .attr('transform', 'translate(0, ' + xAxisHeight + ')')
      .call(xAxis);

    g.append('g')
      .classed('axis', true)
      .attr('transform', 'translate('+ yAxisPosition +' ,0)')
      .call(yAxis);

    // draw some dots
    svg.selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('r',3)
    .attr('fill', options.sampleColor || 'black')
    .attr('transform', masterTranslation)
    .attr('cx', d=>xScale(d[0]))
    .attr('cy', d=>yScale(d[1]));

    // draw some sampling lines
    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('fill', options.sampleColor || 'black')
    .attr('transform', masterTranslation)
    .attr('x', d=>xScale(d[0]))
    .attr('y', d=>{return (d[1]>((yMax-Math.abs(yMin))/2))? yScale(d[1]) : (options.signed? xAxisHeight : yScale(d[1]))})
    .attr('width', 1)
    .attr('height', d=>(Math.abs(xAxisHeight-yScale(d[1]))));

    // draw a line
    const line = d3.line();
    const lineData:[number,number][] 
      = data.map(
        (point:[number,number]) => ([xScale(point[0]), yScale(point[1])])
      );

    svg.selectAll('.line')
    .data(lineData)
    .enter()
    .append('path')
    .attr('fill', 'none')
    .attr('transform', masterTranslation)
    .attr('stroke', options.strokeColor || 'black')
    .attr('stroke-width', options.strokeWidth?options.strokeWidth : 1)
    .attr('d', d=>line(lineData));

    return g;
  }

  return draw();
}
