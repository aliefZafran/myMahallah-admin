import React from "react";
import styles from "./feed.module.css";
import user from "../../images/user.png";

const Feed = ({pfp, date, time, content}) => {
  return (
    <div className={styles.container}>
      <div className={styles.pfp}>
        <img src={pfp} />
      </div>
      <div className={styles.content}>
        <div className={styles.details}>
          <h4 style={{margin:'0'}}>Mahallah Office</h4>
          <p style={{margin:'0', fontSize:'12px'}}>{time}  {date}</p>
        </div>
        <div className={styles.post}>
          <p style={{margin:'0'}}>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Feed;
