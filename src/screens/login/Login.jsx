import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from 'react-router-dom';
import { db } from "../../config/firebase";
import { getDocs, query, where, collection } from "firebase/firestore";

const Login = () => {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate()

  const handleLogin = async () => {
    // make a call to authn authz service

    try {
      // Fetch the user's data from Firestore
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(
        query(usersRef, where("matricNo", "==", parseInt(staffId)))
      );

      if (querySnapshot.empty) {
        // User not found in the Firestore users collection
        alert('Invalid user');
        return;
      }

      const user = querySnapshot.docs[0].data();

      if (user.role === "admin") {
        // User has admin role, proceed with login
        nav('/homepage')
        // Add your logic to navigate to the desired page
      } else {
        // User does not have admin role
        alert('Invalid Login')
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.blue}>MyMahallah</h1>
        <h1 className={styles.gold}>@admin</h1>
        <input
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          type="default"
          placeholder="Staff ID"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button onClick={handleLogin}>
            <strong>Login</strong>
        </button>
      </div>
    </div>
  );
};

export default Login;
