import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Timeline = ({ data, spaceProportionally, vertical, allowBothSides }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Filter out data entries where content is empty
    const filteredData = data.filter(d => d.content.trim() !== '');

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear the SVG before re-rendering

    const width = 800;
    const height = vertical ? 600 : 200;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    svg.attr('width', width).attr('height', height);

    const x = d3
        .scaleTime()
        .domain(d3.extent(filteredData, (d) => new Date(d.timestamp)))
        .range([margin.left, width - margin.right]);

    const y = d3
        .scaleLinear()
        .domain([0, filteredData.length - 1])
        .range([margin.top, height - margin.bottom]);

    appendAxis(svg, x, y, height, margin, vertical, filteredData);

    const dotGroup = svg.append('g');
    const textGroup = svg.append('g');

    filteredData.forEach((d, i) => {
      appendDotAndText(dotGroup, textGroup, d, i, x, y, height, margin, vertical);
    });

    if (spaceProportionally) {
      adjustSpacing(x, filteredData);
    }

    if (allowBothSides) {
      appendBothSides(dotGroup, textGroup, filteredData, x, y, height, margin, vertical);
    }
  }, [data, spaceProportionally, vertical, allowBothSides]);

  return <svg ref={svgRef}></svg>;
};

const appendAxis = (svg, x, y, height, margin, vertical, data) => {
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
};

const appendDotAndText = (dotGroup, textGroup, d, i, x, y, height, margin, vertical) => {
  const cx = vertical ? margin.left : x(new Date(d.timestamp));
  const cy = vertical ? y(i) : height / 2;

  dotGroup
      .append('circle')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', 5)
      .style('fill', 'steelblue');

  appendText(textGroup, d, i, x, y, height, margin, vertical, cx, cy);
};

const appendText = (textGroup, d, i, x, y, height, margin, vertical, cx, cy) => {
  const xPos = vertical ? margin.left - 10 : cx;
  const yPos = vertical ? y(i) : height / 2 - 10;
  const textAnchor = vertical ? 'end' : 'middle';
  const dy = vertical ? 0 : '0.35em';

  textGroup
      .append('text')
      .attr('x', xPos)
      .attr('y', yPos)
      .attr('text-anchor', textAnchor)
      .attr('dy', dy)
      .text(d3.timeFormat('%Y-%m-%d')(new Date(d.timestamp)))
      .style('font-size', '10px')
      .style('fill', 'black');

  const contentXPos = vertical ? margin.left - 10 : cx;
  const contentYPos = vertical ? y(i) + 15 : height / 2 + 10;
  const contentTextAnchor = vertical ? 'end' : 'middle';
  const contentDy = vertical ? 0 : '1.2em';

  textGroup
      .append('text')
      .attr('x', contentXPos)
      .attr('y', contentYPos)
      .attr('text-anchor', contentTextAnchor)
      .attr('dy', contentDy)
      .text(d.content)
      .style('font-size', '12px')
      .style('fill', 'black');
};

const adjustSpacing = (x, data) => {
  const totalDuration = x.domain()[1] - x.domain()[0];
  const spacing = totalDuration / (data.length - 1);
  x.domain([x.domain()[0], x.domain()[0] + spacing * (data.length - 1)]);
};

const appendBothSides = (dotGroup, textGroup, data, x, y, height, margin, vertical) => {
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

    appendText(textGroup, d, i, x, y, height, margin, vertical, cx, cy, side);
  });
};

export default Timeline;
