import React from "react";
import "./App.css";

function BottomRow(props) {
  return (
    <div className="bottomRow">
      <RowItem title={"Down"} value={props.down} />
      <RowItem title={"To Go"} value={props.toGo} />
      <RowItem title={"Ball on"} value={props.ballOn} />
      <RowItem title={"Quarter"} value={props.quarter} />
    </div>
  );
};

function RowItem(props) {
  return (
    <div className={props.title.toCamelCase()}>
      <h3 className={props.title.toCamelCase()+"__title"}>{props.title}</h3>
      <div className={props.title.toCamelCase()+"__value"}>{props.value}</div>
    </div>
  );
}

export default BottomRow;
