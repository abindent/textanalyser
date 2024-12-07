import React from "react";

import styles from "./css/preloader.module.css";

export default function Preloader() {
  return (
    <div className={styles.container}>
      <span className={styles.text}>
        Loading
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
      </span>
      
    </div>

  );
}