import React, { useState } from 'react';
import CreateGraph from './graph';
import NavigationBar from './NavigationBar';
import { Button } from 'react-bootstrap';
import "./algo.css";
import { Modal } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';


const Algo = () => {
    const [showCP, setShowCP] = useState(false);
    const handleCloseCP = () => setShowCP(false);
    const handleShowCP = () => setShowCP(true);

    const [showPopUpSCC, setShowPopUpSCC] = useState(false);
    const handleClosePopUpSCC = () => setShowPopUpSCC(false);
    const handleShowPopUpSCC = () => setShowPopUpSCC(true);
    
    var noteForMatchedLine = <p>Note: Edges from set <span style={{"color": "#e06c75"}}>E</span> are shown as black lines; Matching edges from set <span style={{"color": "#e06c75"}}>M</span> are shown as green lines.</p>;
    var noteForSCCLine = <p>Note: Edges from set <span style={{"color": "#e06c75"}}>E</span> are shown as black lines; Edges from the <span style={{"color": "#e06c75"}}>SCC component</span> are shown as green lines.</p>;
    var noteForE0Line = <p>Note: Edges from set <span style={{"color": "#e06c75"}}>E</span> are shown as black lines; Edges from <span style={{"color": "#e06c75"}}>E0</span> are shown as green lines.</p>;
    var noteForEWLine = <p>Note: Edges from set <span style={{"color": "#e06c75"}}>E</span> are shown as black lines; Edges from <span style={{"color": "#e06c75"}}>EW</span> are shown as green lines.</p>;
    var noteForE1Line = <p>Note: Edges from set <span style={{"color": "#e06c75"}}>E</span> are shown as black lines; Edges from <span style={{"color": "#e06c75"}}>E1</span> are shown as green lines.</p>;
    var noteForEPrimeLine = <p>Note: Edges from set <span style={{"color": "#e06c75"}}>E'</span> are shown as black lines; Edges from the matching of <span style={{"color": "#e06c75"}}>E'</span> are shown as green lines.</p>;
    var directedGraphText1 = <div>
                                A <b>directed graph</b> is a graph in which the edges have a direction. The direction of an edge is determined below.
                                <ul>
                                    <li>A matched edge (green line) goes from its endpoint in X set (yellow vertex) to another endpoint in Y set (blue vertex).</li>
                                    <li>An unmatched edge (black line) goes from its endpoint in Y set (blue vertex) to another endpoint in X set (yellow vertex).</li>
                                </ul>
                            </div>;
    var SCCText1 = <p>A <b>strongly connected component</b> (green lines) is a subset of the directed graph that could form a cycle (where if a vertex follows the direction of its edges, it will return back to itself). It is possible to have more than one strongly connected component. However, if a strongly connected component is a subset of a larger strongly connected component, the larger set will be chosen as the strongly connected component. Click <span className='document' onClick={handleShowPopUpSCC}>EXAMPLE</span> to learn more.</p>;
    var SCCText2 = <p>A <a href="https://epubs.siam.org/doi/epdf/10.1137/0201010" className='document'>Tarjan's strongly connected components algorithm</a> with a worst-case running time of O(|X| + |Y| + |E|), where |X| is the number of X vertices, |Y| is the number of Y vertices, and |E| is the number of edges is used.</p>; 
    var E0Text1 = <p>All of the edges from the bipartite graph that does not belong to the "<b>some maximum matching (EW)</b>" and the "<b>all maximum matching (E1)</b>" sets belong to the"<b>no maximum matching (E0)</b>" set (green lines).</p>;
    var E0Text2 = <p>"<b>No maximum matching (E0)</b>" is a set of edges (green lines) that does not exist in any of the possible maximum matchings.</p>;
    var EWText1 = <p>All strongly connected components belong to the "<b>some maximum matching (EW)</b>" set (green lines) and is a subset of all the edges in a bipartite graph.</p>;
    var EWText2 = <p>A bipartite graph can contain more than one way of generating a maximum matching (recall that this means there is a highest number of one-to-one matchings between both sets of vertices). Therefore, all edges in "<b>some maximum matching (EW)</b>" set (green lines) that we find must be at least in one of the maximum matching choices that we could generate, but not in every one of the choices as that would be part of a different set.</p>;
    var E1Text1 = <p>The remaining edges of the maximum matching set that does not belong to the "<b>some maximum matching (EW)</b>" set belong to the "<b>all maximum matching (E1)</b>" set (green lines).</p>;
    var E1Text2 = <p>A bipartite graph sometimes contains more than one but at least one maximum matching. The "<b>all maximum matching (E1)</b>" is a set of edges (green lines) that exists in all of the possible maximum matchings.</p>;
    var learnPerfectMatchingText = <p>Learn another method of edge partitioning for <a href="/graph-initialisation" className='document'>PERFECT MATCHING</a> by setting the same number of vertices in left(X) and right(Y) vertex sets, e.g. "4" and "4". </p>;
    // Step 2
    var step2title = 'Step 2: Finding maximum matching';
    var step2Text1 = <p>A <b>matching</b> is a one-to-one relationship between two sets of vertices (yellow and blue), where a vertex (yellow) is connected to exactly one other vertex (blue) by an edge (green). A <b>maximum matching</b> is the highest number of one-to-one matchings (green edges) that could occur in the two sets of vertices.</p>;
    var step2Text2 = <p>In order to find the <b>maximum matching</b>, a <a href="https://epubs.siam.org/doi/epdf/10.1137/0202019" className='document'>Hopcroft-Karp algorithm</a> with a worst-case running time of O(n^1/2m) is used.</p>;
    var step2Text3 = noteForMatchedLine;

    // Step 3
    var step3title = 'Step 3: Check if the maximum matching is perfect or imperfect';
    var step3Text1 = <p>A vertex of a set (e.g. yellow set) is <b>matched</b> if it is connected with a vertex of another set (e.g. blue set) by a matched edge (green); otherwise, it is <b>exposed</b>. The maximum matching is <b>perfect</b> if all the vertices are matched; otherwise, it is <b>imperfect</b>.</p>;
    // Step 3 Perfect
    var step3titlePerfect = step3title;
    var step3Text1Perfect = step3Text1;
    var step3Text2Perfect = <p>The bipartite graph shows that all vertices in set X (all yellow vertices) and set Y (all blue vertices) are connected with a matched edge (green). Thus, the bipartite graph contains a <b>perfect maximum matching</b>.</p>;
    var step3Text3Perfect = noteForMatchedLine;
    // Step 3 Imperfect 
    var step3titleImperfect = step3title;
    var step3Text1Imperfect = step3Text1;
    var step3Text2Imperfect = <p>The exposed vertices are shown with a box; these vertices are not connected with a vertex of another set by a matched edge (green). Thus, the bipartite graph contains an <b>imperfect maximum matching</b>.</p>;
    var step3Text3Imperfect = noteForMatchedLine;

    // Step 4 Perfect
    var step4titlePerfect = 'Step 4: Create a directed graph from an undirected graph';
    var step4Text1Perfect = directedGraphText1;
    var step4Text2Perfect = '';
    var step4Text3Perfect = noteForMatchedLine;
    // Step 4 Imperfect
    var step4titleImperfect = 'Step 4: Label vertices ';
    var step4Text1Imperfect = <p>In an imperfect maximum matching, vertices in the set X (yellow) and set Y (blue) can be labelled into <b>plus(+)</b>, <b>star(*)</b>, or <b>u(∪)</b>.</p>;
    var step4Text2Imperfect = <div className='pseudocode'>
                                <span style={{"color": "#af00db"}}>label</span> exposed vertices in X as <b>plus</b>
                                <hr></hr><span style={{"color": "#af00db"}}>while</span> (there are vertices to be labelled as <b>plus</b>) <span style={{"color": "#af00db"}}>do</span>:
                                <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in Y that is adjacent to a labelled vertex in X by an unmatched edge as <b>plus</b>
                                <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in X that is adjacent to a labelled vertex in Y by an matched edge as <b>plus</b>
                                <hr></hr><span style={{"color": "#af00db"}}>label</span> exposed vertices in Y as <b>star</b>
                                <hr></hr><span style={{"color": "#af00db"}}>while</span> (there are vertices to label as <b>star</b>) <span style={{"color": "#af00db"}}>do</span>:
                                <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in X that is adjacent to a labelled vertex in Y by an unmatched edge as <b>star</b>
                                <hr></hr>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color": "#af00db"}}>label</span> unlabelled vertices in Y that is adjacent to a labelled vertex in X by an matched edge as <b>star</b>
                                <hr></hr><span style={{"color": "#af00db"}}>label</span> unlabelled vertices as <b>U</b>
                            </div>;
    var step4Text3Imperfect = noteForMatchedLine;

    // Step 5 Perfect
    var step5titlePerfect = 'Step 5: Find strongly connected components';
    var step5Text1Perfect = SCCText1;
    var step5Text2Perfect = SCCText2;
    var step5Text3Perfect = noteForSCCLine;
    // Step 5 Imperfect
    var step5titleImperfect = 'Step 5: Partition vertices';
    var step5Text1Imperfect = <p>In a bipartite graph G(X, Y, E), labelled vertices in X (left) and Y (right) sets can be partitioned into the <a href="https://en.wikipedia.org/wiki/Dulmage%E2%80%93Mendelsohn_decomposition" className='document'>Dulmage and Mendelsohn sets</a>.</p>;
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
    var step5Text3Imperfect = noteForMatchedLine;
                
    // Step 6 Perfect
    var step6titlePerfect = 'Step 6: Find "some maximum matching (EW)"';
    var step6Text1Perfect = EWText1;
    var step6Text2Perfect = EWText2;
    var step6Text3Perfect = noteForEWLine;
    // Step 6 Imperfect
    var step6titleImperfect = 'Step 6: Find "no maximum matching (E0)"';
    var step6Text1Imperfect = <div>
                                In a bipartite graph G(X, Y, E), an edge from the E set belongs to the "<b>no maximum matching (E0)</b>" set (green lines) if it also belongs to one of the following:
                                <ul>
                                    <li>the <span className='document' onClick={handleShowCP}>cartesian product</span> of B<sub>x</sub> and B<sub>y</sub> sets (B<sub>x</sub> × B<sub>y</sub>)</li>
                                    <li>the cartesian product of B<sub>x</sub> and C<sub>y</sub> sets (B<sub>x</sub> × C<sub>y</sub>)</li>
                                    <li>the cartesian product of C<sub>x</sub> and B<sub>y</sub> sets (C<sub>x</sub> × B<sub>y</sub>)</li>
                                </ul>
                            </div>;
    var step6Text2Imperfect = <p>A bipartite graph can contain more than one way of generating a maximum matching (recall that this means there is a highest number of one-to-one matchings between both sets of vertices). Therefore, the "<b>no maximum matching set (E0)</b>" (green lines) is a set of edges where each edge does not exist in any of the maximum matching choices that we could generate.</p>;
    var step6Text3Imperfect = noteForE0Line;

    // Step 7 Perfect
    var step7titlePerfect = 'Step 7: Find "all maximum matching (E1)"';
    var step7Text1Perfect = E1Text1;
    var step7Text2Perfect = E1Text2;
    var step7Text3Perfect = noteForE1Line;
    // Step 7 Imperfect
    var step7titleImperfect = 'Step 7: Find "some maximum matching (EW)"';
    var step7Text1Imperfect = <div>
                                In a bipartite graph G(X, Y, E), an edge from the E set belongs to the "<b>some maximum matching (EW)</b>" set (green lines) if it also belongs to one of the following:
                                <ul>
                                    <li>the <span className='document' onClick={handleShowCP}>cartesian product</span> of A<sub>x</sub> and B<sub>y</sub> sets (A<sub>x</sub> × B<sub>y</sub>)</li>
                                    <li>the cartesian product of B<sub>x</sub> and A<sub>y</sub> sets (B<sub>x</sub> × A<sub>y</sub>)</li>
                                </ul>
                            </div>;
    var step7Text2Imperfect = <p>A bipartite graph sometimes contains more than one but at least one maximum matching. Therefore, all edges in "<b>some maximum matching (EW)</b>" set (green lines) that we find must be at least in one of the maximum matching choices that we could generate, but not in every one of the choices as that would be part of a different set.</p>;
    var step7Text3Imperfect = noteForEWLine;

    // Step 8 Perfect
    var step8titlePerfect = 'Step 8: Find "no maximum matching (E0)"';
    var step8Text1Perfect = E0Text1;
    var step8Text2Perfect = E0Text2;
    var step8Text3Perfect = noteForE0Line;
    // Step 8 Imperfect 
    var step8titleImperfect = <p>Step 8: Find a subgraph G'(C<sub>x</sub>∪C<sub>y</sub>, E')</p>;
    var step8Text1Imperfect = <p>G'(C<sub>x</sub>∪C<sub>y</sub>, E') is a subgraph of a bipartite graph G(X, Y, E), where C<sub>x</sub> is a set that contains U(∪) labelled vertices in X set, C<sub>y</sub> is a set that contains U(∪) labelled vertices in Y set, and E' is the cartesian product of C<sub>x</sub> and C<sub>y</sub>.</p>;
    var step8Text2Imperfect = <p>In other words, all of the edges from the bipartite graph that do not belong to "<b>no maximum matching (E0)</b>" and "<b>some maximum matching (EW)</b>" sets belong to the <b>E'</b> set (green lines).</p>;
    var step8Text3Imperfect = <p>Note: Edges from set <span style={{"color": "#e06c75"}}>E</span> are shown as black lines; Edges from <span style={{"color": "#e06c75"}}>E'</span> are shown as green lines.</p>;

    // Step 9 Perfect
    var step9titlePerfect = 'Step 9: Congrats! ';
    var step9Text1Perfect = <p>You've just partitioned the edges of a bipartite graph, which contains a perfect maximum matching into three different sets: <b>E0</b>, <b>EW</b>, <b>E1</b>.</p>;
    var step9Text2Perfect = <p>Try hovering over the legend and see the partitioned edges set!</p>;
    var step9Text3Perfect = <p>Learn another method of edge partitioning, <a href="/graph-initialisation" className='document'>IMPERFECT MATCHING</a> by setting a different number of vertices in left(X) and right(Y) vertex sets, e.g. "3" and "4". </p>;
    // Step 9 Imperfect if no E PRIME
    var step9titleImperfect1 = 'Step 9: Find "all maximum matching (E1)"';
    var step9Text1Imperfect1 = <p>None of the edges belongs to the "all maximum matching (E1)" set if <b>E'</b> is an empty set.</p>;
    var step9Text2Imperfect1 = <p>The "<b>all maximum matching (E1)</b>" (green lines) is a set of edges that exists in all of the possible maximum matchings.</p>;
    var step9Text3Imperfect1 = noteForEPrimeLine;
    // Step 9 Imperfect if got E PRIME
    var step9titleImperfect2 = <p>Step 9: Plot the sub graph G'(C<sub>x</sub>∪C<sub>y</sub>, E')</p>;
    var step9Text1Imperfect2 = <p>G'(C<sub>x</sub>∪C<sub>y</sub>, E') contains a perfect maximum matching (green lines). It can be further partitioned into three edge sets: <b>E0</b>, <b>EW</b>, <b>E1</b>.</p>;
    var step9Text2Imperfect2 = '';
    var step9Text3Imperfect2 = noteForEPrimeLine;

    // Step 10 Imperfect if no E PRIME
    var step10titleImperfect1 = 'Step 10: Congrats! ';
    var step10Text1Imperfect1 = <p>You've just partitioned the edges of a bipartite graph, which contains an imperfect maximum matching into three different sets: <b>E0</b>, <b>EW</b>, <b>E1</b>.</p>;
    var step10Text2Imperfect1 = <p>Try hovering over the legend and see the partitioned edges set!</p>
    var step10Text3Imperfect1 = learnPerfectMatchingText;
    // Step 10 Imperfect if got E PRIME
    var step10titleImperfect2 = 'Step 10: Create a directed graph from an undirected graph';
    var step10Text1Imperfect2 = directedGraphText1;
    var step10Text2Imperfect2 = '';
    var step10Text3Imperfect2 = noteForEPrimeLine;

    // Step 11 Imperfect if got E PRIME
    var step11titleImperfect2 = 'Step 11: Find strongly connected components';
    var step11Text1Imperfect2 = SCCText1;
    var step11Text2Imperfect2 = SCCText2;
    var step11Text3Imperfect2 = <p>Note: Edges from set <span style={{"color": "#e06c75"}}>E'</span> are shown as black lines; Edges from the <span style={{"color": "#e06c75"}}>SCC component</span> are shown as green lines.</p>
    
    // Step 12 Imperfect if got E PRIME
    var step12titleImperfect2 = 'Step 12: Find "some maximum matching (EW)"';
    var step12Text1Imperfect2 = EWText1;
    var step12Text2Imperfect2 = EWText2;
    var step12Text3Imperfect2 = <p>Note: Edges from set <span style={{"color": "#e06c75"}}>E'</span> are shown as black lines; Edges from <span style={{"color": "#e06c75"}}>EW</span> are shown as green lines.</p>

    // Step 13 Imperfect if got E PRIME
    var step13titleImperfect2 = 'Step 13: Find "all maximum matching (E1)"';
    var step13Text1Imperfect2 = E1Text1;
    var step13Text2Imperfect2 = E1Text2;
    var step13Text3Imperfect2 = <p>Note: Edges from set <span style={{"color": "#e06c75"}}>E'</span> are shown as black lines; Edges from <span style={{"color": "#e06c75"}}>E1</span> are shown as green lines.</p>
    
    // Step 14 Imperfect if got E PRIME
    var step14titleImperfect2 = 'Step 14: Find "no maximum matching (E0)"';
    var step14Text1Imperfect2 = E0Text1;
    var step14Text2Imperfect2 = E0Text2;
    var step14Text3Imperfect2 = <p>Note: Edges from set <span style={{"color": "#e06c75"}}>E'</span> are shown as black lines; Edges from <span style={{"color": "#e06c75"}}>E0</span> are shown as green lines.</p>

    // Step 15 Imperfect if got E PRIME
    var step15titleImperfect2 = 'Step 15: Congrats! ';
    var step15Text1Imperfect2 = <p>The partitioned set E0 and EW in steps 6 and 7 were concatenated with the partitioned set E0 and EW in the subgraph G'(Cx∪Cy, E')</p>
    var step15Text2Imperfect2 = <p>You've just partitioned the edges of a bipartite graph, which contains a perfect maximum matching into three different sets: <b>E0</b>, <b>EW</b>, <b>E1</b>. Try hovering over the legend and see the partitioned edges set!</p>
    var step15Text3Imperfect2 = learnPerfectMatchingText;

    // Get the details of the graph from the local storage
    // A bipartite graph represented in JSON
    var graphJSON = JSON.parse(localStorage.getItem('graph'));
    // A maximum matching of the bipartite graph
    var maxMatchingJSON = JSON.parse(localStorage.getItem('matching'));
    // A boolean to check whether the maximum matching is perfect or not
    var isPerfectMaxMatchingJSON = JSON.parse(localStorage.getItem('isPerfect'));
    // A strongly connected component, it consists of vertices
    var SCCJSON = JSON.parse(localStorage.getItem('SCC'));
    // Three sets of partitioned edges (EW, E0, E1) 
    var partitionSetsJSON = JSON.parse(localStorage.getItem('partitionEdges'));
    // Three sets of labelled vertices (U, *, +), only for imperfect max matching
    var labelSetsJSON = JSON.parse(localStorage.getItem('labelSet'));
    // Three sets of partitioned edges (EW, E0, E1) only for imperfect max matching
    var imperfectPartitionSetsJSON = JSON.parse(localStorage.getItem('imperfectPartitionEdges'));
    // A maximum matching of a perfect max matching in a imperfect max matching
    var imperfectPerfectMaxMatchingJSON = JSON.parse(localStorage.getItem('imperfectPerfectMatching'));
    // Three sets of partitioned edges of a perfect max matching in a imperfect max matching
    var imperfectPerfectPartitionSetsJSON = JSON.parse(localStorage.getItem('imperfectPerfectPartitionEdges'));

    const [stepCount, setStepCount] = useState(2);
    const [prevButtonDisabled, setPrevButtonDisabled] = useState('disabled');
    const [nextButtonDisabled, setNextButtonDisabled] = useState('');

    const [graph, setGraph] = useState(graphJSON);
    const [maxMatching, setMaxMatching] = useState(maxMatchingJSON);
    const [title, setTitle] = useState(step2title);
    const [text1, setText1] = useState(step2Text1);
    const [text2, setText2] = useState(step2Text2);
    const [text3, setText3] = useState(step2Text3);
    const [SCC, setSCC] = useState([]);
    const [labelSets, setLabelSets] = useState('');
    const [partitionSets, setPartitionSets] = useState(partitionSetsJSON);
    const [showMaxMatching, setShowMaxMatching] = useState(true);
    const [showE0, setShowE0] = useState(false);
    const [showEW, setShowEW] = useState(false);
    const [showE1, setShowE1] = useState(false);
    const [showEprime, setShowEprime] = useState(false);
    const [showExposed, setShowExposed] = useState(false);
    const [showDirectedGraph, setShowDirectedGraph] = useState(false);
    const [showOnHover, setShowOnHover] = useState(false);
    const [showPartitionSetsLegend, setShowPartitionSetsLegend] = useState(false);
    const [showDMSetsLegend, setShowDMSetsLegend] = useState(false);
    
    const changeStep = (stepCount) => {
        // Step 2
        if (stepCount === 2){
            // Disable previous button
            setPrevButtonDisabled('disabled');
            setGraph(graphJSON);
            setMaxMatching(maxMatchingJSON);
            setTitle(step2title);
            setText1(step2Text1);
            setText2(step2Text2);
            setText3(step2Text3);
            setSCC([]);
            setLabelSets('');
            setPartitionSets(partitionSetsJSON);
            setShowMaxMatching(true);
            setShowE0(false);
            setShowEW(false);
            setShowE1(false);
            setShowEprime(false);
            setShowExposed(false);
            setShowDirectedGraph(false);
            setShowOnHover(false);
            setShowPartitionSetsLegend(false);
            setShowDMSetsLegend(false);
        }
        // Step 3
        if (stepCount === 3){
            // Show the prev button
            setPrevButtonDisabled('');
            // Perfect
            if (isPerfectMaxMatchingJSON){
                setNextButtonDisabled('');
                setTitle(step3titlePerfect);
                setText1(step3Text1Perfect);
                setText2(step3Text2Perfect);
                setText3(step3Text3Perfect);
                setSCC([]);
                setShowMaxMatching(true);
                setShowE0(false);
                setShowEW(false);
                setShowE1(false);
                setShowDirectedGraph(false);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
            }
            // Imperfect
            else{
                setGraph(graphJSON);
                setMaxMatching(maxMatchingJSON);
                setTitle(step3titleImperfect);
                setText1(step3Text1Imperfect);
                setText2(step3Text2Imperfect);
                setText3(step3Text3Imperfect);
                setSCC([]);
                setLabelSets('');
                setPartitionSets(imperfectPartitionSetsJSON);
                setShowMaxMatching(true);
                setShowE0(false);
                setShowEW(false);
                setShowE1(false);
                setShowEprime(false);
                setShowExposed(true);
                setShowDirectedGraph(false);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
                setShowDMSetsLegend(false);
            }
        }

        // Step 4
        if (stepCount === 4){
            // Perfect
            if (isPerfectMaxMatchingJSON){
                setNextButtonDisabled('');
                setTitle(step4titlePerfect);
                setText1(step4Text1Perfect);
                setText2(step4Text2Perfect);
                setText3(step4Text3Perfect);
                setSCC([]);
                setShowMaxMatching(true);
                setShowE0(false);
                setShowEW(false);
                setShowE1(false);
                setShowDirectedGraph(true);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
            }
            // Imperfect
            else{
                setGraph(graphJSON);
                setMaxMatching(maxMatchingJSON);
                setTitle(step4titleImperfect);
                setText1(step4Text1Imperfect);
                setText2(step4Text2Imperfect);
                setText3(step4Text3Imperfect);
                setSCC([]);
                setLabelSets(labelSetsJSON);
                setPartitionSets(imperfectPartitionSetsJSON);
                setShowMaxMatching(true);
                setShowE0(false);
                setShowEW(false);
                setShowE1(false);
                setShowEprime(false);
                setShowExposed(false);
                setShowDirectedGraph(false);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
                setShowDMSetsLegend(false);
            }
        }

        // Step 5
        if (stepCount === 5){
            // Perfect
            if (isPerfectMaxMatchingJSON){
                setNextButtonDisabled('');
                setTitle(step5titlePerfect);
                setText1(step5Text1Perfect);
                setText2(step5Text2Perfect);
                setText3(step5Text3Perfect);
                setSCC(SCCJSON);
                setShowMaxMatching(false);
                setShowE0(false);
                setShowEW(false);
                setShowE1(false);
                setShowDirectedGraph(false);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
            }
            // Imperfect
            else{
                setGraph(graphJSON);
                setMaxMatching(maxMatchingJSON);
                setTitle(step5titleImperfect);
                setText1(step5Text1Imperfect);
                setText2(step5Text2Imperfect);
                setText3(step5Text3Imperfect);
                setSCC([]);
                setLabelSets(labelSetsJSON);
                setPartitionSets(imperfectPartitionSetsJSON);
                setShowMaxMatching(true);
                setShowE0(false);
                setShowEW(false);
                setShowE1(false);
                setShowEprime(false);
                setShowExposed(false);
                setShowDirectedGraph(false);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
                setShowDMSetsLegend(true);
            }
        }

        // Step 6
        if (stepCount === 6){
            // Perfect
            if (isPerfectMaxMatchingJSON){
                setNextButtonDisabled('');
                setTitle(step6titlePerfect);
                setText1(step6Text1Perfect);
                setText2(step6Text2Perfect);
                setText3(step6Text3Perfect);
                setSCC([]);
                setShowMaxMatching(false);
                setShowE0(false);
                setShowEW(true);
                setShowE1(false);
                setShowDirectedGraph(false);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
            }
            // Imperfect
            else{
                setGraph(graphJSON);
                setMaxMatching(maxMatchingJSON);
                setTitle(step6titleImperfect);
                setText1(step6Text1Imperfect);
                setText2(step6Text2Imperfect);
                setText3(step6Text3Imperfect);
                setSCC([]);
                setLabelSets(labelSetsJSON);
                setPartitionSets(imperfectPartitionSetsJSON);
                setShowMaxMatching(false);
                setShowE0(true);
                setShowEW(false);
                setShowE1(false);
                setShowEprime(false);
                setShowExposed(false);
                setShowDirectedGraph(false);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
                setShowDMSetsLegend(true);
            }
        }

        // Step 7
        if (stepCount === 7){
            // Perfect
            if (isPerfectMaxMatchingJSON){
                setNextButtonDisabled('');
                setTitle(step7titlePerfect);
                setText1(step7Text1Perfect);
                setText2(step7Text2Perfect);
                setText3(step7Text3Perfect);
                setSCC([]);
                setShowMaxMatching(false);
                setShowE0(false);
                setShowEW(false);
                setShowE1(true);
                setShowDirectedGraph(false);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
            }
            // Imperfect
            else{
                setGraph(graphJSON);
                setMaxMatching(maxMatchingJSON);
                setTitle(step7titleImperfect);
                setText1(step7Text1Imperfect);
                setText2(step7Text2Imperfect);
                setText3(step7Text3Imperfect);
                setSCC([]);
                setLabelSets(labelSetsJSON);
                setPartitionSets(imperfectPartitionSetsJSON);
                setShowMaxMatching(false);
                setShowE0(false);
                setShowEW(true);
                setShowE1(false);
                setShowEprime(false);
                setShowExposed(false);
                setShowDirectedGraph(false);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
                setShowDMSetsLegend(true);
            }
        }

        // Step 8
        if (stepCount === 8){
            // Perfect
            if (isPerfectMaxMatchingJSON){
                setNextButtonDisabled('');
                setTitle(step8titlePerfect);
                setText1(step8Text1Perfect);
                setText2(step8Text2Perfect);
                setText3(step8Text3Perfect);
                setSCC([]);
                setShowMaxMatching(false);
                setShowE0(true);
                setShowEW(false);
                setShowE1(false);
                setShowDirectedGraph(false);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
            }
            // Imperfect
            else{
                setGraph(graphJSON);
                setMaxMatching(maxMatchingJSON);
                setTitle(step8titleImperfect);
                setText1(step8Text1Imperfect);
                setText2(step8Text2Imperfect);
                setText3(step8Text3Imperfect);
                setSCC([]);
                setLabelSets(labelSetsJSON);
                setPartitionSets(imperfectPartitionSetsJSON);
                setShowMaxMatching(false);
                setShowE0(false);
                setShowEW(false);
                setShowE1(false);
                setShowEprime(true);
                setShowExposed(false);
                setShowDirectedGraph(false);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
                setShowDMSetsLegend(true);
            }
        }

        // Step 9
        if (stepCount === 9){
            // Perfect
            if (isPerfectMaxMatchingJSON){
                setNextButtonDisabled('disabled');
                setTitle(step9titlePerfect);
                setText1(step9Text1Perfect);
                setText2(step9Text2Perfect);
                setText3(step9Text3Perfect);
                setSCC([]);
                setShowMaxMatching(false);
                setShowE0(false);
                setShowEW(false);
                setShowE1(false);
                setShowDirectedGraph(false);
                setShowOnHover(true);
                setShowPartitionSetsLegend(true);
            }
            // Imperfect
            else{
                // If e prime is empty 
                if (Object.keys(imperfectPartitionSetsJSON.Eprime).length === 0){
                    setNextButtonDisabled('')
                    setGraph(graphJSON);
                    setMaxMatching(maxMatchingJSON);
                    setTitle(step9titleImperfect1);
                    setText1(step9Text1Imperfect1);
                    setText2(step9Text2Imperfect1);
                    setText3(step9Text3Imperfect1);
                    setSCC([]);
                    setLabelSets('');
                    setPartitionSets(imperfectPartitionSetsJSON);
                    setShowMaxMatching(false);
                    setShowE0(false);
                    setShowEW(false);
                    setShowE1(true);
                    setShowEprime(false);
                    setShowExposed(false);
                    setShowDirectedGraph(false);
                    setShowOnHover(false);
                    setShowPartitionSetsLegend(false);
                    setShowDMSetsLegend(false);
                }
                else{
                    setGraph(imperfectPartitionSetsJSON.Eprime);
                    setMaxMatching(imperfectPerfectMaxMatchingJSON);
                    setTitle(step9titleImperfect2);
                    setText1(step9Text1Imperfect2);
                    setText2(step9Text2Imperfect2);
                    setText3(step9Text3Imperfect2);
                    setSCC([]);
                    setLabelSets('');
                    setPartitionSets(imperfectPerfectPartitionSetsJSON);
                    setShowMaxMatching(true);
                    setShowE0(false);
                    setShowEW(false);
                    setShowE1(false);
                    setShowEprime(false);
                    setShowExposed(false);
                    setShowDirectedGraph(false);
                    setShowOnHover(false);
                    setShowPartitionSetsLegend(false);
                    setShowDMSetsLegend(false);
                }
            }

        }

        // Step 10
        if (stepCount === 10){
            // If prime is 0 means no need perfect algo and ends
            if (Object.keys(imperfectPartitionSetsJSON.Eprime).length === 0){
                setNextButtonDisabled('disabled')
                setGraph(graphJSON);
                setMaxMatching(maxMatchingJSON);
                setTitle(step10titleImperfect1);
                setText1(step10Text1Imperfect1);
                setText2(step10Text2Imperfect1);
                setText3(step10Text3Imperfect1);
                setSCC([]);
                setLabelSets('');
                setPartitionSets(imperfectPartitionSetsJSON);
                setShowMaxMatching(false);
                setShowE0(false);
                setShowEW(false);
                setShowE1(false);
                setShowEprime(false);
                setShowExposed(false);
                setShowDirectedGraph(false);
                setShowOnHover(true);
                setShowPartitionSetsLegend(true);
                setShowDMSetsLegend(false);
            }
            else{
                setGraph(imperfectPartitionSetsJSON.Eprime);
                setMaxMatching(imperfectPerfectMaxMatchingJSON);
                setTitle(step10titleImperfect2);
                setText1(step10Text1Imperfect2);
                setText2(step10Text2Imperfect2);
                setText3(step10Text3Imperfect2);
                setSCC([]);
                setLabelSets('');
                setPartitionSets(imperfectPerfectPartitionSetsJSON);
                setShowMaxMatching(true);
                setShowE0(false);
                setShowEW(false);
                setShowE1(false);
                setShowEprime(false);
                setShowExposed(false);
                setShowDirectedGraph(true);
                setShowOnHover(false);
                setShowPartitionSetsLegend(false);
                setShowDMSetsLegend(false);
            }  
        }

        // Step 11
        if (stepCount === 11){
            setGraph(imperfectPartitionSetsJSON.Eprime);
            setMaxMatching(imperfectPerfectMaxMatchingJSON);
            setTitle(step11titleImperfect2);
            setText1(step11Text1Imperfect2);
            setText2(step11Text2Imperfect2);
            setText3(step11Text3Imperfect2);
            setSCC([SCCJSON]);
            setLabelSets('');
            setPartitionSets(imperfectPerfectPartitionSetsJSON);
            setShowMaxMatching(false);
            setShowE0(false);
            setShowEW(false);
            setShowE1(false);
            setShowEprime(false);
            setShowExposed(false);
            setShowDirectedGraph(false);
            setShowOnHover(false);
            setShowPartitionSetsLegend(false);
            setShowDMSetsLegend(false);
        }
        // Step 12
        if (stepCount === 12){
            setGraph(imperfectPartitionSetsJSON.Eprime);
            setMaxMatching(imperfectPerfectMaxMatchingJSON);
            setTitle(step12titleImperfect2);
            setText1(step12Text1Imperfect2);
            setText2(step12Text2Imperfect2);
            setText3(step12Text3Imperfect2);
            setSCC([]);
            setLabelSets('');
            setPartitionSets(imperfectPerfectPartitionSetsJSON);
            setShowMaxMatching(false);
            setShowE0(false);
            setShowEW(true);
            setShowE1(false);
            setShowEprime(false);
            setShowExposed(false);
            setShowDirectedGraph(false);
            setShowOnHover(false);
            setShowPartitionSetsLegend(false);
            setShowDMSetsLegend(false);
        }

        // Step 13
        if (stepCount === 13){
            setGraph(imperfectPartitionSetsJSON.Eprime);
            setMaxMatching(imperfectPerfectMaxMatchingJSON);
            setTitle(step13titleImperfect2);
            setText1(step13Text1Imperfect2);
            setText2(step13Text2Imperfect2);
            setText3(step13Text3Imperfect2);
            setSCC([]);
            setLabelSets('');
            setPartitionSets(imperfectPerfectPartitionSetsJSON);
            setShowMaxMatching(false);
            setShowE0(false);
            setShowEW(false);
            setShowE1(true);
            setShowEprime(false);
            setShowExposed(false);
            setShowDirectedGraph(false);
            setShowOnHover(false);
            setShowPartitionSetsLegend(false);
            setShowDMSetsLegend(false);
        }

        // Step 14
        if (stepCount === 14){
            setNextButtonDisabled('')
            setGraph(imperfectPartitionSetsJSON.Eprime);
            setMaxMatching(imperfectPerfectMaxMatchingJSON);
            setTitle(step14titleImperfect2);
            setText1(step14Text1Imperfect2);
            setText2(step14Text2Imperfect2);
            setText3(step14Text3Imperfect2);
            setSCC([]);
            setLabelSets('');
            setPartitionSets(imperfectPerfectPartitionSetsJSON);
            setShowMaxMatching(false);
            setShowE0(true);
            setShowEW(false);
            setShowE1(false);
            setShowEprime(false);
            setShowExposed(false);
            setShowDirectedGraph(false);
            setShowOnHover(false);
            setShowPartitionSetsLegend(false);
            setShowDMSetsLegend(false);
        }

        // Step 15
        if (stepCount === 15){
            setNextButtonDisabled('disabled')
            setGraph(graphJSON);
            setMaxMatching(imperfectPerfectMaxMatchingJSON);
            setTitle(step15titleImperfect2);
            setText1(step15Text1Imperfect2);
            setText2(step15Text2Imperfect2);
            setText3(step15Text3Imperfect2);
            setSCC([]);
            setLabelSets('');
            setPartitionSets(partitionSetsJSON);
            setShowMaxMatching(false);
            setShowE0(false);
            setShowEW(false);
            setShowE1(false);
            setShowEprime(false);
            setShowExposed(false);
            setShowDirectedGraph(false);
            setShowOnHover(true);
            setShowPartitionSetsLegend(true);
            setShowDMSetsLegend(false);
        }
    }
    const nextButton = () => {
        changeStep(stepCount+1)
        setStepCount(stepCount+1)
    }
        

    const prevButton = () => {
        changeStep(stepCount-1)
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
            <div style={{position:'relative'}}>
                <div className='container-fluid row' style={{position:'absolute', zIndex:'-1'}}>
                    <div className='col-md-6 col-xs-12'>
                        <CreateGraph 
                        graph={graph} 
                        partitionSets={partitionSets}
                        maxMatching={maxMatching}
                        showMaxMatching={showMaxMatching}
                        showPartitionSetsLegend={showPartitionSetsLegend}
                        showDirectedGraph={showDirectedGraph}
                        SCC={SCC}
                        showEW={showEW}
                        showE1={showE1}
                        showE0={showE0}
                        showOnHover={showOnHover}
                        labelSets={labelSets}
                        showDMSetsLegend={showDMSetsLegend}
                        showEprime={showEprime}
                        showExposed={showExposed}
                        />
                    </div >
                    <div className='side-board col-md-6 col-xs-12'>
                        <h4 className='mt-4 mb-5'>{title}</h4>
                        <div className='mb-5'>
                            {text1}
                        </div>
                        <div className='mb-1 pb-4'>
                            {text2}
                        </div>
                        <div className='mb-5 pb-5' style={{ fontSize : "0.9rem"}}>
                            {text3}
                        </div>
                        <Button id="prev" className="btn btn-md-pink" role="button" onClick={prevButton} disabled={prevButtonDisabled}>Prev</Button>
                        <Button id="next" className="btn btn-md-pink" role="button" onClick={nextButton} disabled={nextButtonDisabled}>Next</Button>
                    </div>
                </div>
                <div>
                    <Modal show={showCP} onHide={handleCloseCP} aria-labelledby="contained-modal-title-vcenter" centered className='mb-5'>
                        <Modal.Header closeButton>
                        <Modal.Title>Cartesian Product Definition</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container className="show-grid">
                            <Row>
                                <Col xs={12} className='mb-5'>
                                A cartesian product of a vertex set (e.g. yellow) and another vertex set (e.g. blue) is defined as a set that consists of the possible edges between two sets of vertices.
                                </Col>
                                <Col xs={12} className='align-middle'>
                                <img src="/CartesianProduct.png" alt="Cartesian Product" className='picture'></img>
                                </Col>
                                <Col xs={12}>
                                <p>In the bipartite graph above, the left vertex set consists of &#123;A, B, C&#125; and the right vertex set consists of &#123;1, 2, 3&#125;. The cartesian product of the left and right vertex set is a set of possible edges, &#123;(A, 2), (B, 1), (C, 2), (C, 3)&#125;.</p>
                                </Col>
                            </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCP}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showPopUpSCC} onHide={handleClosePopUpSCC} aria-labelledby="contained-modal-title-vcenter" centered className='mb-5'>
                        <Modal.Header closeButton>
                        <Modal.Title>Strongly connected component</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container className="show-grid">
                            <Row>
                                <Col xs={12} className='mb-5'>
                                A strongly connected component is a subgraph of a bipartite graph in which each vertex is reachable from other vertices.
                                </Col>
                                <Col xs={12} className='align-middle'>
                                <img src="/SCCMatching.png" alt="Bipartite Graph" className='picture'></img>
                                </Col>
                                <Col xs={12} className='mb-5'>
                                The above shows a directed bipartite graph with a maximum matching (green lines).
                                </Col>
                                <Col xs={12} className='align-middle'>
                                <img src="/SCCGraph.png" alt="SCC graph" className='picture'></img>
                                </Col>
                                <Col xs={12}>
                                The above shows a strongly connected component (green lines) which forms a cycle (where if a vertex follows the direction of its edges, it will return back to itself). For example, vertex "A" goes to vertex "2", vertex "2" goes to vertex "B", vertex "B" goes to vertex "1", and vertex "1" goes back to vertex "A".
                                </Col>
                            </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClosePopUpSCC}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Algo;