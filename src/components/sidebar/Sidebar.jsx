import React,{ useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";
import Button from "@mui/material/Button";

const Sidebar = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  return (
    <div className={styles.sideContainer}>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link to="/"  className={`${styles.link} ${activePage === "/" ? styles.activeLink : ""}`}>
              Homepage
            </Link>
          </li>
          <li>
            <Link to="/room"  className={`${styles.link} ${activePage === "/room" ? styles.activeLink : ""}`}>
              Room
            </Link>
          </li>
          <li>
            <Link to="/forms"  className={`${styles.link} ${activePage === "/forms" ? styles.activeLink : ""}`}>
              Forms
            </Link>
          </li>
        </ul>
      </div>


      <div className={styles.bottomMenu}>
        <ul>
          <li>
            <Link to="/settings" className={`${styles.link} ${activePage === "/settings" ? styles.activeLink : ""}`}>Settings</Link>
          </li>
        </ul>
          <Button variant="contained" color="error" size="small" style={{marginLeft:'4px'}}>
            <Link to='/login' style={{textDecoration:'none', color:'white'}} >Logout</Link>
          </Button>
      </div>
    </div>
  );
};

export default Sidebar;
