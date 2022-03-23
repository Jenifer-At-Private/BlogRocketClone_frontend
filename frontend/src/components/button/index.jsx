import React from "react";

import styles from "./button.module.css";

export const Button = ({ children, buttonType, ...props }) => {
  if (buttonType === "PLAIN") {
    return (
      <button className={styles.plainButton} {...props}>
        {children}
      </button>
    );
  }

  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};
