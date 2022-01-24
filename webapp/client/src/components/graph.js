import React from 'react';
import {useEffect, useState} from 'react';

export const Graph = () => {
  const [initialState, setInitialState] = useState([])
  useEffect(() => {
    fetch('/api/').then(res => {
        if(res.ok){

          return res.json()
        }
    }).then(jsonResponse => setInitialState(jsonResponse))},[])
  console.log(initialState)
  for (var leftNode in initialState) {
    console.log(leftNode);
    for (var rightNode in initialState[leftNode]){
      console.log(rightNode)
    }
    console.log(initialState[leftNode])
  }
  return(
    <div>
      {/* {initialState.length > 0 && initialState.map((e,i) => <li key={i}>{e}</li>)} */}
    </div>
    )
}