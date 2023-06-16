import React from "react";
import Button from '@mui/material/Button';
import styles from "./Maintenance.module.css";
import { useNavigate } from "react-router-dom";

const Maintenance = (props) => {
  const nav = useNavigate();

  return (
    <>
      <div className={styles.maintain}>
        <h4>{props.title}</h4>
        <h1 style={{fontSize:'60px'}}>{props.quantity}</h1>
        <Button onClick={() => nav('/forms')} size='small' variant="contained">View Requests</Button>
      </div>
    </>
  );
};

export default Maintenance;
