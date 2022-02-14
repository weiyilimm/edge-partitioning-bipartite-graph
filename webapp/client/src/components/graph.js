import React, { Component, components, useEffect, useRef } from 'react';
import * as d3 from 'd3'

const CreateGraph = ({jsonData}) => {

    const ref = useRef()
    // Convert json string into data set
    // Data set contains nodes and edges list
    // json example: {'x_1': [1], 'x_2': [0], 'x_3': [2, 3], 'x_4': [2]}
    function jsonToDataset(json) {
        var unique_left = new Set();
        var unique_right = new Set();
        Object.keys(json).forEach(
            function(key) {
                unique_left.add(key);
                json[key].forEach(function (item, index) {
                    unique_right.add(item);
                });
            }
        )
        
        // Add left and right vertices into a list
        var nodes = [];
        unique_left.forEach(function(left){
            nodes.push({"name": left, "id": left, "isLeft": true});
        });

        unique_right.forEach(function(right){
            nodes.push({"name": right, "id": right, "isLeft": false});
        });

        // Add edges into a list
        var edges = []
        Object.keys(json).forEach(
            function(key) {
                var rights = json[key];
                rights.forEach(function(r) {
                    edges.push({"source": key, "target": r});
                })
            }
        )

        return {"nodes": nodes, "edges": edges};
    }
    console.log(jsonData);
    var json = jsonData  // temporary json
    var dataset = (jsonToDataset(json));
    console.log(dataset)
    // The Y position of the first left and right nodes
    const origin = 0;
    const spacing = 100;
    useEffect(() => {
        var left_count = 0;
        var right_count = 0;
        // Initialise the x and y position of each node 
        (dataset.nodes).forEach((element, index, array) => {
            const cy = origin + 20 * index
            if (element.isLeft)
            {
                left_count += 1;
                element.x = 50;
                element.y = spacing * left_count + origin;
            }
            else{
                right_count += 1;
                element.x = 350;
                element.y = spacing * (element.name+1) + origin; 
            }
        });
        var svg = d3.select("svg");
        svg.selectAll("*").remove();
        const svgElement = d3.select(ref.current)
                            .attr("viewBox", `0 0 500 500`)
        // Plot the edges
        var links = svgElement.selectAll("link")
            .data(dataset.edges)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("x1", function(l) {
                var sourceNode = dataset.nodes.filter(
                    function(data){ return data.id === l.source }
                )[0];
                d3.select(this).attr("y1", sourceNode.y);
                return sourceNode.x
            })
            .attr("x2", function(l) {
                var targetNode = dataset.nodes.filter(
                    function(data){ return data.id === l.target }
                )[0];
                d3.select(this).attr("y2", targetNode.y);
                return targetNode.x
            })
            .attr("fill", "#69b3a2")
            .attr("stroke", "black")
            .attr("stroke-width", 1.5)

        // Plot the nodes
        var nodes = svgElement.append("g")
            .attr("class", "nodes")
            .selectAll("node")
            .data(dataset.nodes)
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                return "translate(" + d.x + "," + d.y + ")" 
            })
         
        nodes.append("circle")
            .attr("class", "node")   
            .attr("r", 25)
            .style("fill", function(d) {
                if (d.isLeft) {
                    return "#EBB11E"
                } else {
                    return "#4590D1"
                }
            })
        nodes.append("text")
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .style('fill', 'black')
            .style('dominant-baseline', 'central')
            .text(function(d) {
              return d.name;
             })
    }, [dataset]);

    return (
        <svg
            ref={ref}
        />
    )
}

export default CreateGraph;
