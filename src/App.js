/* eslint-disable no-extend-native */
//DONE: STEP 1 - Import the useState hook.
//DONE: STEP 2 - Establish your application's state with some useState hooks.  You'll need one for the home score and another for the away score.
//DONE: STEP 3 - We need to change the hardcoded values in these div tags to accept dynamic values from our state.
//DONE: STEP 4 - Now we need to attach our state setter functions to click listeners.

import React, {useState} from "react";
import "./App.css";
import BottomRow from "./BottomRow";
import Countdown from "./Countdown";
import {TimeBox} from "./Countdown";

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
  const [timer, setTimer] = useState(900000); //"15:00");
  const [minutes] = useState(0);
  const [seconds] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [down, setDown] = useState(1);
  const [toGo, setToGo] = useState(10);
  const [ballOn, setBallOn] = useState(0);
  const [quarter, setQuarter] = useState(1);

  //#region Internal Functions
  const nextDown = () => {
    setDown(down<4 ? down+1 : 1);
  };

  const nextQuarter = () => {
    if (quarter<4) {
      setQuarter(quarter+1);
      setTimer(900000); //"15:00");
    } else {
      setTimer(0);      //"00:00");
    }
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
    setTimer(900000); //"15:00");
    setHomeScore(0);
    setAwayScore(0);
    setDown(1);
    setToGo(10);
    setBallOn(0);
    setQuarter(1);
  };
  //#endregion Internal Functions

  return (
    <React.Fragment>
      <section className="scoreboard contain">
        <div className="topRow">
          <TeamScore side={"home"} name={"Lions"} score={homeScore} />
          <Timer timer={timer} minutes={minutes} seconds={seconds} />
          <TeamScore side={"away"} name={"Tigers"} score={awayScore} />
        </div>
        <BottomRow down={down} toGo={toGo} ballOn={ballOn} quarter={quarter} />
      </section>

      <div className="container contain">
        <section className="container column contain-others contain-70">
          <div className="ButtonBox contain-others-inner">
            <div className="ButtonBox-header">Ball</div>
            <section className="container between">
              <div className="contain-15 center-width">
                <span>Down:</span><br/>
                <NextDownButton nextDown={nextDown} />
              </div>
              <div className="center-width">
                <span>Ball On:</span><br/>
                <BallOnButtons ballOnReset={ballOnReset} ballOnAdjust={ballOnAdjust} />
              </div>
            </section>
          </div>

          <div className="ButtonBox contain-others-inner">
            <div className="ButtonBox-header">Team Scoring</div>
            <section className="container">
              <span>Home:</span>
              <span>Away:</span>
            </section>
            <section className="container">
              <TeamButtons side={"home"} addScore={addScore} />
              <TeamButtons side={"away"} addScore={addScore} />
            </section>
          </div>
        </section>

        <section className="container contain-quarter">
          <div className="Timers ButtonBox center-within column contain-100">
            <Countdown timer={timer}/>
            <NextQuarterButton nextQuarter={nextQuarter} />
          </div>
        </section>
      </div>

      <section className="container">
        <ResetButton reset={reset} />
      </section>
    </React.Fragment>
  );
}

//#region Components
function Timer(props) {
  return (
    <React.Fragment>
      {/* <div className="timer">{props.timer}</div> */}
      <div className="timer"><TimeBox minutes={props.minutes} seconds={props.seconds} /></div>
    </React.Fragment>
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
//#endregion

export default App;
