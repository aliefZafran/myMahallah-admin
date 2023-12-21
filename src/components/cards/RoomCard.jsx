import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const RoomCard = ({ level, block }) => {
  const roomNumbers = Array.from({ length: 8 }, (_, i) => `${level}.${i + 1}`);
  
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const roomNumbers = Array.from({ length: 8 }, (_, i) => `${level}.${i + 1}`);
    const compartments = ["A", "B", "C", "D"];
    const fetchVacancies = async () => {
      try {
        const vacancies = [];
        for (const roomNo of roomNumbers) {
          for (const comp of compartments) {
            //limited the data read to fetch level and block
            const vacanciesRef = doc(
              db,
              "uthman",
              'A',
              `lvl${level}`,
              roomNo,
              "compartment",
              comp
            );
  
            const docSnapshot = await getDoc(vacanciesRef);
            if (docSnapshot.exists()) {
              const isVacant = docSnapshot.data().isVacant;
              vacancies.push({ roomNo, comp, isVacant });
            } else {
              // handle when the document does not exist
              //vacancies.push({ roomNo, comp, isVacant: false }); // assuming default value is false
            }
          }
        }
        
        setVacancies(vacancies);
        // console.log(vacancies);
      } catch (error) {
        console.error("Error retrieving vacancies:", error);
      }
    };
    fetchVacancies();
  }, [block, level]);

  return (
    <div className={styles.container}>
      <h3 style={{ fontSize: "21px" }}>Level {level}</h3>
      <div className={styles.card}>
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>Vacancies</th>
            </tr>
          </thead>
          <tbody>
            {roomNumbers.map((roomNumber, i) => {
              // Calculate the sum of the isVacant values
              const roomVacancies = vacancies.filter(v => v.roomNo === roomNumber);
              const totalVacancies = roomVacancies.reduce((sum, v) => sum + (v.isVacant ? 1 : 0), 0);
              return (
                <tr key={i}>
                  <td>
                    <Link to={`/manageroom/${block}/${level}/${roomNumber}`}>
                      {roomNumber}
                    </Link>
                  </td>
                  <td style={{ cursor: "default" }}>
                    {totalVacancies}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomCard;
