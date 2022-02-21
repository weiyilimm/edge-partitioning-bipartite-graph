import React from 'react';
import { Button } from 'react-bootstrap';
import CreateGraph from './graph';
import "./learn.css";
import NavigationBar from './NavigationBar'

const Results = () => (
    <Button className="btn btn-lg btn-pink" role="button" href="/graph-initialisation/learn">Go</Button>
)

class Learn extends React.Component {
    constructor(props) {
        super(props);
        // State values
        this.state = {
            leftVertices: "1",
            rightVertices: "1",
            edges: "1",
            // To populate values for edges dropdown
            edgesList: [1],
            res: "",
            showButton: false
        }
    }

    
    // When the user choose a value in dropdown
    handleChangeLeft = (e) => {
        // Set the state
        this.setState({leftVertices:e.target.value});
        // Get the number of left vertices
        // Can't use this.state.leftVertices because it hasn't been updated
        var leftNumber = e.target.value;
        // Get the number of right vertices
        var rightNumber = this.state.rightVertices;
        // Find the min number of edges
        // Minimum of edges is the maximum number between left and right vertices
        var min = Math.max(leftNumber, rightNumber);
        // Find the max number of edges
        var max = leftNumber * rightNumber;    
        // Empty the array before pushing new values
        this.state.edgesList = []
        // Set the edge state to minimum when the dropdown changes
        this.setState({edges:min});
        for (let i = min; i <= max; i++) {
            this.state.edgesList.push(i)
        }
    }
    
    // Everything same as above function just the opposite
    handleChangeRight = (e) => {
        this.setState({rightVertices:e.target.value});
        var leftNumber = this.state.leftVertices;
        var rightNumber = e.target.value;
        var min = Math.max(leftNumber, rightNumber);
        var max = leftNumber * rightNumber;    
        this.state.edgesList = []
        this.setState({edges:min});
        for (let i = min; i <= max; i++) {
            this.state.edgesList.push(i)
        }
    }

    // Update the state of edges 
    handleChangeEdges = (e) => {
        this.setState({edges:e.target.value});
    }

    // Generate json to post to server
    generateVertices = () => {
        // Change the user input into JSON 
        var obj = {};
        obj.leftVertices = this.state.leftVertices;
        obj.rightVertices = this.state.rightVertices;
        obj.edges = this.state.edges;

        const userInput = JSON.stringify(obj);
        const axios = require('axios')
        // Post the JSON to Node.js server
        // And get back the response
        axios.post('/api',
        {
            jsonData: userInput
        }).then(res => {
            localStorage.setItem('graph', JSON.stringify(res.data.graph));
            localStorage.setItem('matching', JSON.stringify(res.data.matching));
            localStorage.setItem('isPerfect', JSON.stringify(res.data.is_perfect));
            localStorage.setItem('partitionEdges', JSON.stringify(res.data.partitionEdges));
            localStorage.setItem('SCC', JSON.stringify(res.data.SCC));
            localStorage.setItem('labelSet', JSON.stringify(res.data.labelSet));
            console.log(`statusCode: ${res.status}`)
            console.log(res.data.graph)
            this.setState({res:res.data.graph})
        }).catch(error => {
            console.log(`statusCode: ${error.response.status}`)
            console.log(`Bad Request`)
        })
        this.state.showButton = true;
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <div className='container-fluid row'>
                    <div className='col-md-6 col-xs-12'>
                        <CreateGraph 
                        jsonData={this.state.res} 
                        showOnHover={true}
                        />
                    </div >
                    <div className='side-board col-md-6 col-xs-12 mh-100'>
                        <h4 className='mt-4 mb-5'>Step 1: Graph Initialisation</h4>
                        <p className='mb-5 pb-5'>
                            The problem can be modelled in a bipartite graph G(X, Y, E) 
                            where X is the left vertex set, Y is the right vertex set, and E 
                            is the edge set. Left (X) and right (Y) vertices are two independent sets,
                            and all edges have one left endpoint vertex to right endpoint vertex.
                        </p>
                        <p>
                            Please select the number of left and right vertices below.
                        </p>
                        <p style={{ fontSize : "0.8rem"}}>
                            Note: The edges are assigned randomly for the sake of simplicity.
                        </p>
                        <div className="form-group">
                            <label>Number of left vertices</label>
                            <div className="col-sm-6 col-md-3">
                                <select className="form-control" value={this.state.leftVertices} onChange={this.handleChangeLeft}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select> 
                            </div>
                            <label>Number of right vertices</label>
                            <div className="col-sm-6 col-md-3">
                                <select className="form-control" value={this.state.rightVertices} onChange={this.handleChangeRight}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                            </div>
                            <label>Number of edges</label>
                            <div className="col-sm-6 col-md-3">
                                <select className="form-control" value={this.state.edges} onChange={this.handleChangeEdges}>
                                {this.state.edgesList.map(edge => (
                                    <option key = {edge}>{edge}</option>
                                ))}
                                </select> 
                            </div>
                        </div>
                        <div className='mt-3 pt-0'>
                            <Button className="btn btn-lg btn-pink" role="button" onClick={this.generateVertices}>Generate Vertices</Button>
                        </div>
                        <div className='mt-0 pt-0'>
                            { this.state.showButton ? <Results /> : null }
                        </div>
                    </div>
                </div>
            </div>
                
                
        )
    }
}


export default Learn;

