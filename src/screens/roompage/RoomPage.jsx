import React, { useState, useEffect } from "react";
import RoomLayout from "../../components/roomlayout/RoomLayout";
import { db } from '../../config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import styles from "./roompage.module.css";
import Switch from "@mui/material/Switch";

const RoomPage = () => {
  const [checked, setChecked] = useState(false);
  const [enabled, setEnabled] = useState("Enable");
  const handleToggle = () => {
    setChecked(!checked);
    setEnabled(checked ? "Enable" : "Disable");

    const roomRef = doc(db, 'uthman', 'switch');
    updateDoc(roomRef, { registrationEnabled: !checked })
      .then(() => {
        console.log('Room registration updated successfully');
      })
      .catch((error) => {
        console.error('Error updating room registration:', error);
      });
  };

  useEffect(() => {
    // Fetch the initial room registration state from Firestore
    const roomRef = doc(db, 'uthman', 'switch');
    // Assuming you have a 'registrationEnabled' field in your Firestore document
    getDoc(roomRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const { registrationEnabled } = docSnapshot.data();
        setChecked(registrationEnabled);
        setEnabled(registrationEnabled ? "Disable" : "Enable");
      }
    });
  }, []);

  return (
      <div className={styles.content}>
        <div className={styles.roomHeader}>
          <h1>Manage Rooms</h1>
          {/* <input
            className={styles.searchBar}
            type="text"
            placeholder="Search..."
          /> */}
          <div className={styles.roomBtn}>
            <h3>{enabled} Room registration</h3>
            <Switch checked={checked} onChange={handleToggle} color="primary" />
          </div>
        </div>

        <div className={styles.roomLayout}>
          <RoomLayout block={"A"} />
          {/* <RoomLayout block={"B"} />
          <RoomLayout block={"C"} />
          <RoomLayout block={"D"} />
          <RoomLayout block={"E"} />
          <RoomLayout block={"PG"} /> */}
        </div>
      </div>
  );
};

export default RoomPage;
