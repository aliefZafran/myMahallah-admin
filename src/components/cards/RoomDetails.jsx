import React, { useState, useEffect } from "react";
import styles from "./roomdetails.module.css";
import { db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const RoomDetails = ({ block, level, roomNo }) => {
  // const [data, setData] = useState([
  //   {
  //     compartment: "A",
  //     name: "John Doe",
  //     matricNo: "1234",
  //     remarks: "",
  //     keyCollected: false,
  //   },
  //   {
  //     compartment: "B",
  //     name: "Jane Smith",
  //     matricNo: "5678",
  //     remarks: "",
  //     keyCollected: false,
  //   },
  //   {
  //     compartment: "C",
  //     name: "Bob Johnson",
  //     matricNo: "9012",
  //     remarks: "",
  //     keyCollected: false,
  //   },
  //   {
  //     compartment: "D",
  //     name: "Alice Lee",
  //     matricNo: "3456",
  //     remarks: "",
  //     keyCollected: false,
  //   },
  // ]);

  const nav = useNavigate();

  const goBack = () => {
    nav("/room");
  };

  const [roomData, setRoomData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const compartment = ["A", "B", "C", "D"];

  const fetchVacancies = async () => {
    try {
      const anotherRoomData = [];
      for (const comp of compartment) {
        const compartmentRef = doc(
          db,
          "uthman",
          block,
          `lvl${level}`,
          roomNo,
          "compartment",
          comp
        );
        const docSnapshot = await getDoc(compartmentRef);
        if (docSnapshot.exists()) {
          const compartmentData = {
            compartment: comp, // Include the compartment value
            ...docSnapshot.data(),
          };

          anotherRoomData.push(compartmentData);
        } else {
        }
      }
      setRoomData(anotherRoomData);
    } catch (err) {
      console.log("Error fetching room details: ", err);
    }
  };

  useEffect(() => {
    fetchVacancies();
  });

  // useEffect(() => {
  //   console.log('roomData', roomData); // Console log the room data whenever it changes
  // }, [roomData]);

  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    
    setCheckedItems(updatedCheckedItems);
  };

  const updateKey = async () => {
    try {
      const updatedRoomData = roomData.map((item, index) => {
        return {
          ...item,
          keyCollected: checkedItems[index] || item.keyCollected
        };
      });
  
      // Update the Firestore with the updated room data
      // ...
      for (const updatedItem of updatedRoomData) {
        const compartmentRef = doc(
          db,
          "uthman",
          block,
          `lvl${level}`,
          roomNo,
          "compartment",
          updatedItem.compartment
        );
  
        await updateDoc(compartmentRef, {
          keyCollected: updatedItem.keyCollected
        });
      }
      
      console.log('data updated');
      // Reset the checkedItems state
      setCheckedItems([]);
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  return (
    <div className={styles.table}>
      <h1>
        {block} {level} {roomNo}
      </h1>
      <table>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Comp</th>
            <th style={{ width: "40%" }}>Name</th>
            <th style={{ width: "20%" }}>Matric No</th>
            <th style={{ width: "16%" }}>Remarks</th>
            <th style={{ width: "14%" }}>Key Collected</th>
          </tr>
        </thead>
        <tbody>
          {roomData.map((item, index) => (
            <tr key={index}>
              <td>{item.compartment}</td>
              <td>{item.name}</td>
              <td>{item.matricNo}</td>
              <td>{item.registered ? "Registered" : ""}</td>
              <td>
                <input
                  type="checkbox"
                  checked={checkedItems[index] || item.keyCollected}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.btnRow}>
        <Button
          onClick={goBack}
          variant="contained"
          size="small"
          sx={{ backgroundColor: "var(--lightGray)", width: "80px" }}
          style={{ marginRight: "20px" }}
          className={styles.btnCancel}
        >
          Cancel
        </Button>
        <Button onClick={updateKey} variant="contained" size="small" sx={{ width: "80px" }}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default RoomDetails;
