import { useState, useCallback,useEffect,useRef} from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] =useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")
  //useRef
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="1234567890"
    if(charAllowed) str+="!#$%&"
    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }
    setPassword(pass)
    
    
  },[length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClibBord = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100 )
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full h-screen py-8' style={{backgroundColor: '#000'}}>
        <div className='max-w-md mx-auto shadow-md rounded-lg px-4  text-orange-500 my-8 text-center bg-gray-800 py-4'>
          <h1 className='text-white text-center text-xl'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden my-4'>
            <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
            <button 
            onClick={copyPasswordToClibBord}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 active:scale-95 
            hover:bg-blue-800 
            focus:outline-none 
            focus:ring-0
           focus:ring-blue-800 
           focus:ring-offset-0'>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length} </label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
              />
              <label htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default App
