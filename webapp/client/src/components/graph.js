import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'

const CreateGraph = ({jsonData, partitionEdges='', matching='',showOnHover=false, showLegend=false, showDirected=true, SCC=[], showE0=false, showEW=false, showE1=false, showEprime=false, labelSet="", showDMsets=false}) => {
    const ref = useRef()
    // Convert json string into data set
    // Data set contains nodes and edges list
    // json example: {'x_1': [1], 'x_2': [0], 'x_3': [2, 3], 'x_4': [2]}
    // partition edges : {'E0': {'x_1': [3]}, 'EW': {'x_4': [2, 0], 'x_1': [2, 0]}, 'E1': {'x_3': [1], 'x_2': [3]}}
    function jsonGraphToDataset(json, partitionEdgesJSON, matchingJSON) {
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
        // Split json partition edges into three different edges list
        var e0 = []
        var ew = []
        var e1 = []
        var ePrime = []
        Object.keys(partitionEdgesJSON).forEach(
            function(key) {
                var edgeJSON = partitionEdgesJSON[key]
                Object.keys(edgeJSON).forEach( 
                    function(source) {
                        var targetList = edgeJSON[source]
                        targetList.forEach(function(r) {
                            if (key === "E0"){
                                e0.push({"source": source, "target": r});
                            }
                            if (key === "EW"){
                                ew.push({"source": source, "target": r});
                            }
                            if (key === "E1"){
                                e1.push({"source": source, "target": r});
                            }
                            if (key === "Eprime"){
                                ePrime.push({"source": source, "target": r});
                            }
                        })
                    }
                )
            }
        )
        var maxMatching = []
        Object.keys(matchingJSON).forEach(
            function(key) {
                maxMatching.push({"source": key, "target": matchingJSON[key]});
            }
        )
        return {"nodes": nodes, "edges": edges, "E0": e0, "EW": ew, "E1": e1, "Eprime":ePrime, "maxMatching":maxMatching};
    }

    var dataset = (jsonGraphToDataset(jsonData, partitionEdges, matching));
    // The Y position of the first left and right nodes
    const origin = 0;
    const spacing = 100;
    useEffect(() => {
        var left_count = 0;
        var right_count = 0;
        if (labelSet !== ""){
            var labelStarSet = labelSet.star
            var labelPlusSet = labelSet.plus
            var labelUSet = labelSet.u
        }
        
        // Initialise the x and y position of each node 
        (dataset.nodes).forEach((element, index, array) => {
            if (labelSet !== ""){
                if (labelStarSet.includes(element.name)){
                    element.label = "*"
                }
                if (labelPlusSet.includes(element.name)){
                    element.label = "+"
                }
                if (labelUSet.includes(element.name)){
                    element.label = "∪"
                }
            }
            
            if (element.isLeft)
            {
                left_count += 1;
                element.x = 100;
                element.y = spacing * left_count + origin;
            }
            else{
                right_count += 1;
                element.x = 400;
                element.y = spacing * (element.name+1) + origin; 
            }
        });
        var height = (Math.max(left_count, right_count)) * 115
        if (height <= 460){
            height = 460;
        }
        var svg = d3.select("svg");
        svg.selectAll("*").remove();

        const svgElement = d3.select(ref.current)
                            .attr("viewBox", `0 30 500 ${height}`)
    
        svgElement.append("svg:defs")
                .append("svg:marker")
                .attr("id", "arrowRightToLeft")
                .attr("viewBox", "0 0 10 10")
                .attr("refX", 37)
                .attr("refY", 5)
                .attr("markerUnits", "strokeWidth")
                .attr("markerWidth", 8)
                .attr("markerHeight", 6)
                .attr("orient", "auto-start-reverse")
                .append("svg:path")
                .attr("d", "M 0 0 L 10 5 L 0 10 z");
        
        svgElement.append("svg:defs")
                .append("svg:marker")
                .attr("id", "arrowLeftToRightBold")
                .attr("viewBox", "0 0 10 10")
                .attr("refX", 36)
                .attr("refY", 5)
                .attr("markerUnits", "strokeWidth")
                .attr("markerWidth", 4)
                .attr("markerHeight", 3)
                .attr("orient", "auto")
                .append("svg:path")
                .attr("d", "M 0 0 L 10 5 L 0 10 z")
                .attr("fill", "#048900")
        
        svgElement.append("svg:defs")
                .append("svg:marker")
                .attr("id", "arrowRightToLeftBold")
                .attr("viewBox", "0 0 10 10")
                .attr("refX", 36)
                .attr("refY", 5)
                .attr("markerUnits", "strokeWidth")
                .attr("markerWidth", 4)
                .attr("markerHeight", 3)
                .attr("orient", "auto-start-reverse")
                .append("svg:path")
                .attr("d", "M 0 0 L 10 5 L 0 10 z")
                .attr("fill", "#048900")

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

        //Plot the nodes
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
        
        nodes.append("text")
            .attr("dx", 0)
            .attr("dy",-30)
            .text(function (d) { return d.label; })
            .style("text-anchor", "middle")
            .style("fill", " #AF2413")
            

        //To avoid overlay when there's a matching showing
        if (showOnHover === true){
            nodes.on('mouseover', function(d, i) {
            
                links.style('stroke-width', function(l) {
                    if (i.name === l.source || i.name === l.target)
                        return 3;
                    else
                        return 0.3;
                    });
                });
            nodes.on('mouseout', function() {
                links.style('stroke-width', 1);
            });
        }
        
        
        if (showLegend === true){
            var legendHeight = height-20
            if (left_count < 5 && right_count < 5){
                legendHeight = height+10
            }
            
            var legendFontSize = "10px"
    
            svgElement.append("circle")
                    .attr("cx",10)
                    .attr("cy",legendHeight)
                    .attr("r", 6)
                    .style("fill", "#f57e7e")
            svgElement.append("text")
                    .attr("x", 20)
                    .attr("y", legendHeight)
                    .text("No maximum matching (E0)")
                    .style("font-size", legendFontSize)
                    .attr("alignment-baseline","middle")
            
            svgElement.append("circle")
                    .attr("cx",180)
                    .attr("cy",legendHeight)
                    .attr("r", 6)
                    .style("fill", "#efb5a3")
            svgElement.append("text")
                    .attr("x", 190)
                    .attr("y", legendHeight)
                    .text("Some maximum matching (EW)")
                    .style("font-size", legendFontSize)
                    .attr("alignment-baseline","middle")
    
            svgElement.append("circle")
                    .attr("cx",360)
                    .attr("cy",legendHeight)
                    .attr("r", 6)
                    .style("fill", "#315f72")
            svgElement.append("text")
                    .attr("x", 370)
                    .attr("y", legendHeight)
                    .text("All maximum matching (E1)")
                    .style("font-size", legendFontSize)
                    .attr("alignment-baseline","middle")

            var edgeSetLegendPosition = [0, 170, 340];
            svgElement.selectAll()
                    .data(edgeSetLegendPosition)
                    .enter()
                    .append('rect')
                    .attr('x', d=>d)
                    .attr('y', legendHeight-7.5)
                    .attr('width', 170)
                    .attr('height', 15)
                    .attr('fill', '#c2c2c3')
                    .attr('opacity', '0')
                    .on('mouseover', function(d, i) {
                        d3.select(this)
                        .attr('opacity', '0.4')
                        if (i === 0){
                            var e0JSONString = JSON.stringify(dataset.E0)
                            links.style('stroke-width', function(l) {
                                if (e0JSONString.includes(JSON.stringify(l))){
                                    return 4
                                }
                                else{
                                    return 0.3
                                }
                            })
                            links.style('stroke', function(l) {
                                if (e0JSONString.includes(JSON.stringify(l))){
                                    return "#f57e7e"
                                }
                            })
                        }
                        if (i === 170){
                            var ewJSONString = JSON.stringify(dataset.EW)
                            links.style('stroke-width', function(l) {
                                if (ewJSONString.includes(JSON.stringify(l))){
                                    return 4
                                }
                                else{
                                    return 0.3
                                }
                            })
                            links.style('stroke', function(l) {
                                if (ewJSONString.includes(JSON.stringify(l))){
                                    return "#efb5a3"
                                }
                            })
                        }
                        if (i === 340){
                            var e1JSONString = JSON.stringify(dataset.E1)
                            links.style('stroke-width', function(l) {
                                if (e1JSONString.includes(JSON.stringify(l))){
                                    return 4
                                }
                                else{
                                    return 0.3
                                }
                            })
                            links.style('stroke', function(l) {
                                if (e1JSONString.includes(JSON.stringify(l))){
                                    return "#315f72"
                                }
                            })
                        }
                    })
                    .on('mouseout', function(d, i) {
                        d3.select(this)
                            .attr('opacity', '0')
                        links.style('stroke-width', 1)
                        links.style('stroke', "black");
                    })

        }

        if (matching !== "") {
            var matchingJSONString = JSON.stringify(dataset.maxMatching)
            links.style('stroke-width', function(l) {
                if (matchingJSONString.includes(JSON.stringify(l))){
                    return 3
                }
            })
            links.style('stroke', function(l) {
                if (matchingJSONString.includes(JSON.stringify(l))){
                    return "#048900"
                }
            })

            if (showDirected){
                links.attr('marker-end', function(l) {
                    if (matchingJSONString.includes(JSON.stringify(l))){
                        return "url(#arrowLeftToRightBold)"
                    }
                })
                links.attr('marker-start', function(l) {
                    if (!matchingJSONString.includes(JSON.stringify(l))){
                        return "url(#arrowRightToLeft)";
                    }
                })
            } 
        }

        if (SCC.length !== 0) {
            links.style('stroke-width', function(l) {
                if (SCC.includes(l.source) && SCC.includes(l.target)){
                    return 3
                }
                else{
                    return 1
                }
            })
            links.style('stroke', function(l) {
                if (SCC.includes(l.source) && SCC.includes(l.target)){
                    return '#048900'
                }
                else{
                    return 'black'
                }
            })
            var matchingString = JSON.stringify(dataset.maxMatching)
            links.attr('marker-end', function(l) {
                if (matchingString.includes(JSON.stringify(l))){
                    return "url(#arrowLeftToRightBold)"
                }
            })
            links.attr('marker-start', function(l) {
                if (!matchingString.includes(JSON.stringify(l))){
                    return "url(#arrowRightToLeftBold)";
                }
            })
        }

        if (showEW === true){
            var ewString = JSON.stringify(dataset.EW)
            links.style('stroke-width', function(l) {
                if (ewString.includes(JSON.stringify(l))){
                    return 4
                }
                else{
                    return 1
                }
            })
            links.style('stroke', function(l) {
                if (ewString.includes(JSON.stringify(l))){
                    return '#048900'
                }
                else{
                    return 'black'
                }
            })
        }

        if (showE1 === true){
            var e1String = JSON.stringify(dataset.E1)
            links.style('stroke-width', function(l) {
                if (e1String.includes(JSON.stringify(l))){
                    return 4
                }
                else{
                    return 1
                }
            })
            links.style('stroke', function(l) {
                if (e1String.includes(JSON.stringify(l))){
                    return '#048900'
                }
                else{
                    return 'black'
                }
            })
        }

        if (showE0 === true){
            var e0String = JSON.stringify(dataset.E0)
            links.style('stroke-width', function(l) {
                if (e0String.includes(JSON.stringify(l))){
                    return 4
                }
                else{
                    return 1
                }
            })
            links.style('stroke', function(l) {
                if (e0String.includes(JSON.stringify(l))){
                    return '#048900'
                }
                else{
                    return 'black'
                }
            })
        }

        if (showEprime === true){
            var ePrimeString = JSON.stringify(dataset.Eprime)
            links.style('stroke-width', function(l) {
                if (ePrimeString.includes(JSON.stringify(l))){
                    return 4
                }
                else{
                    return 1
                }
            })
            links.style('stroke', function(l) {
                if (ePrimeString.includes(JSON.stringify(l))){
                    return '#048900'
                }
                else{
                    return 'black'
                }
            })
        }

        if (showDMsets === true){
            var DMLegendHeight = height-20
            if (left_count < 5 && right_count < 5){
                DMLegendHeight = height+10
            }
            
            var DMLegendFontSize = "10px"
            var legendXposition = [[20, '#27bdb2'], [100, '#285fbd'], [180, '#288dbd'], [260, '#8528bd'], [340, '#bd2869'], [420, '#bd8028']];

            svgElement.selectAll()
                    .data(legendXposition)
                    .enter()
                    .append("circle")
                    .attr("cx", d=>d[0])
                    .attr("cy",DMLegendHeight)
                    .attr("r", 6)
                    .style("fill", d=>d[1])
            
            var DMsets = [["A","x", 30], ["A","y", 110], ["B","x", 190], ["B","y", 270], ["C","x", 350], ["C","y", 430]]
            svgElement.selectAll()
                    .data(DMsets)
                    .enter()
                    .append("text")
                    .attr("x",d=>d[2])
                    .attr("y", DMLegendHeight)
                    .text(d=>d[0])
                    .style("font-size", DMLegendFontSize)
                    .attr("alignment-baseline","middle")
                    .append('tspan')
                    .text(d=>d[1])
                    .style('font-size', '0.4rem')
                    .attr('dx', '.1em')
                    .attr('dy', '.9em')
            var legendBox = [10, 90, 170, 250, 330, 410];
            svgElement.selectAll()
                    .data(legendBox)
                    .enter()
                    .append('rect')
                    .attr('x', d=>d)
                    .attr('y', DMLegendHeight-7.5)
                    .attr('width', 80)
                    .attr('height', 15)
                    .attr('fill', '#c2c2c3')
                    .attr('opacity', '0')
                    .on('mouseover', function(d, i) {
                        d3.select(this)
                        .attr('opacity', '0.4')
                        links.style("visibility", "hidden")
                        if (i === 10){
                            nodes.style('visibility', function(l) {
                                if (l.isLeft === true && l.label==="+"){
                                    return "visible"
                                }
                                else{
                                    return "hidden"
                                }
                            })
                        }
                        if (i === 90){
                            nodes.style('visibility', function(l) {
                                if (l.isLeft === false && l.label==="*"){
                                    return "visible"
                                }
                                else{
                                    return "hidden"
                                }
                            })
                        }
                        if (i === 170){
                            nodes.style('visibility', function(l) {
                                if (l.isLeft === true && l.label==="*"){
                                    return "visible"
                                }
                                else{
                                    return "hidden"
                                }
                            })
                        }
                        if (i === 250){
                            nodes.style('visibility', function(l) {
                                if (l.isLeft === false && l.label==="+"){
                                    return "visible"
                                }
                                else{
                                    return "hidden"
                                }
                            })
                        }
                        if (i === 330){
                            nodes.style('visibility', function(l) {
                                if (l.isLeft === true && l.label==="∪"){
                                    return "visible"
                                }
                                else{
                                    return "hidden"
                                }
                            })
                        }
                        if (i === 410){
                            nodes.style('visibility', function(l) {
                                if (l.isLeft === false && l.label==="∪"){
                                    return "visible"
                                }
                                else{
                                    return "hidden"
                                }
                            })
                        }
                    })
                    .on('mouseout', function() {
                        d3.select(this)
                        .attr('opacity', '0')
                        links.style("visibility", "visible")
                        nodes.style("visibility", "visible")
                    })
        }
        
    }, [dataset]);

    return (
        <svg
            ref={ref}
        />
    )
}

export default CreateGraph;
