import React from "react";
import Block from "../../components/block/Block";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import styles from "./homeRoom.module.css";


const HomeRoomCard = () => {
  const nav = useNavigate();
  return (
    <div className={styles.roomvacancy}>
      <h1 className={styles.title}>Room Vacancies</h1>
      <div className={styles.context1}>
        <div className={styles.blockRow}>
          <Block
            block={"A"}
            path={"#772f1a"}
            textcolor={"#A65D50"}
            trailcolor={"#e4d5d1"}
          />
          <Block
            block={"B"}
            path={"#ff6d00"}
            textcolor={"#ff6d00"}
            trailcolor={"#ffe2cc"}
          />
          <Block
            block={"C"}
            path={"#F4D35E"}
            textcolor={"#FFBD00"}
            trailcolor={"#FBEDBF"}
          />
        </div>
        {/* <div className={styles.blockRow}>
          <Block
            block={"D"}
            quantity={32}
            max={32}
            path={"#0077B6"}
            textcolor={"#00476d"}
            trailcolor={"#CAF0F8"}
          />
          <Block
            block={"E"}
            quantity={32}
            max={32}
            path={"#662e9b"}
            textcolor={"#662e9b"}
            trailcolor={"#e0d5eb"}
          />
          <Block
            block={"PG"}
            quantity={32}
            max={32}
            path={"#3C6E71"}
            textcolor={"#1E3739"}
            trailcolor={"#B1C5C6"}
          />
        </div> */}
      </div>
      <div className={styles.btnRow}>
        <Button
          onClick={() => {
            nav("/room");
          }}
          size="small"
          variant="contained"
        >
          View Rooms
        </Button>
      </div>
    </div>
  );
};

export default HomeRoomCard;
