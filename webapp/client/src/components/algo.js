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
    var imperfectPartitionEdgesJSON = JSON.parse(localStorage.getItem('imperfectPartitionEdges'))
    var imperfectPerfectMatchingJSON = JSON.parse(localStorage.getItem('imperfectPerfectMatching'))
    var imperfectPerfectPartitionEdges = JSON.parse(localStorage.getItem('imperfectPerfectPartitionEdges'))
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
    var step3Text2Perfect = <p>The bipartite graph shows that all vertices in X and Y are 
                            connected with a matched edge (green line). Thus, 
                            the graph is a <b>perfect matching</b>.</p>;
    var step3Text2Imperfect = <p>The highlighter box contains an exposed vertex, the vertex that is not 
                            connected to another set by a matched edge. Thus, 
                            the graph is an <b>imperfect matching</b>.</p>;

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
    var step6Text2Perfect = <p>Every edge of the <b>strongly connected component</b> belongs to the 
                            "some maximum matching (EW)" set.</p>;
    var step6Text3Perfect = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from EW are shown as green lines.';

    // Step 7 Perfect
    var step7titlePerfect = 'Step 7: Find "all maximum matching (E1)"';
    var step7Text1Perfect = 'A bipartite graph contains at least one maximum matching M. ' +
                            '"All maximum matching (E1)" is a set of edges belonging ' +
                            'to all maximum matching.' 
    var step7Text2Perfect = <p>Every edge of the <b>matching</b> belongs to the 
                            "all maximum matching (E1)" set if it does not belong to 
                            "some maximum matching (EW)".</p>;
    var step7Text3Perfect = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from E1 are shown as green lines.';
    
    // Step 8 Perfect
    var step8titlePerfect = 'Step 8: Find "no maximum matching (E0)"';
    var step8Text1Perfect = 'A bipartite graph contains at least one maximum matching M. ' +
                            '"No maximum matching (E0)" is a set of edges belonging ' +
                            'to no maximum matching.' 
    var step8Text2Perfect = 'Every edge of the bipartite graph belongs to the ' +
                            '"no maximum matching (E0)" set if it does not belong to ' +
                            '"some maximum matching (EW)" and "all maximum matching (E1)".';
    var step8Text3Perfect = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from E0 are shown as green lines.';
    
    // Step 9 Perfect
    var step9titlePerfect = 'Step 9: Congrats! ';
    var step9Text1Perfect = 'You\'ve just partitioned the edges into three different set for a bipartite graph(X,Y,E) that has a perfect matching.' 
    var step9Text2Perfect = 'Try hovering over the legend and see the partitioned edges set!'
    var step9Text3Perfect = <div>Learn another method of edge partitioning for <a href="/graph-initialisation" className='document'>IMPERFECT MATCHING</a> by setting different number of vertices in left(X) and right(Y) vertex sets, e.g. "3" and "4". </div>

    // Step 4 Imerfect
    var step4titleImperfect = 'Step 4: Label vertices ';
    var step4Text1Imperfect = 'In an imperfect matching, vertices in X and Y set are labelled into plus(+), star(*), or u(∪).';
    var step4Text2Imperfect = <div className='pseudocode'><span style={{"color": "#af00db"}}>label</span> exposed vertices in X as plus
    <hr></hr><span style={{"color": "#af00db"}}>while</span> (there are vertices to be labelled as plus) <span style={{"color": "#af00db"}}>do</span>:
    <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in Y that is adjacent to a labelled vertex in X by an unmatched edge as plus
    <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in X that is adjacent to a labelled vertex in Y by an matched edge as plus
    <hr></hr><span style={{"color": "#af00db"}}>label</span> exposed vertices in Y as star
    <hr></hr><span style={{"color": "#af00db"}}>while</span> (there are vertices to label as star) <span style={{"color": "#af00db"}}>do</span>:
    <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in X that is adjacent to a labelled vertex in Y by an unmatched edge as star
    <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in Y that is adjacent to a labelled vertex in X by an matched edge as star
    <hr></hr><span style={{"color": "#af00db"}}>label</span> unlabelled vertices as U</div>;
    
    // Step 5 Imperfect
    var step5titleImperfect = 'Step 5: Partition vertices';
    var step5Text1Imperfect = <div>In a bipartite graph G(X, Y, E), vertices can be partitioned into the <a href="https://en.wikipedia.org/wiki/Dulmage%E2%80%93Mendelsohn_decomposition" 
    className='document'>Dulmage and Mendelsohn sets</a>.</div>
    var step5Text2Imperfect = <div>Dulmage and Mendelsohn sets
        <ul>
            <li>A<sub>x</sub> - Plus(+) labelled vertices in X set</li>
            <li>A<sub>y</sub> - Star(*) labelled vertices in Y set</li>
            <li>B<sub>x</sub> - Star(*) labelled vertices in X set</li>
            <li>B<sub>y</sub> - Plus(+) labelled vertices in Y set</li>
            <li>C<sub>x</sub> - U(∪) labelled vertices in X set</li>
            <li>C<sub>y</sub> - U(∪) labelled vertices in Y set</li>
        </ul>
    </div>;

    // Step 6 Imperfect
    var step6titleImperfect = 'Step 6: Find "no maximum matching (E0)"';
    var step6Text1Imperfect = 'A bipartite graph contains at least one maximum matching M. ' +
                            '"No maximum matching (E0)" is a set of edges belonging ' +
                            'to no maximum matching.' 
    var step6Text2Imperfect = <div>
                            In a bipartite graph G(X,Y,E), an edge from E set belongs to E0 if it also belongs to one of the following:
                            <ul>
                                <li>the cartesian product of B<sub>x</sub> and B<sub>y</sub> sets (B<sub>x</sub> × B<sub>y</sub>)</li>
                                <li>the cartesian product of B<sub>x</sub> and C<sub>y</sub> sets (B<sub>x</sub> × C<sub>y</sub>)</li>
                                <li>the cartesian product of C<sub>x</sub> and B<sub>y</sub> sets (C<sub>x</sub> × B<sub>y</sub>)</li>
                            </ul>
                            </div>;
    var step6Text3Imperfect = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from E0 are shown as green lines.';
    // Step 7 Imperfect
    var step7titleImperfect = 'Step 7: Find "some maximum matching (EW)"';
    var step7Text1Imperfect = 'A bipartite graph contains at least one maximum matching M. ' +
                            '"Some maximum matching (EW)" is a set of edges belonging ' +
                            'to at least one maximum matching but not all of them.' 
    var step7Text2Imperfect = <div>
                            In a bipartite graph G(X,Y,E), an edge from E set belongs to EW if it also belongs to one of the following:
                            <ul>
                                <li>the cartesian product of A<sub>x</sub> and B<sub>y</sub> sets (A<sub>x</sub> × B<sub>y</sub>)</li>
                                <li>the cartesian product of B<sub>x</sub> and A<sub>y</sub> sets (B<sub>x</sub> × A<sub>y</sub>)</li>
                            </ul>
                            </div>;
    var step7Text3Imperfect = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from EW are shown as green lines.';

    // Step 8 Imperfect 
    var step8titleImperfect = 'Step 8: Find "a perfect matching subgraph (G\')"';
    var step8Text1Imperfect = <div>G'(C<sub>x</sub>∪C<sub>y</sub>,E') is a subgraph of a bipartite graph G(X,Y,E) that has a perfect matching, 
                            where C<sub>x</sub> is a set that contains U(∪) labelled vertices in X set, 
                            C<sub>y</sub> is a set that contains U(∪) labelled vertices in Y set, and E' is the cardinality product of C<sub>x</sub> and C<sub>y</sub>.</div>
    var step8Text2Imperfect = 'In other words, an edge belongs to E\' if it does not belong to "no maximum matching (E0)" or "some maximum matching (EW)".';
    var step8Text3Imperfect = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from E\' are shown as green lines.';

    // Step 9 Imperfect if no E PRIME
    var step9titleImperfect1 = 'Step 9: Find "all maximum matching (E1)"';
    var step9Text1Imperfect1 = 'A bipartite graph contains at least one maximum matching M. ' +
                            '"All maximum matching (E1)" is a set of edges belonging ' +
                            'to all maximum matching.' 
    var step9Text2Imperfect1 = 'None of the edge belongs to "all maximum matching (E1)" if E\' is an empty set.';
    var step9Text3Imperfect1 = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from E1 are shown as green lines.';
    
    // Step 9 Imperfect if got E PRIME
    var step9titleImperfect2 = <div>Step 9: Plot the sub graph G'(C<sub>x</sub>∪C<sub>y</sub>,E')</div>;
    var step9Text1Imperfect2 = <div>G'(C<sub>x</sub>∪C<sub>y</sub>,E') is a sub graph of a bipartite graph G(X,Y,E) that has a perfect matching. It can be further partitioned into three edge sets: E0, EW, and E1.</div>
    var step9Text2Imperfect2 = '';
    var step9Text3Imperfect2 = 'Note: Edges from set E\' are shown as black lines; ' +
                            'Edges from matching of E\' are shown as green lines.';

    // Step 10 Imperfect if no E PRIME
    var step10titleImperfect1 = 'Step 10: Congrats! ';
    var step10Text1Imperfect1 = 'You\'ve just partitioned the edges into three different set for a bipartite graph(X,Y,E) that has an imperfect matching.' 
    var step10Text2Imperfect1 = 'Try hovering over the legend and see the partitioned edges set!'
    var step10Text3Imperfect1 = <div>Learn another method of edge partitioning for <a href="/graph-initialisation" className='document'>PERFECT MATCHING</a> by setting same number of vertices in left(X) and right(Y) vertex sets, e.g. "4" and "4". </div>


    // Step 10 Imperfect if got E PRIME
    var step10titleImperfect2 = 'Step 10: Create a directed graph from an undirected graph';
    var step10Text1Imperfect2 = 'If the edge is in the matching, the left vertex goes to the ' +
                                'right vertex. If the edge is not in the matching, the right ' +
                                'vertex goes to the left vertex.';
    var step10Text2Imperfect2 = '';

    // Step 11 Imperfect if got E PRIME
    var step11titleImperfect2 = 'Step 11: Find strongly connected components';
    var step11Text1Imperfect2 = 'A directed bipartite graph G(X, Y, E) is ' +
                            'strongly connected if every vertex is ' +
                            'reachable from every other vertex. A strongly ' +
                            'connected component of G is a maximal strongly connected subgraph of G.';
    var step11Text2Imperfect2 = <p>A <a href="https://epubs.siam.org/doi/epdf/10.1137/0201010" 
                            className='document'>Tarjan's strongly connected components 
                            algorithm</a> with a worst case running time of O(|X| + |Y| + |E|), 
                            where |X| is the number of X vertices, |Y| is the number of Y vertices, 
                            and |E| is the number of edges is used.</p>;
    var step11Text3Imperfect2 = 'Note: Edges from set E\' are shown as black lines; ' +
                            'Edges from SCC component are shown as green lines.';
    
    // Step 12 Imperfect if got E PRIME
    var step12titleImperfect2 = 'Step 12: Find "some maximum matching (EW)"';
    var step12Text1Imperfect2 = 'A bipartite graph contains at least one maximum matching M. ' +
                            '"Some maximum matching (EW)" is a set of edges belonging ' +
                            'to at least one maximum matching but not all of them.' 
    var step12Text2Imperfect2 = <p>Every edge of the <b>strongly connected component</b> belongs to the 
                            "some maximum matching (EW)" set.</p>;
    var step12Text3Imperfect2 = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from EW are shown as green lines.';

    // Step 13 Perfect
    var step13titleImperfect2 = 'Step 13: Find "all maximum matching (E1)"';
    var step13Text1Imperfect2 = 'A bipartite graph contains at least one maximum matching M. ' +
                            '"All maximum matching (E1)" is a set of edges belonging ' +
                            'to all maximum matching.' 
    var step13Text2Imperfect2 = <p>Every edge of the <b>matching</b> belongs to the 
                            "all maximum matching (E1)" set if it does not belong to 
                            "some maximum matching (EW)".</p>;
    var step13Text3Imperfect2 = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from E1 are shown as green lines.';
    
    // Step 14 Perfect
    var step14titleImperfect2 = 'Step 14: Find "no maximum matching (E0)"';
    var step14Text1Imperfect2 = 'A bipartite graph contains at least one maximum matching M. ' +
                            '"No maximum matching (E0)" is a set of edges belonging ' +
                            'to no maximum matching.' 
    var step14Text2Imperfect2 = 'Every edge of the bipartite graph belongs to the ' +
                            '"no maximum matching (E0)" set if it does not belong to ' +
                            '"some maximum matching (EW)" and "all maximum matching (E1)".';
    var step14Text3Imperfect2 = 'Note: Edges from set E are shown as black lines; ' +
                            'Edges from E0 are shown as green lines.';

    // Step 15 Imperfect if no E PRIME
    var step15titleImperfect2 = 'Step 15: Congrats! ';
    var step15Text1Imperfect2 = 'You\'ve just partitioned the edges into three different set for a bipartite graph(X,Y,E) that has an imperfect matching.' 
    var step15Text2Imperfect2 = 'Try hovering over the legend and see the partitioned edges set!'
    var step15Text3Imperfect2 = <div>Learn another method of edge partitioning for <a href="/graph-initialisation" className='document'>PERFECT MATCHING</a> by setting same number of vertices in left(X) and right(Y) vertex sets, e.g. "4" and "4". </div>

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
    const [showEprime, setShowEprime] = useState(false);
    const [showOnHover, setShowOnHover] = useState(false);
    const [labelSet, setLabelSet] = useState('');
    const [showDMLegend, setShowDMLegend] = useState(false);
    const [partitionEdges, setPartitionEdges] = useState(partitionEdgesJSON);
    const [bipartiteGraph, setBipartiteGraph] = useState(graph);
    const [showExposed, setShowExposed] = useState(false);
    
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
                setShowExposed(true)
            }
            // Step 4
            if (stepCount === 1){
                setShowExposed(false)
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
                setShowDMLegend(true)
            }
            // Step 6
            if (stepCount === 3){
                setTitle(step6titleImperfect);
                setText(step6Text1Imperfect)
                setText2(step6Text2Imperfect)
                setText3(step6Text3Imperfect)
                setPartitionEdges(imperfectPartitionEdgesJSON)
                setShowE0(true)
                setMatching('')
            }
            // Step 7
            if (stepCount === 4){
                setTitle(step7titleImperfect);
                setText(step7Text1Imperfect)
                setText2(step7Text2Imperfect)
                setText3(step7Text3Imperfect)
                setShowE0(false)
                setShowEW(true)
            }
            // Step 8
            if (stepCount === 5){
                setTitle(step8titleImperfect);
                setText(step8Text1Imperfect)
                setText2(step8Text2Imperfect)
                setText3(step8Text3Imperfect)
                setShowEW(false)
                setShowEprime(true)
            }
            
            // If prime is 0 means no need perfect algo and ends
            if (Object.keys(imperfectPartitionEdgesJSON.Eprime).length === 0){
                // Step 9
                if (stepCount === 6){
                    setTitle(step9titleImperfect1);
                    setText(step9Text1Imperfect1)
                    setText2(step9Text2Imperfect1)
                    setText3(step9Text3Imperfect1)
                    setShowEprime(false)
                    setShowE1(true)
                }
                // Step 10
                if (stepCount === 7){
                    setTitle(step10titleImperfect1);
                    setText(step10Text1Imperfect1)
                    setText2(step10Text2Imperfect1)
                    setText3(step10Text3Imperfect1)
                    setShowE1(false)
                    setShowLegend(true)
                    setShowOnHover(true)
                    setNextButtonDisabled('disabled')
                    setShowDMLegend(false)
                    setLabelSet('')
                }
            }
            else{
                // Step 9
                if (stepCount === 6){
                    setTitle(step9titleImperfect2);
                    setText(step9Text1Imperfect2)
                    setText2(step9Text2Imperfect2)
                    setText3(step9Text3Imperfect2)
                    setShowDMLegend(false)
                    setLabelSet('')
                    setShowEprime(false)
                    setBipartiteGraph(imperfectPartitionEdgesJSON.Eprime)
                    setMatching(imperfectPerfectMatchingJSON)
                }
                // Step 10
                if (stepCount === 7){
                    setTitle(step10titleImperfect2);
                    setText(step10Text1Imperfect2)
                    setText2(step10Text2Imperfect2)
                    setShowDirectedGraph(true)
                }
                // Step 11
                if (stepCount === 8){
                    setTitle(step11titleImperfect2);
                    setText(step11Text1Imperfect2)
                    setText2(step11Text2Imperfect2)
                    setText3(step11Text3Imperfect2)
                    setShowDirectedGraph(false)
                    setMatching('')
                    setSCC(SCCArray)
                }
                // Step 12
                if (stepCount === 9){
                    setTitle(step12titleImperfect2);
                    setText(step12Text1Imperfect2)
                    setText2(step12Text2Imperfect2)
                    setText3(step12Text3Imperfect2)
                    setPartitionEdges(imperfectPerfectPartitionEdges)
                    setSCC([])
                    setShowEW(true)
                }

                // Step 13
                if (stepCount === 10){
                    setTitle(step13titleImperfect2);
                    setText(step13Text1Imperfect2)
                    setText2(step13Text2Imperfect2)
                    setText3(step13Text3Imperfect2)
                    setShowEW(false)
                    setShowE1(true)
                }

                // Step 14
                if (stepCount === 11){
                    setTitle(step14titleImperfect2);
                    setText(step14Text1Imperfect2)
                    setText2(step14Text2Imperfect2)
                    setText3(step14Text3Imperfect2)
                    setShowE1(false)
                    setShowE0(true)
                }

                // Step 15
                if (stepCount === 12){
                    setTitle(step15titleImperfect2);
                    setText(step15Text1Imperfect2)
                    setText2(step15Text2Imperfect2)
                    setText3(step15Text3Imperfect2)
                    setShowE0(false)
                    setShowLegend(true)
                    setShowOnHover(true)
                    setNextButtonDisabled('disabled')
                    setBipartiteGraph(graph)
                    setPartitionEdges(partitionEdgesJSON)
                }

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
            setShowExposed(false)
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
                setShowExposed(true)
            }
            // Step 4
            if (stepCount === 3){
                setTitle(step4titleImperfect);
                setText(step4Text1Imperfect)
                setText2(step4Text2Imperfect)
                setShowDMLegend(false)
            }
            // Step 5
            if (stepCount === 4){
                setTitle(step5titleImperfect);
                setText(step5Text1Imperfect)
                setText2(step5Text2Imperfect)
                setText3(step2Text3)
                setShowE0(false)
                setMatching(graphMatching)
            }
            // Step 6
            if (stepCount === 5){
                setTitle(step6titleImperfect);
                setText(step6Text1Imperfect)
                setText2(step6Text2Imperfect)
                setText3(step6Text3Imperfect)
                setShowE0(true)
                setShowEW(false) 
            }
            // Step 7
            if (stepCount === 6){
                setTitle(step7titleImperfect);
                setText(step7Text1Imperfect)
                setText2(step7Text2Imperfect)
                setText3(step7Text3Imperfect)
                setShowEW(true)
                setShowEprime(false)
            }

            // Step 8
            if (stepCount === 7){
                setTitle(step8titleImperfect);
                setText(step8Text1Imperfect)
                setText2(step8Text2Imperfect)
                setText3(step8Text3Imperfect)
                setShowE1(false)
                setShowEprime(true)
                setShowDMLegend(true)
                setLabelSet(labelSetJSON)
                setBipartiteGraph(graph)
                setMatching('')
            }

            if (Object.keys(imperfectPartitionEdgesJSON.Eprime).length === 0){
                // Step 9
                if (stepCount === 8){
                    setTitle(step9titleImperfect1);
                    setText(step9Text1Imperfect1)
                    setText2(step9Text2Imperfect1)
                    setText3(step9Text3Imperfect1)
                    setShowLegend(false)
                    setShowOnHover(false)
                    setNextButtonDisabled('')
                }
            }
            else{
                // Step 9
                if (stepCount === 8){
                    setTitle(step9titleImperfect2);
                    setText(step9Text1Imperfect2)
                    setText2(step9Text2Imperfect2)
                    setText3(step9Text3Imperfect2)
                    setShowDirectedGraph(false)
                }
                // Step 10
                if (stepCount === 9){
                    setTitle(step10titleImperfect2);
                    setText(step10Text1Imperfect2)
                    setText2(step10Text2Imperfect2)
                    setText3(step9Text3Imperfect2)
                    setShowDirectedGraph(true)
                    setMatching(imperfectPerfectMatchingJSON)
                    setSCC([])
                }
                // Step 11
                if (stepCount === 10){
                    setTitle(step11titleImperfect2);
                    setText(step11Text1Imperfect2)
                    setText2(step11Text2Imperfect2)
                    setText3(step11Text3Imperfect2)
                    setSCC(SCCArray)
                    setPartitionEdges(imperfectPartitionEdgesJSON)
                    setShowEW(false)
                }
                // Step 12
                if (stepCount === 11){
                    setTitle(step12titleImperfect2);
                    setText(step12Text1Imperfect2)
                    setText2(step12Text2Imperfect2)
                    setText3(step12Text3Imperfect2)
                    setShowEW(true)
                    setShowE1(false)
                }
                // Step 13
                if (stepCount === 12){
                    setTitle(step13titleImperfect2);
                    setText(step13Text1Imperfect2)
                    setText2(step13Text2Imperfect2)
                    setText3(step13Text3Imperfect2)
                    setShowE1(true)
                    setShowE0(false)
                }
                // Step 14
                if (stepCount === 13){
                    setTitle(step14titleImperfect2);
                    setText(step14Text1Imperfect2)
                    setText2(step14Text2Imperfect2)
                    setText3(step14Text3Imperfect2)
                    setPartitionEdges(imperfectPerfectPartitionEdges)
                    setShowE0(true)
                    setShowLegend(false)
                    setShowOnHover(false)
                    setNextButtonDisabled('')
                    setBipartiteGraph(imperfectPartitionEdgesJSON.Eprime)
                }
                
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
                        jsonData={bipartiteGraph} 
                        partitionEdges={partitionEdges}
                        matching={matching}
                        showLegend={showLegend}
                        showDirected={showDirectedGraph}
                        SCC={SCC}
                        showEW={showEW}
                        showE1={showE1}
                        showE0={showE0}
                        showOnHover={showOnHover}
                        labelSet={labelSet}
                        showDMsets={showDMLegend}
                        showEprime={showEprime}
                        showExposed={showExposed}
                        />
                    </div >
                    <div className='side-board col-md-6 col-xs-12'>
                        <h4 className='mt-4 mb-5'>{title}</h4>
                        <div className='mb-5'>
                            {text}
                        </div>
                        <div className='mb-1 pb-4'>
                            {text2}
                        </div>
                        <p className='mb-5 pb-5' style={{ fontSize : "0.9rem"}}>
                            {text3}
                        </p>
                        <Button id="prev" className="btn btn-md-pink" role="button" onClick={prevButton} disabled={prevButtonDisabled}>Prev</Button>
                        <Button id="next" className="btn btn-md-pink" role="button" onClick={nextButton} disabled={nextButtonDisabled}>Next</Button>
                    </div>
                
            </div>
        </div>
    )
}

export default Algo;
