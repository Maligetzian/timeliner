import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Timeline = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 200;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    svg.attr('width', width).attr('height', height);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.timestamp)))
      .range([margin.left, width - margin.right]);

    const y = height / 2;

    // Append x-axis with only the mentioned dates
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickValues(data.map((d) => new Date(d.timestamp))).tickFormat(d3.timeFormat('%Y-%m-%d')));

    // Append dots
    svg
      .append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(new Date(d.timestamp)))
      .attr('cy', y)
      .attr('r', 5)
      .style('fill', 'steelblue');

    // Append text above the dots
    svg
      .append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', (d) => x(new Date(d.timestamp)))
      .attr('y', y - 10) // Position the text above the dot
      .attr('text-anchor', 'middle')
      .text((d) => d.content)
      .style('font-size', '12px')
      .style('fill', 'black');
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Timeline;
