import React, { useState } from 'react';
import sample from '../assets/Story/8.mp4';
import { useRef } from 'react';

export default function Story({setStory}) {
  const [pauseIndex, setPauseIndex]=useState(1);
  const videoTag=useRef();
  const pauseVideo=()=>{
    if(videoTag.current.currentTime>=(pauseIndex*19))
        {
          videoTag.current.pause();
          setPauseIndex(()=>pauseIndex+1);
        }
    }
  const nextClip=()=>{
    if(videoTag.current.ended==true)
    {
        setStory(false);
    }
    if(videoTag.current.paused==true)
        videoTag.current.play();
    else
    {
      if(pauseIndex*20+5> videoTag.current.duration)
        setStory(false);
      else 
      {
        videoTag.current.currentTime=pauseIndex*20;
        setPauseIndex(()=>pauseIndex+1);
      }
    }
  }
  return (
    <>
    <div className="video-body">
    <button className="next_btn btn" onClick={nextClip}>Next</button>
    <video autoPlay muted onTimeUpdate={pauseVideo} ref={videoTag}>
        <source src={sample} type='video/mp4' />
    </video>
    </div>
    </>
  )
}


