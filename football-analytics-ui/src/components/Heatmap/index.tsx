import * as d3 from "d3";
import { useEffect, useRef } from "react";

import type { HeatmapResponseProps } from "./types";


export default function Heatmap({ data }: HeatmapResponseProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.positions.length === 0) return;

    const width = 500;
    const height = 700;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // limpar SVG

    // escala x e y
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]); // invertido para campo

    // criar heatmap usando circles com intensidade
    const maxValue = d3.max(data.positions, d => d.value) || 1;
    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, maxValue]);

    svg.selectAll("circle")
      .data(data.positions)
      .join("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", d => 4 + d.value * 2) // raio baseado na intensidade
      .attr("fill", d => colorScale(d.value))
      .attr("fill-opacity", 0.6);

    // desenhar campo
    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

  }, [data]);

  return <svg ref={svgRef} style={{ backgroundColor: "#1e7f3f" }}></svg>;
}