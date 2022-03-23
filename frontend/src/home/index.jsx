import React, { useEffect, useState } from "react";

import styles from "./home.module.css";

import { ReactComponent as Logo } from "../asset/logo.svg";
import { Button } from "../components/button";
import { Blog } from "../components/blog";
import { getBlogs } from "../services/apiCalls";
import { Modal } from "../components/modal";
import { SignIn, SignUp } from "../auth";
import { useNavigate } from "react-router-dom";

import logoPath from "./logrocketLogo.png";

export const Home = ({ state, updateState }) => {
  const [posts, setPosts] = useState([]);

  const [isSignIn, setSignIn] = useState(false);
  const [isSignUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getBlogs().then((data) => {
      console.log(data);
      setPosts(data);
      let postObj = {};
      data.map((value) => {
        postObj[value._id] = value;
      });
      updateState({ posts: postObj });
    });
  }, []);

  const onStartWriting = () => {
    if (!state.authenticated) {
      setSignIn(true);
      return;
    }
    navigate("/blog/create");
  };

  return (
    <>
      <div>
        <TopNav
          onSignIn={() => {
            setSignIn(true);
          }}
          onSignUp={() => {
            setSignUp(true);
          }}
          state={state}
        />
        <div className={styles.homeBody}></div>
        <div className={styles.homePostBody}>
          {posts.map((post) => {
            return (
              <>
                <Blog
                  onClick={() => {
                    navigate(`/blog/${post._id}`);
                  }}
                  onEdit={(e) => {
                    e.stopPropagation();
                    navigate(`/${post._id}/edit`);
                  }}
                  key={post._id}
                  post={post}
                />
                {/* <div
                  onClick={() => {
                    navigate(`/${post._id}/edit`);
                  }}
                  className={styles.edit}
                >
                  Edit
                </div> */}
              </>
            );
          })}
        </div>
      </div>
      {isSignIn && (
        <Modal
          onClose={() => {
            setSignIn(false);
          }}
        >
          <SignIn
            state={(state, updateState)}
            updateState={(state, updateState)}
          />
        </Modal>
      )}
      {isSignUp && (
        <Modal
          onClose={() => {
            setSignUp(false);
          }}
        >
          <SignUp />
        </Modal>
      )}
    </>
  );
};

const TopNav = ({ state, onSignIn, onSignUp }) => {
  return (
    <div className={styles.topNav}>
      <div className={styles.logoHead}>
        {/* <Logo className={styles.logo} /> */}
        <img src={logoPath} alt="" className={styles.imgClass} />
      </div>
      {!state.authenticated && (
        <div className={styles.navOption}>
          <div>
            <Button onClick={onSignIn} buttonType={"PLAIN"}>
              Sign In
            </Button>
          </div>
          <div>
            <Button onClick={onSignUp}>Get Started</Button>
          </div>
        </div>
      )}
    </div>
  );
};
