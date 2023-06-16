import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { db } from "../../config/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import styles from "./manageform.module.css";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({
  width: "90%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#555",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#555",
    },
  },
});

const ManageForm = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [formReq, setFormReq] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const fetchForm = async () => {
    try {
      const formDocRef = doc(db, "forms", id);
      const formDocSnapshot = await getDoc(formDocRef);

      if (formDocSnapshot.exists()) {
        const timestamp = formDocSnapshot.data().timestamp.toDate();
        const formattedDate = timestamp.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        });

        const formData = {
          id: formDocSnapshot.id,
          date: formattedDate,
          ...formDocSnapshot.data(),
        };

        if (formData.status === "New") {
          // Update the form status to "Pending"
          await updateDoc(formDocRef, { status: "Pending" });

          // Update the formData object
          formData.status = "Pending";
        }
        setFormReq(formData);
        setRemarks(formData.remarks);
        setIsComplete(formData.isComplete);
      } else {
        console.log("Form not found");
      }
      // console.log(formReq);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  const goBack = () => {
    nav("/forms");
  };

  const handleSave = async () => {
    try {
      // Update the database with the new remarks value
      await updateDoc(doc(db, "forms", id), {
        remarks: remarks,
        isComplete: isComplete,
        status: isComplete? 'Completed': 'Pending',
      });
  
      // Perform any additional actions after the update
      console.log("Remarks updated successfully!");
      goBack();
    } catch (error) {
      console.error("Error updating remarks:", error);
    }
  }

  useEffect(() => {
    fetchForm();
  }, []);

  useEffect(() => {
    console.log(formReq);
  }, [formReq]);

  return (
    <div className={styles.content}>
      <h1>{`Request ID: ${id}`}</h1>
      <h2 style={{ fontSize: "26px" }}>Details</h2>
      <div className={styles.container}>
        <div className={styles.col1}>
          <h2 style={{ marginTop: "20px", marginBottom: 0 }}>Date</h2>
          <div className={styles.info}>{formReq.date}</div>

          <h2 style={{ marginTop: "20px", marginBottom: 0 }}>Issue</h2>
          <div className={styles.info}>{formReq.issue}</div>

          <h2 style={{ marginTop: "20px", marginBottom: 0 }}>Matric No</h2>
          <div className={styles.info}>{formReq.matricNo}</div>

          <h2 style={{ marginTop: "20px", marginBottom: 0 }}>Room</h2>
          <div className={styles.info}>{formReq.room}</div>

          <h2 style={{ marginTop: "20px", marginBottom: 0 }}>Description</h2>
          <div className={styles.info} style={{ width: "80%" }}>
            {formReq.description}
          </div>
        </div>

        <div className={styles.col2}>
          <h2 style={{ marginTop: "20px", marginBottom: 0 }}>Remarks</h2>
          <CustomTextField
            style={{ marginTop: "14px" }}
            placeholder="Enter remarks"
            variant="outlined"
            multiline
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />

          <FormGroup style={{ marginTop: "20px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isComplete}
                  onChange={(e) => setIsComplete(e.target.checked)}
                />
              }
              label="Mark as complete"
            />
          </FormGroup>

          <div className={styles.btnSave}>
            <Button onClick={handleSave} variant="contained">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageForm;
