import { useEffect, useState } from "react"

// import React from 'react'
export default function Timer({setStop,questionNumber, setLevelUp, setMsg,username}) {
    const [timer,setTimer]=useState((10));

    useEffect(()=>{
        if(timer===0) {
                fetch("http://localhost:5000/user/End",{
                    method:"post",
                    body: JSON.stringify({roll:username}),
                    headers:{
                      "Content-Type":"application/json"
                    }
                  }).then(res=>res.json())
                  .then(data=>{
                    if(data.selected){
                      setMsg(()=> data.message);
                      setLevelUp(false);
                      setStop(true);
                    }
                    else{
                      setMsg(()=> "Thank you for participating");
                      setLevelUp(false);
                      setStop(true);
                    }
                  })
            }
        const interval=setInterval(()=>{
            setTimer((prev) => prev-1);
        },1000);

        return() => clearInterval(interval);
    },[setStop,timer]);

    useEffect(()=>{
        setTimer(10);
    },[questionNumber]);
    
  return timer;
}
