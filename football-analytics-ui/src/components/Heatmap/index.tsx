import * as d3 from "d3";
import { useEffect, useRef } from "react";

import type { HeatmapPositionPoints } from "../../services/players/types";
import type { D3Props, HeatmapProps, HeatPoint } from "./types";
import { calculateZones } from "./zones";

export default function Heatmap({ data }: HeatmapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.positions.points.length === 0) return;

    const position = data.positions.points

    const width = 800;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    clearSvg(svg);

    const { x, y } = createScales(width, height);

    drawPitch(svg, x, y, width, height);
    drawHeatmap(svg, position, x, y, width, height);
    drawZones(svg, position, x, y);

  }, [data]);

  return <svg ref={svgRef}></svg>;
}

function clearSvg(svg: D3Props) {
  svg.selectAll("*").remove();
}

function createScales(width: number, height: number) {
  const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
  const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

  return { x, y };
}

function drawPitch(svg: D3Props, x: any, y: any, width: number, height: number) {
  // Fundo
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#0b3d2e");

  // Borda
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("stroke", "#ffffff");

  // Meio
  svg.append("line")
    .attr("x1", x(50))
    .attr("x2", x(50))
    .attr("y1", y(0))
    .attr("y2", y(100))
    .attr("stroke", "#ffffff");

  // Círculo central
  svg.append("circle")
    .attr("cx", x(50))
    .attr("cy", y(50))
    .attr("r", height * 0.15)
    .attr("fill", "none")
    .attr("stroke", "#ffffff");

  // Ponto central
  svg.append("circle")
    .attr("cx", x(50))
    .attr("cy", y(50))
    .attr("r", 2)
    .attr("fill", "#ffffff");

  // Áreas esquerda/direita
  drawPenaltyAreas(svg, x, y);
}

function drawPenaltyAreas(svg: D3Props, x: any, y: any) {
  // ESQUERDA
  svg.append("rect")
    .attr("x", x(0))
    .attr("y", y(79))
    .attr("width", x(16.5))
    .attr("height", y(21) - y(79))
    .attr("fill", "none")
    .attr("stroke", "#fff");

  svg.append("rect")
    .attr("x", x(0))
    .attr("y", y(63))
    .attr("width", x(5.5))
    .attr("height", y(37) - y(63))
    .attr("fill", "none")
    .attr("stroke", "#fff");

  svg.append("circle")
    .attr("cx", x(11))
    .attr("cy", y(50))
    .attr("r", 2)
    .attr("fill", "#fff");

  // DIREITA
  svg.append("rect")
    .attr("x", x(83.5))
    .attr("y", y(79))
    .attr("width", x(100) - x(83.5))
    .attr("height", y(21) - y(79))
    .attr("fill", "none")
    .attr("stroke", "#fff");

  svg.append("rect")
    .attr("x", x(94.5))
    .attr("y", y(63))
    .attr("width", x(100) - x(94.5))
    .attr("height", y(37) - y(63))
    .attr("fill", "none")
    .attr("stroke", "#fff");

  svg.append("circle")
    .attr("cx", x(89))
    .attr("cy", y(50))
    .attr("r", 2)
    .attr("fill", "#fff");
}


function drawHeatmap(svg: D3Props, positions: HeatmapPositionPoints[], x: any, y: any, width: number, height: number) {
  const points: HeatPoint[] = positions.map(d => ({
    x: x(d.x),
    y: y(d.y),
    value: d.count
  }));

  const densityData = d3.contourDensity<HeatPoint>()
    .x(d => d.x)
    .y(d => d.y)
    .weight(d => d.value)
    .size([width, height])
    .bandwidth(45)
    (points);

  const maxDensity = d3.max(densityData, d => d.value) || 1;

  const color = d3.scaleSequential()
    .domain([0, maxDensity])
    .interpolator(
      d3.interpolateRgbBasis([
        "rgba(0,0,0,0)",
        "#1e5e2c",
        "#fdd835",
        "#fb8c00",
        "#b71c1c"
      ])
    );

  const opacity = d3.scaleLinear()
    .domain([0, maxDensity])
    .range([0.03, 0.45]);

  svg.append("g")
    .selectAll("path")
    .data(densityData)
    .join("path")
    .attr("d", d3.geoPath())
    .attr("fill", d => color(d.value))
    .attr("fill-opacity", d => opacity(d.value));
}


function drawZones(svg: D3Props, positions: any[], x: any, y: any) {
  const zoneData = calculateZones(positions);
  const maxZone = d3.max(zoneData, z => z.value) || 1;

  const zoneColor = d3.scaleLinear<string>()
    .domain([0, maxZone])
    .range(["transparent", "rgba(255,255,255,0.12)"]);

  const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("background", "#111")
    .style("color", "#fff")
    .style("padding", "8px 12px")
    .style("border-radius", "8px")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .style("opacity", 0);



  svg.append("g")
    .selectAll("rect.zone")
    .data(zoneData)
    .join("rect")
    .attr("x", d => x(d.xStart))
    .attr("y", d => y(d.yEnd))
    .attr("width", d => x(d.xEnd) - x(d.xStart))
    .attr("height", d => y(d.yStart) - y(d.yEnd))
    .attr("fill", d => zoneColor(d.value))
    .attr("stroke", "rgba(255,255,255,0.15)")
    .on("mouseover", function (event, d) {
      tooltip
        .style("opacity", 1)
        .html(`
          <strong>${d.name}</strong><br/>
          Ações: ${d.value}<br/>
          ${d.percentage}%
        `);
    })
    .on("mousemove", function (event) {
      tooltip
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 20 + "px");
    })
    .on("mouseleave", () => tooltip.style("opacity", 0));

  // Labels
  svg.append("g")
    .selectAll("text")
    .data(zoneData)
    .join("text")
    .attr("x", d => (x(d.xStart) + x(d.xEnd)) / 2)
    .attr("y", d => (y(d.yStart) + y(d.yEnd)) / 2)
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
    .attr("font-size", "11px")
    .text(d => d.percentage > 0 ? `${d.percentage}%` : "");
}