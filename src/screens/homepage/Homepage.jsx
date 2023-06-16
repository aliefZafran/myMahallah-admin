import React from "react";
import styles from "./Homepage.module.css";
import HomeRoomCard from "../../components/homeComponent/HomeRoomCard";
import HomeMaintenance from "../../components/homeComponent/HomeMaintenance";
import HomeAnnouncement from "../../components/homeComponent/HomeAnnouncement";

const Homepage = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content1}>
        <HomeRoomCard />
      </div>

      <div className={styles.content2}>
        <HomeMaintenance />
        <HomeAnnouncement />
      </div>
    </div>
  );
};

export default Homepage;
