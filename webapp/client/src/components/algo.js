import React, { useState } from 'react';
import CreateGraph from './graph';
import NavigationBar from './NavigationBar';
import { Button } from 'react-bootstrap';
import "./algo.css";

const Algo = () => {
    var graph = JSON.parse(localStorage.getItem('graph'))
    var isPerfectMatching = JSON.parse(localStorage.getItem('isPerfect'))
    var graphMatching = JSON.parse(localStorage.getItem('matching'))
    var SCCArray = JSON.parse(localStorage.getItem('SCC'))
    var partitionEdgesJSON = JSON.parse(localStorage.getItem('partitionEdges'))
    var labelSetJSON = JSON.parse(localStorage.getItem('labelSet'))
    // Step 2
    var step2title = 'Step 2: Finding maximum matching';
    var step2Text1 = 'A matching (M) in a Bipartite Graph is a set of edges, ' +
                    'subset of the edge set E, that no two edges share an ' +
                    'endpoint vertex. A maximum matching is a matching of ' +
                    'maximum number of edges. In a maximum matching, if any ' +
                    'edge is added into it, it is no longer a matching.';
    var step2Text2 = <p>In order to find the maximum matching, 
                    a <a href="https://epubs.siam.org/doi/epdf/10.1137/0202019" className='document'>
                    Hopcroft-Karp algorithm</a> with a worst-case running time 
                    of O(n^1/2m) is used.</p>;
    var step2Text3 = 'Note: Edges from set E are shown as black lines; ' +
                    'Matching edges from set M are shown as green lines.';

    // Step 3
    var step3title = 'Step 3: Check if the maximum matching is perfect or imperfect';
    var step3Text1 = 'A vertex is matched if it is the endpoint of a matched edge; ' +
                    'otherwise, it is exposed. The maximum matching is perfect if ' +
                    'all the vertices are matched; otherwise, it is imperfect.';
    var step3Text2Perfect = 'The bipartite graph shows that all vertices in X and Y are ' +
                            'connected with a matched edge (green line). Thus, ' +
                            'the graph is a perfect matching.';
    var step3Text2Imperfect = 'There is an exposed vertex, the vertex that is not' +
                            'connected to another set by a matched edge. Thus, ' +
                            'the graph is an imperfect matching.';

    // Step 4 Perfect
    var step4titlePerfect = 'Step 4: Create a directed graph from an undirected graph';
    var step4Text1Perfect = 'If the edge is in the matching, the left vertex goes to the ' +
                            'right vertex. If the edge is not in the matching, the right ' +
                            'vertex goes to the left vertex.';
    var step4Text2Perfect = '';

    // Step 5 Perfect
    var step5titlePerfect = 'Step 5: Find strongly connected components';
    var step5Text1Perfect = 'A directed bipartite graph G(X, Y, E) is ' +
                            'strongly connected if every vertex is ' +
                            'reachable from every other vertex. A strongly ' +
                            'connected component of G is a maximal strongly connected subgraph of G.';
    var step5Text2Perfect = <p>A <a href="https://epubs.siam.org/doi/epdf/10.1137/0201010" 
                            className='document'>Tarjan's strongly connected components 
                            algorithm</a> with a worst case running time of O(|X| + |Y| + |E|), 
                            where |X| is the number of X vertices, |Y| is the number of Y vertices, 
                            and |E| is the number of edges is used.</p>;
    var step5Text3Perfect = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from SCC component are shown as green lines.';

    // Step 6 Perfect
    var step6titlePerfect = 'Step 6: Find "some maximum matching (EW)"';
    var step6Text1Perfect = 'A bipartite graph contains at least one maximum matching M. ' +
                            '"Some maximum matching (EW)" is a set of edges belonging ' +
                            'to at least one maximum matching but not all of them.' 
    var step6Text2Perfect = 'Every edge of the strongly connected component belongs to the ' +
                            '"some maximum matching (EW)" set.';
    var step6Text3Perfect = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from EW are shown as green lines.';

    // Step 7 Perfect
    var step7titlePerfect = 'Step 7: Find "all maximum matching (E1)"';
    var step7Text1Perfect = 'A bipartite graph contains at least one maximum matching M. ' +
                            '"All maximum matching (E1)" is a set of edges belonging ' +
                            'to all maximum matching.' 
    var step7Text2Perfect = 'Every edge of the matching belongs to the ' +
                            '"all maximum matching (E1)" set if it does not belong to ' +
                            '"some maximum matching (EW)".';
    var step7Text3Perfect = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from E1 are shown as green lines.';
    
    // Step 8 Perfect
    var step8titlePerfect = 'Step 8: Find "no maximum matching (E0)"';
    var step8Text1Perfect = 'A bipartite graph contains at least one maximum matching M. ' +
                            '"no maximum matching (E0)" is a set of edges belonging ' +
                            'to no maximum matching.' 
    var step8Text2Perfect = 'Every edge of the bipartite graph belongs to the ' +
                            '"no maximum matching (E0)" set if it does not belong to ' +
                            '"some maximum matching (EW)" and "all maximum matching (E1)".';
    var step8Text3Perfect = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from E0 are shown as green lines.';
    
    // Step 9 Perfect
    var step9titlePerfect = 'Step 9: Congrats! ';
    var step9Text1Perfect = 'You\'ve just learned the edge partitioning algorithm.' 
    var step9Text2Perfect = 'Try hovering over the legend and see the partitioned edges set!';
    var step9Text3Perfect = '';

    // Step 4 Imerfect
    var step4titleImperfect = 'Step 4: Label vertices ';
    var step4Text1Imperfect = 'In an imperfect matching, vertices in X and Y set are labelled into plus(+), star(*), or u(∪).';
    var step4Text2Imperfect = <p className='pseudocode'><span style={{"color": "#af00db"}}>label</span> exposed vertices in X as plus
    <hr></hr><span style={{"color": "#af00db"}}>while</span> (there are vertices to be labelled as plus) <span style={{"color": "#af00db"}}>do</span>:
    <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in Y that is adjacent to a labelled vertex in X by an unmatched edge as plus
    <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in X that is adjacent to a labelled vertex in Y by an matched edge as plus
    <hr></hr><span style={{"color": "#af00db"}}>label</span> exposed vertices in Y as star
    <hr></hr><span style={{"color": "#af00db"}}>while</span> (there are vertices to label as star) <span style={{"color": "#af00db"}}>do</span>:
    <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in X that is adjacent to a labelled vertex in Y by an unmatched edge as star
    <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in Y that is adjacent to a labelled vertex in X by an matched edge as star
    <hr></hr><span style={{"color": "#af00db"}}>label</span> unlabelled vertices as U</p>;
    
    // Step 5 Imperfect
    var step5titleImperfect = 'Step 5: Partition vertices';
    var step5Text1Imperfect = <p>In a bipartite graph G(X, Y, E), vertices can be partitioned into the <a href="https://en.wikipedia.org/wiki/Dulmage%E2%80%93Mendelsohn_decomposition" 
    className='document'>Dulmage and Mendelsohn sets</a>.</p>
    var step5Text2Imperfect = <p>Dulmage and Mendelsohn sets
        <ul>
            <li>A<sub>x</sub> - Plus(+) labelled vertices in X set</li>
            <li>A<sub>y</sub> - Plus(+) labelled vertices in Y set</li>
            <li>B<sub>x</sub> - Star(*) labelled vertices in X set</li>
            <li>B<sub>y</sub> - Star(*) labelled vertices in Y set</li>
            <li>C<sub>x</sub> - U(∪) labelled vertices in X set</li>
            <li>C<sub>y</sub> - U(∪) labelled vertices in Y set</li>
        </ul>
    </p>;
    var step5Text3Imperfect = '';

    const [matching, setMatching] = useState(graphMatching);
    const [stepCount, setStepCount] = useState(0);
    const [prevButtonDisabled, setPrevButtonDisabled] = useState('disabled');
    const [nextButtonDisabled, setNextButtonDisabled] = useState('');
    const [title, setTitle] = useState(step2title);
    const [showDirectedGraph, setShowDirectedGraph] = useState(false);
    const [text, setText] = useState(step2Text1);
    const [text2, setText2] = useState(step2Text2);
    const [text3, setText3] = useState(step2Text3);
    const [SCC, setSCC] = useState([]);
    const [showLegend, setShowLegend] = useState(false);
    const [showEW, setShowEW] = useState(false);
    const [showE1, setShowE1] = useState(false);
    const [showE0, setShowE0] = useState(false);
    const [showOnHover, setShowOnHover] = useState(false);
    const [labelSet, setLabelSet] = useState('');
    const nextButton = () => {
        // Perfect
        if (isPerfectMatching){
            // Step 3 
            if (stepCount === 0){
                setPrevButtonDisabled('');
                setTitle(step3title);
                setText(step3Text1)
                setText2(step3Text2Perfect)
            }
            // Step 4
            if (stepCount === 1){
                setShowDirectedGraph(true)
                setTitle(step4titlePerfect)
                setText(step4Text1Perfect)
                setText2(step4Text2Perfect)
            }
            // Step 5
            if (stepCount === 2){
                setShowDirectedGraph(false)
                setMatching('')
                setSCC(SCCArray)
                setTitle(step5titlePerfect);
                setText(step5Text1Perfect)
                setText2(step5Text2Perfect)
                setText3(step5Text3Perfect)
            }
            // Step 6
            if (stepCount === 3){
                setSCC([])
                setShowEW(true)
                setTitle(step6titlePerfect);
                setText(step6Text1Perfect)
                setText2(step6Text2Perfect)
                setText3(step6Text3Perfect)
            }

            // Step 7
            if (stepCount === 4){
                setShowEW(false)
                setShowE1(true)
                setTitle(step7titlePerfect);
                setText(step7Text1Perfect)
                setText2(step7Text2Perfect)
                setText3(step7Text3Perfect)
            }

            // Step 8
            if (stepCount === 5){
                setShowE1(false)
                setShowE0(true)
                setTitle(step8titlePerfect);
                setText(step8Text1Perfect)
                setText2(step8Text2Perfect)
                setText3(step8Text3Perfect)
            }

            // Step 9
            if (stepCount === 6){
                setShowE0(false)
                setTitle(step9titlePerfect);
                setText(step9Text1Perfect)
                setText2(step9Text2Perfect)
                setText3(step9Text3Perfect)
                setShowLegend(true)
                setShowOnHover(true)
                setNextButtonDisabled('disabled')
            }
        }
        // Imperfect
        if (!isPerfectMatching){
            // Step 3
            if (stepCount === 0){
                setPrevButtonDisabled('')
                setTitle(step3title)
                setText(step3Text1)
                setText2(step3Text2Imperfect)
            }
            // Step 4
            if (stepCount === 1){
                setTitle(step4titleImperfect);
                setText(step4Text1Imperfect)
                setText2(step4Text2Imperfect)
                setLabelSet(labelSetJSON)
            }
            // Step 5
            if (stepCount === 2){
                setTitle(step5titleImperfect);
                setText(step5Text1Imperfect)
                setText2(step5Text2Imperfect)
            }
            
        }
        setStepCount(stepCount+1)
    }

    const prevButton = () => {
        // Step 2
        if (stepCount === 1){
            setPrevButtonDisabled("disabled");
            setTitle(step2title);
            setText(step2Text1)
            setText2(step2Text2)
            setText3(step2Text3)
        }

        
        if (isPerfectMatching){
            // Step 3
            if (stepCount === 2){
                setShowDirectedGraph(false)
                setTitle(step3title);
                setText(step3Text1)
                setText2(step3Text2Perfect)
            } 
            // Step 4
            if (stepCount === 3){
                setTitle(step4titlePerfect);
                setText(step4Text1Perfect)
                setText2(step4Text2Perfect)
                setText3(step2Text3)
                setShowDirectedGraph(true)
                setMatching(graphMatching)
                setSCC([])
            }
            // Step 5
            if (stepCount === 4){
                setShowDirectedGraph(false)
                setSCC(SCCArray)
                setShowEW(false)
                setTitle(step5titlePerfect);
                setText(step5Text1Perfect)
                setText2(step5Text2Perfect)
                setText3(step5Text3Perfect)
            }
            // step 6
            if (stepCount === 5){
                setShowEW(true)
                setShowE1(false)
                setTitle(step6titlePerfect);
                setText(step6Text1Perfect)
                setText2(step6Text2Perfect)
                setText3(step6Text3Perfect)
            }
            // step 7
            if (stepCount === 6){
                setShowE1(true)
                setShowE0(false)
                setTitle(step7titlePerfect);
                setText(step7Text1Perfect)
                setText2(step7Text2Perfect)
                setText3(step7Text3Perfect)
            }
            // step 8
            if (stepCount === 7){
                setShowE0(true)
                setShowLegend(false)
                setTitle(step8titlePerfect);
                setText(step8Text1Perfect)
                setText2(step8Text2Perfect)
                setText3(step8Text3Perfect)
                setShowOnHover(false)
                setNextButtonDisabled('')
            }
        }
        if (!isPerfectMatching){
            // Step 3
            if (stepCount === 2){
                setTitle(step3title);
                setText(step3Text1)
                setText2(step3Text2Imperfect)
                setLabelSet('')
            }
            // Step 4
            if (stepCount === 3){
                setTitle(step4titleImperfect);
                setText(step4Text1Imperfect)
                setText2(step4Text2Imperfect)
            }
        }
        
        setStepCount(stepCount-1)
    }
    // document.addEventListener('keyup', function(event){
    //     if (event.key === 'ArrowLeft') {
    //         prevButton()
    //        }
    //     if (event.key === 'ArrowRight') {
    //         nextButton()
    //     }
    // })

    return (
        <div>
            <NavigationBar />
            <div className='container-fluid row'>
                    <div className='col-md-6 col-xs-12'>
                        <CreateGraph 
                        jsonData={graph} 
                        partitionEdges={partitionEdgesJSON}
                        matching={matching}
                        showLegend={showLegend}
                        showDirected={showDirectedGraph}
                        SCC={SCC}
                        showEW={showEW}
                        showE1={showE1}
                        showE0={showE0}
                        showOnHover={showOnHover}
                        labelSet={labelSet}
                        />
                    </div >
                    <div className='side-board col-md-6 col-xs-12'>
                        <h4 className='mt-4 mb-5'>{title}</h4>
                        <p className='mb-5'>
                            {text}
                        </p>
                        <p className='mb-1 pb-4'>
                            {text2}
                        </p>
                        <p className='mb-5 pb-5' style={{ fontSize : "0.9rem"}}>
                            {text3}
                        </p>
                        <Button className="btn btn-md-pink" role="button" onClick={prevButton} disabled={prevButtonDisabled}>Prev</Button>
                        <Button className="btn btn-md-pink" role="button" onClick={nextButton} disabled={nextButtonDisabled}>Next</Button>
                    </div>
                
            </div>
        </div>
    )
}

export default Algo;
