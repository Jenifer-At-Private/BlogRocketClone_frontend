import React, { useState } from "react";
import Cookies from "universal-cookie";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import { BlogEditor } from "../components/editor";
import { Home } from "../home";
import { EditBlog } from "../editBlog";
import { PostPage } from "../blogPage";
import { Route, Routes } from "react-router-dom";

export const Main = () => {
  const cookies = new Cookies();

  const [state, setState] = useState({
    authenticated: !!cookies.get("token"),
    token: cookies.get("token"),
  });

  const updateState = (updatedState) => {
    setState({
      ...state,
      ...updatedState,
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home state={state} updateState={updateState} />}
      />
      <Route
        path="/blog/:postId"
        element={<PostPage state={state} updateState={updateState} />}
      />
      <Route
        path=":blog/edit"
        element={<EditBlog state={state} updateState={updateState} />}
      />
      <Route
        path="/blog/create"
        element={<EditBlog state={state} updateState={updateState} />}
      />

      {/* <PageEditor readOnly={false} /> */}
      {/* <EditPage /> */}
      {/* <PostPage /> */}
    </Routes>
  );
};
