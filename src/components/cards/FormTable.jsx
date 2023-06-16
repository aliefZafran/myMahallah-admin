import React, { useState } from "react";
import styles from "./formtable.module.css";
import { Link } from "react-router-dom";

const FormTable = ({ data, filterStatus, setFilterStatus }) => {
  const formattedDates = data.map((item) => {
    const timestamp = item.timestamp.toDate();
    const day = String(timestamp.getDate()).padStart(2, "0");
    const month = String(timestamp.getMonth() + 1).padStart(2, "0");
    const year = String(timestamp.getFullYear()).slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  });

  const filteredData =
    filterStatus === ""
      ? data
      : data.filter((item) => item.status === filterStatus);

  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = a.timestamp.toDate();
    const dateB = b.timestamp.toDate();
    return dateB - dateA;
  });

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th style={{ width: "15%" }}>Date</th>
            <th style={{ width: "12%" }}>Request ID</th>
            <th style={{ width: "22%" }}>Issue</th>
            <th style={{ width: "18%" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{formattedDates[index]}</td>
              <td>
                <Link className={styles.link} to={`/form/id/${item.id}`}>
                  {item.id}
                </Link>
              </td>
              <td>
                <Link className={styles.link} to={`/form/id/${item.id}`}>
                  {item.issue}
                </Link>
              </td>
              <td>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/form/id/${item.id}`}
                >
                  {item.status}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormTable;
