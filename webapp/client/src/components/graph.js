import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'

const CreateGraph = ({jsonData, partitionEdges='', matching='',showOnHover=false, showLegend=false, showDirected=true, SCC=[], showE0=false, showEW=false, showE1=false, labelSet=""}) => {
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
        return {"nodes": nodes, "edges": edges, "E0": e0, "EW": ew, "E1": e1, "maxMatching":maxMatching};
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
        var height = (Math.max(left_count, right_count)) * 120
        if (height <= 548){
            height = 548;
        }
        var svg = d3.select("svg");
        svg.selectAll("*").remove();

        const svgElement = d3.select(ref.current)
                            .attr("viewBox", `0 0 500 ${height}`)
    
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
            var legendFontSize = "10px"
    
            svgElement.append("circle").attr("cx",10).attr("cy",legendHeight).attr("r", 6).style("fill", "#f57e7e")
            var e0 = svgElement.append("text").attr("x", 20).attr("y", legendHeight).text("No maximum matching (E0)").style("font-size", legendFontSize).attr("alignment-baseline","middle")
            var e0JSONString = JSON.stringify(dataset.E0)
            e0.on('mouseover', function(d, i) {
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
            })
            e0.on('mouseout', function() {
                links.style('stroke-width', 1);
                links.style('stroke', "black");
                
            });
            
            svgElement.append("circle").attr("cx",180).attr("cy",legendHeight).attr("r", 6).style("fill", "#efb5a3")
            var ew = svgElement.append("text").attr("x", 190).attr("y", legendHeight).text("Some maximum matching (EW)").style("font-size", legendFontSize).attr("alignment-baseline","middle")
            var ewJSONString = JSON.stringify(dataset.EW)
            ew.on('mouseover', function(d, i) {
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
            })
            ew.on('mouseout', function() {
                links.style('stroke-width', 1);
                links.style('stroke', "black");
            });
    
            svgElement.append("circle").attr("cx",360).attr("cy",legendHeight).attr("r", 6).style("fill", "#315f72")
            var e1 = svgElement.append("text").attr("x", 370).attr("y", legendHeight).text("All maximum matching (E1)").style("font-size", legendFontSize).attr("alignment-baseline","middle")
            var e1JSONString = JSON.stringify(dataset.E1)
            e1.on('mouseover', function(d, i) {
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
            })
            e1.on('mouseout', function() {
                links.style('stroke-width', 1);
                links.style('stroke', "black");
            });
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

        // if (labelSet !== ""){
        //     var labelStarSet = labelSet.star
        //     var labelPlusSet = labelSet.plus
        //     var labelUSet = labelSet.u
        //     labelPlusSet.forEach(function(vertex){
        //         console.log(vertex);
        //     });
        // }
        
    }, [dataset]);

    return (
        <svg
            ref={ref}
        />
    )
}

export default CreateGraph;
