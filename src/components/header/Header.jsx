import React from 'react'
import { Link } from 'react-router-dom';

import styles from './header.module.css'


const Header = () => {
  return (
    <div className={styles.container}>
      <Link to='/homepage' style={{textDecoration:'none'}}>
        <h1 style={{cursor:'pointer', fontFamily:'IBM Plex Sans',color:'white'}}>MyMahallah<span style={{color:'var(--secondary)'}}>@admin</span></h1>
      </Link>
    </div>
  )
}

export default Header