import React, { useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import FormTable from "../../components/cards/FormTable";
// import { formReq } from "../../data/formReq";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";


import styles from "./form.module.css";

const Form = () => {
  const [value, setValue] = useState("1");
  const [filterStatus, setFilterStatus] = useState("");
  const [formReq, setFormReq] = useState([]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilterStatus("");
  };

  const fetchForm = async () => {
    try {
      const formsCollectionRef = collection(db, "forms");
      const querySnapshot = await getDocs(formsCollectionRef);
  
      const formsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFormReq(formsData);
      // console.log(formReq);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };
  
  useEffect(() => {
    fetchForm();
  }, [])

  useEffect(() => {
    console.log(formReq);
  }, [formReq]);

  return (
    <div className={styles.content}>
      <h1>Maintenance Requests</h1>
      <TabContext value={value}>
        <div className={styles.tabRow}>
          <TabList value={value} onChange={handleChange}>
            {/* ada masa kita customize different tabs */}
            <Tab label="All Requests" value="1" />
            <Tab label="Pending" value="2" />
            <Tab label="Completed" value="3" />
          </TabList>
        </div>
        <TabPanel value="1">
          {
            <FormTable
              data={formReq}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          }
        </TabPanel>
        <TabPanel value="2">
          <FormTable
            data={formReq.filter((item) => item.status === "Pending")}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </TabPanel>
        <TabPanel value="3">
          <FormTable
            data={formReq.filter((item) => item.status === "Completed")}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Form;
