import React, { useState } from "react";
import Cookies from "universal-cookie";

import styles from "./auth.module.css";
import { Button } from "../components/button";
import { signIn, signUp } from "../services/apiCalls";

export const SignIn = ({ state, updateState }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleClick = () => {
    signIn(user).then((data) => {
      console.log(data);
      const cookies = new Cookies();
      cookies.set("token", JSON.stringify(data.token), { path: "/" });
      updateState({ authenticated: true, userId: data._id, token: data.token });
    });
  };

  return (
    <div className={styles.authCont}>
      <div className={styles.authTitle}>Sign In</div>
      <div>
        <input
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          type="text"
          className={styles.textBox}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          type="text"
          className={styles.textBox}
          placeholder="Password"
        />
      </div>
      <div>
        <Button onClick={handleClick}>Sign In</Button>
      </div>
    </div>
  );
};
export const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleClick = () => {
    console.log(user);
    signUp(user).then((data) => {
      console.log(data);
    });
  };
  return (
    <div className={styles.authCont}>
      <div className={styles.authTitle}>Sign Up</div>
      <div>
        <input
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          type="text"
          className={styles.textBox}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          type="text"
          className={styles.textBox}
          placeholder="Password"
        />
      </div>
      <div>
        <input
          onChange={(e) => {
            setUser({ ...user, confirmPassword: e.target.value });
          }}
          type="text"
          className={styles.textBox}
          placeholder="Confirm Password"
        />
      </div>
      <div>
        <Button onClick={handleClick}>Sign Up</Button>
      </div>
    </div>
  );
};
