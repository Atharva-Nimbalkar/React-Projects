// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useCallback, useEffect, useRef, useState } from 'react'
import './index.css'
// import 'tailwindcss/tailwind.css';

function App() {
  const [length, setLength] = useState(0);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [characterAllowed,setCharacterAllowed]=useState(false);
  const [password,setPassword]=useState("")

  //use refhook
  const passwordRef=useRef(null);//to give referecne of any element 
  //here input and button element;

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed)str+="0123456789"
    if(characterAllowed)str+="!@#$%^&*(){}[]~`"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,characterAllowed,setPassword])//we pass dependency in array by which our function effect/re-render these dependency is for optimization purposes to 
  //keep passoword in cache we can achieve using only using UseEffect
//setpassword used if we give password then it will loop cotinously. 
  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select();//for optimization to make select part like blue shadow
    passwordRef.current?.setSelectionRange(0,101);
    window. navigator.clipboard.writeText(password);
    //client side env object : window
    //server side env object : global
  },[password])

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,characterAllowed,setPassword,passwordGenerator])//depedency array here is about occurence of change modifyand for rerun purpose 
  return (
  <> 
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-300'>
    <h1 className='text-white text-center my-3'>text</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}></input>
          {/* we pass reference in above input element */}
          <button  onClick={copyPasswordToClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          <label>length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
        <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                  setCharacterAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
     </div>
    </div>
    </>
  )
}

export default App
