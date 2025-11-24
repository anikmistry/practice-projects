import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [counter,setCounter] = useState(15)

  //let counter = 15;
  const addvalue = () =>{
    setCounter(counter + 1);
  }
  const removeValue = () =>{
    //counter = counter - 1;
    if(counter > 0) setCounter(counter - 1);
    
    console.log(counter);
  }

  return (
    <>
     <h1>Anik</h1>
     <h2>Counter value: {counter}</h2>
     <button
     onClick={addvalue}
     >Add value</button> <br />
     <button onClick={removeValue}>Remove value</button>
     
    </>
  )
}

export default App
