import React from 'react';
import {useEffect, useState} from 'react';

export const Graph = () => {
  const [initialState, setInitialState] = useState([])
  useEffect(() => {
    fetch('/api/').then(res => {
        if(res.ok){
          return res.json()
        }
    }).then(jsonResponse => setInitialState(jsonResponse.a))},[])
  
  return(
    <div>
      {initialState.length > 0 && initialState.map((e,i) => <li key={i}>{e}</li>)}
    </div>
    )
}