import React, { useState } from "react";
import bcrypt from "bcryptjs";
import styles from "./settings.module.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const Settings = () => {
  const mahallah = [
    {
      value: "Uthman",
    },
    {
      value: "Ali",
    },
    {
      value: "Siddiq",
    },
    {
      value: "Farouq",
    },
    {
      value: "Bilal",
    },
    {
      value: "Zubair",
    },
  ];
  // usestate
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const [matricNo, setMatricNo] = useState("");
  const [name, setName] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [selectedMahallah, setSelectedMahallah] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (matricNo && event.target.value) {
      const matricNoSlice = matricNo.slice(-4);
      const trimmedName = event.target.value.trim();
      setStudentPassword(
        `${matricNoSlice}${trimmedName.replace(/\s+/g, "").slice(0, 5)}`
      );
    } else {
      setStudentPassword("");
    }
  };

  const handleMatricNoChange = (event) => {
    setMatricNo(event.target.value);
    if (event.target.value && name) {
      const nameSlice = name.replace(/\s+/g, "").slice(0, 5);
      setStudentPassword(`${event.target.value.slice(-4)}${nameSlice}`);
    } else {
      setStudentPassword("");
    }
  };

  const handleMahallahChange = (event) => {
    setSelectedMahallah(event.target.value);
  };

  const handleClickShowStudentPassword = () => {
    setShowStudentPassword(!showStudentPassword);
  };
  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmedPassword = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };

  const hashPassword = async (passW) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPW = await bcrypt.hash(passW, salt);
      return hashPW;
    } catch (e) {
      console.log("Error hashing password: ", e);
    }
  };

  const postData = async (data) => {
    try {
      const hashedPassword = await hashPassword(studentPassword);

      const data = {
        name: name,
        matricNo: parseInt(matricNo),
        password: hashedPassword,
        mahallah: selectedMahallah,
        role: "student",
        pfp: "https://firebasestorage.googleapis.com/v0/b/mymahallah-652b1.appspot.com/o/pfp%2Fuser.png?alt=media&token=7fc89cd7-1137-4b12-9756-06acbb2bf043&_gl=1*1ts8y4b*_ga*MTY2NTQzMTgzMy4xNjgwNTcyNjY5*_ga_CW55HF8NVT*MTY4NTk2MTE0NC42Mi4xLjE2ODU5NjE0MzAuMC4wLjA.",
      };
      await addDoc(collection(db, "users"), data);
      alert("user added"); //nnti try design the popup to be better
    } catch (err) {
      alert("error encountered");
    }
  };

  // main
  return (
    <div className={styles.content}>
      <div style={{ paddingBottom: "12px", borderBottom: "1px solid #D9D9D9" }}>
        <h2>Add New Student</h2>
        <div className={styles.container}>
          <div className={styles.col}>
            <TextField
              id="outlined-basic"
              label="Matric No"
              variant="outlined"
              required
              value={matricNo}
              onChange={handleMatricNoChange}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              variant="outlined"
              type={showStudentPassword ? "text" : "password"}
              disabled
              value={studentPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowStudentPassword}
                    >
                      {showStudentPassword ? (
                        <VisibilityOff />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={styles.col}>
            <TextField
              style={{ width: "30vw" }}
              id="outlined-basic"
              label="Student's Name"
              variant="outlined"
              required
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className={styles.col}>
            <TextField
              style={{ width: "10vw" }}
              id="outlined-select"
              value={selectedMahallah}
              select
              label="Mahallah"
              onChange={handleMahallahChange}
            >
              {mahallah.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button
            style={{ margin: "12px 20px" }}
            variant="contained"
            onClick={postData}
          >
            Add
          </Button>
        </div>
      </div>
      {/* <div>
        <h2>Change Admin Password</h2>
        <div className={styles.containerCol}>
          <div className={styles.row}>
            <p style={{ width: "40%" }}>Current Password:</p>
            <TextField
              style={{ width: "60%" }}
              id="outlined-old-password"
              variant="outlined"
              type={showCurrentPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCurrentPassword}
                    >
                      {showCurrentPassword ? (
                        <VisibilityOff />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={styles.row}>
            <p style={{ width: "40%" }}>New Password:</p>
            <TextField
              style={{ width: "60%" }}
              id="outlined-new-password"
              variant="outlined"
              type={showNewPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                    >
                      {showNewPassword ? <VisibilityOff /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={styles.row}>
            <p style={{ width: "40%" }}>Confirm New Password:</p>
            <TextField
              style={{ width: "60%" }}
              id="outlined-confirm-password"
              variant="outlined"
              type={showConfirmedPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmedPassword}
                    >
                      {showConfirmedPassword ? (
                        <VisibilityOff />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={styles.row} style={{ padding: "8px 0" }}>
            <Button variant="contained">Save</Button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Settings;
