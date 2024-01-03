import React from 'react';
import sample from '../assets/intro.mp4';

export default function start({setIntro, setStory}) {
  const startIntro=()=>{
    setIntro(false);
    setStory(true);
  }
  return (
    <>
    <div className="video-body">
    <button className="start_btn btn" onClick={startIntro}>Start</button>
    <video autoPlay loop muted>
        <source src={sample} type='video/mp4' />
    </video>
    </div>
    </>
  )
}