//DONE: STEP 1 - Import the useState hook.
import React, {useState} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //DONE: STEP 2 - Establish your application's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const addScore = (targetTeam, scoreValue) => {
    if (targetTeam === 'home') {
      setHomeScore(homeScore + scoreValue);
    } else {
      setAwayScore(awayScore + scoreValue);
    }
  };

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {
              //DONE: STEP 3 - We need to change the hardcoded values in these div tags to accept dynamic values from our state.
            }

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">00:03</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {
            //DONE: STEP 4 - Now we need to attach our state setter functions to click listeners.
          }
          <button className="homeButtons__touchdown" onClick={()=>addScore('home', 7)}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={()=>addScore('home', 3)}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={()=>addScore('away', 7)}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={()=>addScore('away', 3)}>Away Field Goal</button>
        </div>
      </section>
    </div>
  );
}

export default App;
