import { useRef } from "react";
import sample from '../assets/roll.mp4';
export default function Begin({setUsername, LevelUp, setLevelUp}) {
    const inputRef = useRef();

    const handleClick=()=>{
        // inputRef.current.value && setUsername(inputRef.current.value);

        if(inputRef.current.value!==""){
          fetch("http://localhost:5000/user/Start_Game",{
            method:"Post",
            body: JSON.stringify({roll:inputRef.current.value}),
            headers: {"Content-Type":"application/json"}
          }).then(res=>res.json())
          .then(data=>{
            if(data.selected){
              setUsername(inputRef.current.value);
            }
            else{
              inputRef.current.value="";
              alert("You have already participated!!!");
            }
          })
        }

    };
  return (
        <>
        <video autoPlay loop muted>
           <source src={sample} type='video/mp4'/>
          </video>
        <div className="Start">
          <input placeholder ="Enter your RollNumber" className="startInput" ref={inputRef}/>
          <button id="startBtn" className="btn" onClick={handleClick}>Start - Level 1</button>
        </div>
        </>
  )
}