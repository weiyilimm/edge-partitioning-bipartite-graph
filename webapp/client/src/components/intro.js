import React from 'react';
import { Link } from "react-router-dom";

class CreateIntro extends React.Component {
    render() {
        return(
            <div className='content'>
                <div>
                    <h1 className='title'>Edge Partitioning</h1>
                    <div className='details'>
                        Learn in-depth edge partitioning from maximum cardinality matching algorithm in a bipartite graph, step by step starting from zero knowledge.
                    </div>
                </div>
                <div>
                    <Link to="graph-initialisation" className="btn btn-lg btn-pink" href="graph-initialisation" role="button">Learn</Link>
                </div>
            </div>
        );

    }
}

export default CreateIntro;