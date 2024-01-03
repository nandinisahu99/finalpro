import { useEffect,useState } from "react";
import video1 from '../assets/level1.mp4';
import video2 from '../assets/level2.mp4';


export default function Sques({data,data1,setStop,setQuestionNumber,questionNumber, LevelUp, setLevelUp,username,setUsername,setMsg}) {
  const [question,setQuestion]=useState(null);
  const [selectedAnswer,setSelectedAnswer]= useState(null);
  const [className, setClassName]=useState("ans");
  

  useEffect(()=>{
    if(!LevelUp){
      setQuestion(data[questionNumber-1]);
    }
    else{
      setQuestion(data1[questionNumber-1]);
    }
  },[data,data1,questionNumber]);


  const selectcand= async()=>{
    fetch("http://localhost:5000/user/select_cand",{
        method: "PATCH",
        body: JSON.stringify({roll:username}),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json())
    .then(data=>{
      if(data.selected){
        setLevelUp(true)
        setQuestionNumber(1);
        setMsg(()=> data.message);
        setStop(true)
      }
      else{
        setMsg(()=> data.message);
        setStop(true);
        //setLevelUp(false);
      }
      console.log(data);

    })
  };
  const delay = (duration,callback) => {
    setTimeout(() =>{
      callback();
    },duration);
  };

const endLevel=()=>{
  setQuestionNumber(1);
  fetch("http://localhost:5000/user/End_Game",{
        method: "Post",
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
        setMsg(()=> data.message);
        setLevelUp(false);
        setStop(true);
      }

    })
 
  
}
  

  const handleClick = (a) =>{
    setSelectedAnswer(a);
    setClassName("ans active");
    delay(150,() => 
      setClassName(()=>a.correct ? "ans correct" : "ans wrong") 
    );
    delay(900,() => 
    {  if(a.correct){
        console.log(username)
          if(!LevelUp)
            setQuestionNumber((prev)=>data.length>=prev+1? prev+1: selectcand());
          else
            setQuestionNumber((prev)=>data1.length>=prev+1? prev+1: endLevel() );
        }
        else{
        
          //change
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
          //
          // setMsg(()=> "Thank you for participating");
          // setLevelUp(false);
          // setStop(true);

        } 
    }
    );
  };
  return (
    <>
    <video autoPlay loop muted>
      <source src={(LevelUp)?video2:video1} type='video/mp4'/>
    </video>
    <div className="squiz">
        <div className="question">{question?.question}</div>
        <div className="answer">
          {question?.answer.map((a)=>(
          <div className={selectedAnswer === a ? className:"ans"} onClick={() => handleClick(a)}>
            {a.text}</div>))}
        </div>        
    </div>
    </>
  )
}


