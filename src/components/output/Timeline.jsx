import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Timeline = ({ data, spaceProportionally, vertical, allowBothSides }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear the SVG before re-rendering

    const width = 800;
    const height = vertical ? 600 : 200;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    svg.attr('width', width).attr('height', height);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.timestamp)))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.top, height - margin.bottom]);

    // Append x-axis with only the mentioned dates
    if (!vertical) {
      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickValues(data.map((d) => new Date(d.timestamp))).tickFormat(d3.timeFormat('%Y-%m-%d')));
    } else {
      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickValues(data.map((d, i) => i)).tickFormat((d, i) => d3.timeFormat('%Y-%m-%d')(new Date(data[i].timestamp))));
    }

    // Append dots
    const dotGroup = svg.append('g');
    data.forEach((d, i) => {
      const cx = vertical ? margin.left : x(new Date(d.timestamp));
      const cy = vertical ? y(i) : height / 2;
      dotGroup
        .append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', 5)
        .style('fill', 'steelblue');
    });

    // Append text
    const textGroup = svg.append('g');
    data.forEach((d, i) => {
      const xPos = vertical ? margin.left - 10 : x(new Date(d.timestamp));
      const yPos = vertical ? y(i) : height / 2 - 10;
      const textAnchor = vertical ? 'end' : 'middle';
      const dy = vertical ? 0 : '0.35em';
      textGroup
        .append('text')
        .attr('x', xPos)
        .attr('y', yPos)
        .attr('text-anchor', textAnchor)
        .attr('dy', dy)
        .text(d.content)
        .style('font-size', '12px')
        .style('fill', 'black');
    });

    // Space proportionally
    if (spaceProportionally) {
      const totalDuration = x.domain()[1] - x.domain()[0];
      const spacing = totalDuration / (data.length - 1);
      x.domain([x.domain()[0], x.domain()[0] + spacing * (data.length - 1)]);
    }

    // Allow data on both sides
    if (allowBothSides) {
      data.forEach((d, i) => {
        const side = i % 2 === 0 ? 1 : -1;
        const cx = vertical ? margin.left : x(new Date(d.timestamp)) + side * 20;
        const cy = vertical ? y(i) : height / 2;
        dotGroup
          .append('circle')
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('r', 5)
          .style('fill', 'steelblue');

        const xPos = vertical ? margin.left - 10 : x(new Date(d.timestamp)) + side * 20;
        const yPos = vertical ? y(i) : height / 2 - 10;
        const textAnchor = vertical ? 'end' : side === 1 ? 'start' : 'end';
        const dy = vertical ? 0 : '0.35em';
        textGroup
          .append('text')
          .attr('x', xPos)
          .attr('y', yPos)
          .attr('text-anchor', textAnchor)
          .attr('dy', dy)
          .text(d.content)
          .style('font-size', '12px')
          .style('fill', 'black');
      });
    }
  }, [data, spaceProportionally, vertical, allowBothSides]);

  return <svg ref={svgRef}></svg>;
};

export default Timeline;
