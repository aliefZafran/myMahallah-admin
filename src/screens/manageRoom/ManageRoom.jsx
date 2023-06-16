import React from "react";
import { useParams } from "react-router-dom";
import RoomDetails from "../../components/cards/RoomDetails";
import { Link } from "react-router-dom";

import styles from "./manageRoom.module.css";

const ManageRoom = () => {
  const { block, level, roomNumber } = useParams();
  

  return (
    <div className={styles.content}>
      <h1>
        <Link to="/room" style={{ textDecoration: "none" }}>
          Manage Rooms
        </Link>
      </h1>
      <h2>{`Block ${block} > Room ${roomNumber} `}</h2>
      <RoomDetails block={block} level={level} roomNo={roomNumber} />
    </div>
  );
};

export default ManageRoom;
