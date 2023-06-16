import React from "react";
import RoomCard from "../cards/RoomCard";
import styles from "./roomlayout.module.css";

const RoomLayout = ({ block }) => {
  return (
    <div>
      <div className={styles.blockRow}>
        <h2>Block {block}</h2>
      </div>
      <div className={styles.row}>
        <RoomCard level={1} block={block}/>
        <RoomCard level={2} block={block}/>
        <RoomCard level={3} block={block}/>
        <RoomCard level={4} block={block}/>
      </div>
    </div>
  );
};

export default RoomLayout;
