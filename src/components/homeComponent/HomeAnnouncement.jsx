import React, { useState, useEffect } from "react";
import { Button, Modal, TextField, IconButton } from "@mui/material";
import { feedData } from "../../data/feedData";
import Feed from "../feed/Feed";
import AddIcon from "@mui/icons-material/Add";
import styles from "./homeAnnouncement.module.css";
import { db } from "../../config/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const HomeAnnouncement = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [feedData, setFeedData] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    setModalOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setModalOpen(false);
    setAnnouncement('');
  }
  const handlePost = async (announcement) => {
    try {
      const postsRef = collection(db, "posts");
      const pfpUrl =
        "https://firebasestorage.googleapis.com/v0/b/mymahallah-652b1.appspot.com/o/pfp%2FUthman.png?alt=media&token=3b8b1a39-9d29-47ae-ad09-c1980b514e14";
      await addDoc(postsRef, {
        content: announcement,
        timestamp: new Date(),
        name: "Mahallah Office @ Uthman",
        matricNo: 0,
        pfp: pfpUrl,
      });
    } catch (err) {
      console.log(err);
    }
    console.log("Post submitted", { announcement });
    handleClose();
  };

  const fetchPost = async (name) => {
    try {
      const postsRef = collection(db, "posts");
      const querySnapshot = await getDocs(
        query(postsRef, where("name", "==", name))
      );
      const fetchedAnnouncement = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const pfp = data.pfp;
        const timestamp = data.timestamp.toDate();
        const hours = timestamp.getHours().toString().padStart(2, "0");
        const minutes = timestamp.getMinutes().toString().padStart(2, "0");
        const time = `${hours}:${minutes}`;
        const date = timestamp.toISOString().split("T")[0];
        return { id, pfp, date, time, ...data };
      });

      setFeedData(fetchedAnnouncement);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchPost("Mahallah Office @ Uthman");
  }, [modalOpen]);

  return (
    <div className={styles.announcement}>
      <h1 className={styles.title}>Announcements</h1>
      <div className={styles.context3}>
        {feedData.sort((a, b) => b.timestamp - a.timestamp).map((item, index) => (
          <Feed
            key={index}
            pfp={item.pfp}
            date={item.date}
            time={item.time}
            content={item.content}
          />
        ))}
      </div>
      <div className={styles.btn}>
        <IconButton onClick={handleOpen}>
          <AddIcon sx={{ color: "white", fontSize: "60px" }} />
        </IconButton>
      </div>

      {/* Popup */}
      <Modal open={open} onClose={handleClose}>
        <div className={styles.popup}>
          <div className={styles.popupContainer}>
            <h2 style={{ marginBottom: "12px" }}>Post Announcement</h2>
            <TextField
              sx={{
                width: "100%",
              }}
              id="post-content"
              label="Write here..."
              multiline
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              rows={6}
              variant="outlined"
            />
            <div className={styles.button}>
              <Button
                onClick={handleClose}
                variant="contained"
                size="small"
                sx={{ backgroundColor: "var(--lightGray)", width: "80px" }}
                style={{ marginRight: "12px" }}
                className={styles.btnCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handlePost(announcement);
                }}
                style={{ backgroundColor: "var(--primary)" }}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HomeAnnouncement;
