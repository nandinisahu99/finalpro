import { useEffect, useRef, useState } from "react"
import tokenVideo from '../assets/token.mp4';
import instructionVideo from '../assets/interval.mp4';
//import React from 'react'

export default function Interval({setMsg,LevelUp,setLevelUp,setStop,username}) {
  
    // const [Seconds, setSeconds]=useState(0)
    const [Flag, setFlag]=useState(false)
    const [Intime,setIntime]=useState(60)
    const [Input, setInput]=useState(false)
    const [Penalty, setPenalty]=useState(false);
    const [currentVideo,setcurrentVideo] =useState(instructionVideo)
    const tokenInput=useRef();
    const videoTag=useRef();

    const getToken=()=>{
        fetch("http://localhost:5000/user/get_token", {
            method:"POST",
            body: JSON.stringify({roll:username}),
            headers:{
            "Content-Type":"application/json" }
        }).then(res=>res.json())
          .then(data=>{
            setMsg(()=>data.token);
            console.log(data.token);
        })
    } 
    const enterRoundTwo=(token, roll)=>{
        fetch("http://localhost:5000/user/verify_token", {
            method:"POST",
            body: JSON.stringify({roll:roll, token:token}),
            headers:{
            "Content-Type":"application/json" }
        }).then(res=>res.json())
          .then(data=>{
            // console.log(data.status);
            if(data.status){
                setLevelUp(true);
                setStop(false);
            }
            else{
                alert("InValid Token!");
            }
            
        })
    }
   
    const createLoop=()=>{
        if(Flag===false && Intime>0 && videoTag.current.ended===true)
        {
            videoTag.current.currentTime=30;
            videoTag.current.play();
        }
    }
    useEffect(()=>{
       if(Intime===0 && Flag===false) { 
            getToken();
            setFlag(true);
            setcurrentVideo(tokenVideo);
            setIntime(4);
        }
        else if(Intime===0 && Flag===true && Penalty===false){
            if(Input===false){
            setMsg("")
            setInput(true);
            setIntime(20);
            setPenalty(true);
            }
        }
        else if(Intime===0 && Flag===true && Penalty===true){
            // setStop(false);
            console.log("Penalty");
            setLevelUp(true);
            setStop(false);
        }
        const interval=setInterval(()=>{
            setIntime((prev) => prev>0?prev-1:0);
        },1000);

        return() => clearInterval(interval);
    },[setStop, Intime]);

  return (<>
    <video autoPlay muted src={currentVideo} type='video/mp4' ref={videoTag} onTimeUpdate={createLoop}/>
  <div className={(Intime<11 && Flag==false)?"timer redtimer":"timer"}>{Intime}</div>
  {Input?(
     <>
    <div className="tokenBox">
        <input type="text" className="startInput" name="" id="" disabled={Intime===0?true:false} ref={tokenInput}/>
        <input type="button" id="tokenBtn" value="Submit" onClick={()=> enterRoundTwo(tokenInput.current.value, username)} disabled={Intime===0?true:false} />
    </div>
     </>
  ):(<div></div>)}
  </>)
}
