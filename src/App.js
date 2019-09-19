/* eslint-disable no-extend-native */
//DONE: STEP 1 - Import the useState hook.
//DONE: STEP 2 - Establish your application's state with some useState hooks.  You'll need one for the home score and another for the away score.
//DONE: STEP 3 - We need to change the hardcoded values in these div tags to accept dynamic values from our state.
//DONE: STEP 4 - Now we need to attach our state setter functions to click listeners.

import React, {useState} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

String.prototype.toProperCase = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};
String.prototype.toCamelCase = function(separator = ' ') {
  let t = this.split(separator);
  for (let i = 0; i < t.length; i++) {
    t[i] = i === 0 ? t[i].toLowerCase() : t[i].toProperCase();
  }
  return t.join('');
};

function App(props) {
  const [timer, setTimer] = useState("15:00");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [down, setDown] = useState(1);
  const [toGo, setToGo] = useState(10);
  const [ballOn, setBallOn] = useState(0);
  const [quarter, setQuarter] = useState(1);

  //#region Internal Functions
  const toggleTimer = (timerValue) => {
    //Start/Stop Timer each time button is pressed.
    setTimer(timerValue);
  };

  const nextDown = () => {
    setDown(down<4 ? down+1 : 1);
  };

  const nextQuarter = () => {
    setQuarter(quarter<4 ? quarter+1 : 4);
  };

  const addScore = (targetTeam, scoreValue) => {
    if (targetTeam === 'home') {
      setHomeScore(homeScore + scoreValue);
    } else {
      setAwayScore(awayScore + scoreValue);
    }
  };

  const ballOnReset = () => {
    setBallOn(0);
    setToGo(10);
  };
  const ballOnAdjust = (value) => {
    let b = ballOn+value;
    if (b<0) {
      if (b<-49) {
        b=-50;
      }
    } else {
      if (b>49) {
        b=50;
      }
    }
    setBallOn(b);

    //Calculate remaining yards to next down
    let yards = () => {
      if (Math.abs(b)===50) {
        return 0;
      } else {
        return 10-(Math.abs(b) % 10);
      }
    };
    let y = yards();
    setToGo(y);

    //Reset Down if yards to go is 10 or 0
    if (y===10 || y===0) setDown(1);
  };

  const reset = () => {
    setTimer("15:00");
    setHomeScore(0);
    setAwayScore(0);
    setDown(1);
    setToGo(10);
    setBallOn(0);
    setQuarter(1);
  };
  //#endregion Internal Functions

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <TeamScore side={"home"} name={"Lions"} score={homeScore} />
          <Timer timer={timer} />
          <TeamScore side={"away"} name={"Tigers"} score={awayScore} />
        </div>
        <BottomRow down={down} toGo={toGo} ballOn={ballOn} quarter={quarter} />
      </section>
      {/* <section className="buttons">
        <TimerButton toggleTimer={toggleTimer} />
      </section> */}
      <section className="buttons between">
        <span>&nbsp;&nbsp;&nbsp;Down:</span>
        <span>Ball On:</span>
        <span>Quarter:&nbsp;&nbsp;</span>
      </section>
      <section className="buttons between">
        <NextDownButton nextDown={nextDown} />
        <BallOnButtons ballOnReset={ballOnReset} ballOnAdjust={ballOnAdjust} />
        <NextQuarterButton nextQuarter={nextQuarter} />
      </section>
      <section className="buttons">
        <span>Home:</span>
        <span>Away:</span>
      </section>
      <section className="buttons">
        <TeamButtons side={"home"} addScore={addScore} />
        <TeamButtons side={"away"} addScore={addScore} />
      </section>
      <section className="buttons">
        <ResetButton reset={reset} />
      </section>
    </div>
  );
}

//#region Components
function Timer(props) {
  return (
    <div className="timer">{props.timer}</div>
  );
}

function TeamScore(props) {
  return (
    <div className={props.side}>
      <h2 className={props.side+"__name"}>{props.name}</h2>
      <div className={props.side+"__score"}>{props.score}</div>
    </div>
  );
}

function TimerButton(props) {
  return (
    <button onClick={()=>props.toggleTimer("00:07")}>Start/Stop Timer</button>
  );
}

function NextDownButton(props) {
  return (
    <button onClick={()=>props.nextDown()}>Next</button>
  );
}
function BallOnButtons(props) {
  return (
    <div>
      <button onClick={()=>props.ballOnAdjust(-10)}>-10</button>
      <button onClick={()=>props.ballOnAdjust(-5)}>-5</button>
      <button onClick={()=>props.ballOnAdjust(-1)}>-1</button>
      <button onClick={()=>props.ballOnReset()}>0</button>
      <button onClick={()=>props.ballOnAdjust(1)}>+1</button>
      <button onClick={()=>props.ballOnAdjust(5)}>+5</button>
      <button onClick={()=>props.ballOnAdjust(10)}>+10</button>
    </div>
  );
}
function NextQuarterButton(props) {
  return (
    <button onClick={()=>props.nextQuarter()}>Next</button>
  );
}

function TeamButtons(props) {
  return (
    <div className={props.side+"Buttons"}>
      <button className={props.side+"Buttons__touchdown"} onClick={()=>props.addScore(props.side, 7)}>Touchdown</button>
      <button className={props.side+"Buttons__fieldGoal"} onClick={()=>props.addScore(props.side, 3)}>Field Goal</button>
    </div>
  );
}

function ResetButton(props) {
  return (
    <button id="reset" onClick={()=>props.reset()}>Reset</button>
  );
}

function tick() {
  return null;
}
//#endregion

export default App;
