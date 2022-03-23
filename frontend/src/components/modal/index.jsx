import React from "react";

import styles from "./modal.module.css";

export const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.body}>
        <div onClick={onClose} className={styles.close}>
          x
        </div>
        {children}
      </div>
    </div>
  );
};
