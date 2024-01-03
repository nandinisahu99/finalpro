import {useState} from "react";
import "./app.css";
import Sques from "./components/Sques";
import Timer from "./components/Timer";
import Begin from "./components/Begin";
import Interval from "./components/Interval";
import Start from "./components/start";
import Story from "./components/story";
import sample from './assets/thanks.mp4';

function App() {
  const [intro, setIntro]=useState(true);
  const [story, setStory]=useState(false);
  const [questionNumber, setQuestionNumber]= useState(1);
  const [stop,setStop]=useState(false);
  const [username, setUsername] =useState(null);
  const [LevelUp, setLevelUp]=useState(()=>false);
  const [Msg, setMsg]=useState("Thank you for participating");
  const [StoreToken, setStoreToken]=useState("");


  const data=[
    {
    id: 1,
    question: "4+5....................................................................................................................................afgtsh chd  /.................................e.rrrc.dx.ddddd.d.d.d.d.d.d.d.d.d.dd.d..dd.d.d.d..d.d.d.d....wewewewewewewearewewarearerxnbcuebvkewvjwiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuugfffffffffffffffffffffffffffbcccccccccccccccccccccccc xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    answer: [
      {
        text: "9",
        correct: true,
      },
      {
        text: "7",
        correct: false,
      },
      {
        text: "19",
        correct: false,
      },
      {
        text: "1",
        correct: false,
      },
    ],
    },
    {
      id: 2,
      question: "78 binary conversion",
      answer: [
        {
          text: "11100",
          correct: false,
        },
        {
          text: "1100011",
          correct: true,
        },
        {
          text: "1010101",
          correct: false,
        },
        {
          text: "0001010",
          correct: false,
        },
      ],
      },
      {
        id: 3,
        question: "Question 3",
        answer: [
          {
            text: "false",
            correct: false,
          },
          {
            text: "true",
            correct: true,
          },
          {
            text: "false",
            correct: false,
          },
          {
            text: "false",
            correct: false,
          },
        ],
        }
  ]

  const data1=[
    {
    id: 1,
    question: "5+5",
    answer: [
      {
        text: "10",
        correct: true,
      },
      {
        text: "7",
        correct: false,
      },
      {
        text: "19",
        correct: false,
      },
      {
        text: "1",
        correct: false,
      },
    ],
    },
    {
      id: 2,
      question: "79 binary conversion",
      answer: [
        {
          text: "11100",
          correct: true,
        },
        {
          text: "1100011",
          correct: false,
        },
        {
          text: "1010101",
          correct: false,
        },
        {
          text: "0001010",
          correct: false,
        },
      ],
      },
      {
        id: 3,
        question: "Question 3",
        answer: [
          {
            text: "false",
            correct: false,
          },
          {
            text: "true",
            correct: true,
          },
          {
            text: "false",
            correct: false,
          },
          {
            text: "false",
            correct: false,
          },
        ],
        }
  ]
  const htmlInstructions = `
                    <h2>Instructions for Level 2 Entry</h2>
                    <p>Congratulations on Clearing Level 1!</p>
                    <ol>
                        <li>After this window, there will be a Time Penalty Round.</li>
                        <li>During this round, a 6-digit passcode will be displayed for only 5 seconds.</li>
                        <li>Your task is to quickly memorize this passcode.</li>
                        <li>Use the memorized passcode on the next window to enter Level 2.</li>
                        <li>Speed is crucial; the faster you enter the passcode, the more time you save, increasing your chances of advancing to the next level.</li>
                        <li>If you successfully remember the passcode, you can enter Level 2 immediately.</li>
                        <li>However, if you cannot recall it, you will have to wait for the penalty time period to expire before attempting to enter Level 2.</li>
                        <li>Keep in mind that only the top 3 candidates who clear Level 2 quickly will win the game.</li>
                    </ol>
                `;
  return (
    <div className="app">
      {(username)? (
      <>
      <div className="main">
          {(stop) ? ( 
          <>
            <h1 className="thank">{Msg}</h1>
            {(!LevelUp)? (<video autoPlay muted loop>
              <source src={sample} type='video/mp4' />
            </video>):(<></>)}
            {LevelUp? (
            <>
            <Interval setMsg={setMsg} setStop={setStop} LevelUp={LevelUp} setLevelUp={setLevelUp} username={username}></Interval>
            </>
             ): (<></>)
             }
             
          </>) : (
            <>
              <div className="top">
                <div className="timer">
                  <Timer setStop={setStop} setMsg={setMsg} questionNumber={questionNumber} LevelUp={LevelUp} setLevelUp={setLevelUp} username={username}/>
                </div>
              </div>
              <div className="bottom">
                <Sques data={data} data1={data1} setStop={setStop} setMsg={setMsg} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} LevelUp={LevelUp} setLevelUp={setLevelUp} username={username} setUsername={setUsername}/>
              </div>
            </>
          )}
      </div>
      </>
      ) : ((intro)?(<Start setIntro={setIntro} setStory={setStory}/>):((story)?(<Story setStory={setStory}/>):(<Begin setUsername={setUsername} LevelUp={LevelUp} setLevelUp={setLevelUp}/>)))}
    </div>
  );
}

export default App;