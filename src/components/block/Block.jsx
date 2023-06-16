import React,{ useState, useEffect } from "react";
import styles from "./Block.module.css";
import ProgressCircle from "../progresscircle/ProgressCircle";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const Block = (props) => {

  const [quantity, setQuantity] = useState(0);
  const [text, setText] = useState(quantity);
  useEffect(() => {
    setText(quantity);
  }, [quantity]);

  useEffect(() => {
    const fetchQuantity = async () => {
      try {
        const compartmentRefs = [
          'A',
          'B',
          'C',
          'D'
        ];
        const levels = ['lvl1', 'lvl2', 'lvl3', 'lvl4']
        const roomNumbers = levels.flatMap(level => Array.from({ length: 8 }, (_, i) => `${level.slice(3)}.${i + 1}`));

        let vacantCount = 0;
        let roomNumber;
        let compartmentRef;
        let isVacant;
        let docSnapshot;
        for (const level of levels) {
          for (roomNumber of roomNumbers) {
            for (compartmentRef of compartmentRefs) {
              const docRef = doc(db, 'uthman', props.block , level, roomNumber, 'compartment', compartmentRef);
              docSnapshot = await getDoc(docRef);
              if (docSnapshot.exists()){
              isVacant = docSnapshot.data().isVacant;
              if (isVacant) {
                vacantCount++;
              }
              }
            }
          }  
        }
        // console.log(vacantCount);
        setQuantity(vacantCount);
      } catch (error) {
        console.error('Error fetching quantity:', error);
      }
    };

    fetchQuantity();
  });

  return (
    <div className={styles.block}>
      <h4 className={styles.text}>Block</h4>
      <h4 className={styles.text}>{props.block}</h4>
      <ProgressCircle
        quantity={quantity}
        text={text}
        max={128}
        path={props.path}
        textcolor={props.textcolor}
        trailcolor={props.trailcolor}
      />
    </div>
  );
};

export default Block;
