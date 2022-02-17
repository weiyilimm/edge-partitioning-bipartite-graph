import React, { useState } from 'react';
import CreateGraph from './graph';
import NavigationBar from './NavigationBar';
import { Button } from 'react-bootstrap';
import "./algo.css";

const Algo = () => {
    const [matching, setMatching] = useState('');
    const [stepCount, setStepCount] = useState(0);
    const [disabled, setDisabled] = useState('disabled');
    const [title, setTitle] = useState('Finding maximum matching');
    const [text, setText] = useState('We have to find the maximum matching which allocates as many left vertices as possible to the right vertices by using Hopcroft-Karp with a worst case running time of O(n^1/2m)');
    var graph = JSON.parse(localStorage.getItem('graph'))
    var isPerfectMatching = JSON.parse(localStorage.getItem('isPerfect'))
    var graphMatching = JSON.parse(localStorage.getItem('matching'))

    const nextButton = () => {
        // Draw matching graph
        if (stepCount == 0){
            setMatching(graphMatching);
            setDisabled("");
            setTitle("Check if the maximum matching is perfect or imperfect");
            setText("A vertice is matched if it is the endpoint of a matched edge; otherwise it is exposed. The maximum matching is perfect if all the vertices are matched; otherwise it is imperfect.")
        }
        if (stepCount == 1){
            setMatching(graphMatching);
            if (isPerfectMatching)
                setText("The graph is a perfect matching")
            else
                setText("The graph is an imperfect matching")
        }
        setStepCount(stepCount+1)
    }

    const prevButton = () => {
        if (stepCount == 1){
            setMatching("");
            setDisabled("disabled");
            setTitle('Finding maximum matching');
            setText('We have to find the maximum matching which allocates as many left vertices as possible to the right vertices by using Hopcroft-Karp with a worst case running time of O(n^1/2m)')
        }
        if (stepCount == 2){
            setText("A vertice is matched if it is the endpoint of a matched edge; otherwise it is exposed. The maximum matching is perfect if all the vertices are matched; otherwise it is imperfect.")
        }
        setStepCount(stepCount-1)
    }

    return (
        <div>
            <NavigationBar />
            <div className='container-lg'>
                <div className='row'>
                    <div className='col-md-6 col-xs-12'>
                        <CreateGraph 
                        jsonData={graph} 
                        partitionEdges="" 
                        matching={matching}/>
                    </div >
                    <div className='side-board col-md-6 col-xs-12 pb-5'>
                        <h4 className='mt-4 mb-5'>{title}</h4>
                        <p className='mb-5 pb-5'>
                            {text}
                        </p>
                        <Button className="btn btn-md-pink" role="button" onClick={prevButton} disabled={disabled}>Prev</Button>
                        <Button className="btn btn-md-pink" role="button" onClick={nextButton}>Next</Button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Algo;
