import React from 'react';
import "./home.css";
import NavigationBar from './NavigationBar'
import CreateGraph from './graph'
import CreateIntro from './intro'
import { Link } from "react-router-dom";
import Footer from './footer'

class Home extends React.Component {
    // {'E0': {'x_1': [3]}, 'EW': {'x_4': [2, 0], 'x_1': [2, 0]}, 'E1': {'x_3': [1], 'x_2': [3]}}
    render() {
        return (
            <div className='App'>
                <NavigationBar />
                <div className='container   '>
                    <div className='row mx-auto min-vh-100'>
                        <div className='col-md-6 col-xs-12'>
                            <CreateIntro />
                        </div>
                        <div className='col-md-6 col-xs-12 svg-contain justify-content-end'>
                            <CreateGraph 
                            jsonData={{"x_1": [0, 2, 3], "x_2": [3], "x_3": [1], "x_4": [0, 2]}}
                            partitionEdges={{"E0": {"x_1": [3]}, "EW": {"x_4": [2, 0], "x_1": [2, 0]}, "E1": {"x_3": [1], "x_2": [3]}}}
                            showOnHover={true}
                            showLegend={true}
                            />
                        </div>
                    </div>
                    <div className="row mx-1 mt-3 info">
                        <div>
                            <h2>Edge Partitioning Algorithm</h2>
                            <div className="details mb-5">
                                <p>Hopcroft-Karp algorithm is a matching algorithm that is used 
                                    widely in real-world applications such as student-project 
                                    allocation and job-applicant recruitment to achieve maximum 
                                    cardinality matching. The problems can be modelled in a 
                                    bipartite graph G(X, Y, E), where X is the left vertex set, 
                                    Y is the right vertex set, and E is the edge set. A matching 
                                    M is a subset of edge set E if no two edges in M share the 
                                    same node of G. M is maximal if there is no other graph 
                                    matching with higher cardinality. Edges in E can be partitioned 
                                    into three sets:
                                </p>
                                <ol className="list-group list-group-numbered">
                                    <li>All maximum matching (E1)</li>
                                    <li>Some maximum matching (EW)</li>
                                    <li>No maximum matching (E0)</li>
                                </ol>
                            </div>
                            <h2>An example...</h2>
                            <div className="details pb-1">
                                <p>
                                Suppose a senior lecturer wishes to allocate M lecturers 
                                to N computer science modules. However, not all lecturers 
                                can teach all modules in the school; they can only teach 
                                the area of their competence. He wants to allocate as many 
                                lecturers as possible to utilise the resource fully. Furthermore, 
                                lecturers could also be able to swap between lectures.
                                </p>
                            </div>
                            <div className="details pb-5">
                              <h5>See how this works...</h5>
                              <Link to="graph-initialisation" className="btn btn-lg btn-pink" href="graph-initialisation" role="button">Learn</Link>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Home;