import React,{ useState, useEffect } from 'react'
import ProgressCircle from "../../components/progresscircle/ProgressCircle";
import Maintenance from "../../components/maintenance/Maintenance";
import styles from './homeMaintenance.module.css'
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const HomeMaintenance = () => {
  const [totalForms, setTotalForms] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [text, setText] = useState(completedCount);
  useEffect(() => {
    setText(completedCount);
  }, [completedCount]);

  useEffect(() => {
    const fetchFormStats = async () => {
      try {
        const formsRef = collection(db, 'forms');
        const formsSnapshot = await getDocs(formsRef);
    
        const total = formsSnapshot.size;
    
        let pending = 0;
      let completed = 0;

      formsSnapshot.forEach((doc) => {
        const status = doc.data().status;
        if (status === 'Pending') {
          pending++;
        } else if (status === 'Completed') {
          completed++;
        }
      });

      setTotalForms(total);
      setPendingCount(pending);
      setCompletedCount(completed);
      } catch (error) {
        console.error('Error fetching form statistics:', error);
      }
    };
    
    fetchFormStats();
  },[totalForms])
  

  return (
    <div className={styles.maintenance}>
          <h1 className={styles.title}>Maintenance Request</h1>
          <div className={styles.context2}>
            <Maintenance title={"Forms Submitted"} quantity={totalForms} />
            <Maintenance title={"Request Pending"} quantity={pendingCount} />
            <div className={styles.completed}>
              <h4>Completed</h4>
              <ProgressCircle
                quantity={completedCount}
                text={text}
                max={totalForms}
                path={"#38B000"}
                textcolor={"#1C5800"}
                trailcolor={"#C3E7B3"}
              />
            </div>
          </div>
        </div>
  )
}

export default HomeMaintenance