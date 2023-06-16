import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./progresscircle.module.css";

function ProgressCircle(props) {
  return (
    <div>
      <CircularProgressbar
        className={styles.donutchart}
        value={props.quantity}
        maxValue={props.max}
        strokeWidth={15}
        text={props.text}
        pathColor={props.path}
        textColor={props.textcolor}
        trailColor={props.trailcolor}
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: "round",
          textSize: "16px",
          // Colors
          pathColor: props.path,
          textColor: props.textcolor,
          trailColor: props.trailcolor,

          // How long animation takes to go from one percentage to another, in seconds
          pathTransition: "none",
          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

        })}
      />
    </div>
  );
}

export default ProgressCircle;
