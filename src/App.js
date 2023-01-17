import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { createStore } from 'redux';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
// Provider 컴포넌트 : 어떤 컴포넌트들에게 state를 사용하게 할지 정하는 울타리
// useSelector 어떤 state값을 쓰고 싶은지
// useDispatch는 스테이트를 변경
// connect 말 그대로 연결 * 사용하기 어렵다. 재사용성을 필요로 할 때

function reducer(currentState, action){
  if(currentState === undefined){
    return {
      number : 1
    };
  }
  const newState = { ...currentState };
  if(action.type === 'PLUS'){
    newState.number++;
  } else if(action.type === 'MINUS'){
    newState.number--;
  }
  return newState;
}

const store = createStore(reducer);

function App() {
  const [number, setNumber] = useState(1);
  return (
    <div id="container" className="App">
      <h1>Root</h1>
      <div id='grid'>
        <Provider store={store}>
          <Left1 number={number}></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}

function Left1(props){
  return (
    <div>
      <h1>Left1</h1>
      <Left2></Left2>
    </div>
  );
}

function Left2(props){
  console.log("left2");
  return (
    <div>
      <h1>Left2</h1>
      <Left3></Left3>
    </div>
  );
}

function Left3(props){
  /*
  function f(state){
    return state.number;
  }
  const number = useSelector(f);
  */
  console.log("left3"); // 변경이 되는 컴포넌트만 렌더링되기 때문에 Left3의 콘솔만 출력되는걸 알 수 있다.
  const number = useSelector(state=>state.number); // 축약
  return (
    <div>
      <h1>Left3 : {number}</h1>
    </div>
  );
}

function Right1(props){
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  )
}

function Right2(props){
  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  )
}
function Right3(props){
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Right3</h1>
      <input type="button" value="+" onClick={()=>{
        dispatch({type:'PLUS'})
      }} />
      <input type="button" value="-" onClick={()=>{
        dispatch({type:'MINUS'})
      }} />
    </div>
  )
}

export default App;