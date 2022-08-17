import * as d3 from "d3";
import csvPath from "../../public/covid-19.csv";

export default async function Chart(widthParam=960,heightParam=parseInt(widthParam/960*500)) {
  this.$element = document.querySelector("#chart");
  // append the svg object to the body of the page
  let svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", widthParam)
    .attr("height", heightParam)
    .style("border","1px solid black");
  let margin = { top: 20, right: 20, bottom: 30, left: 50 };
  let width = +svg.attr("width") - margin.left - margin.right;
  let height = +svg.attr("height") - margin.top - margin.bottom;
  let rootGroup = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseTime = d3.timeParse("%Y-%m-%d");

  var x = d3.scaleTime().rangeRound([0, width]);

  var y = d3.scaleLinear().rangeRound([height, 0]);

  var line = d3
    .line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.total);
    });
  const data = await d3.csv(csvPath);
  for (const element of data) {
    element.date = parseTime(element.date);
    element.total = parseInt(element.total.replace(",", ""));
    element.foreign = parseInt(element.foreign.replace(",", ""));
    element.domestic = parseInt(element.domestic.replace(",", ""));
    element.death = parseInt(element.death.replace(",", ""));
  }
  x.domain(d3.extent(data, (d) => d.date));
  y.domain(d3.extent(data, (d) => d.total));
  rootGroup
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();
  rootGroup
    .append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("총 확진자 수");
  rootGroup
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  makeToolTip(data);
  function makeToolTip(data) {
    let toolTip = d3
      .select("#chart")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute");
    let mouseOver = function (event, d) {
      toolTip.style("opacity", 1).style("z-index",1);
      d3.select(this).style("stroke", "black");
    };
    let mouseMove = (event, d) => {
      toolTip
        .html(
          `${d.date.toLocaleDateString()} 총 확진자: ${d.total} 명 <br/>국내 빌생: ${d.domestic} 명<br/>해외유입: ${d.foreign} 명<br/>사망자: ${d.death} 명`
        )
        .style("left", d3.pointer(event)[0] + 70 + "px")
        .style("top", d3.pointer(event)[1] + "px");
    };
    let mouseleave = function (event, d) {
      toolTip.style("opacity", 0).style("z-index",-1);
      d3.select(this).style("stroke", "none");
    };
    rootGroup
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "gray")
      .attr("stroke", "none")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", function (d) {
        return y(d.total);
      })
      .attr("r", 3)
      .on("mouseover", mouseOver)
      .on("mousemove", mouseMove)
      .on("mouseleave", mouseleave);
  }
}
