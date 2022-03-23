import React, { Component, useState } from "react";
import { EditorState, convertToRaw, Editor as ReadOnly } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import styles from "./editor.module.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const BlogEditor = ({ editorState, onEditorStateChange, readOnly }) => {
  return (
    <>
      {readOnly ? (
        <div>
          <ReadOnly editorState={editorState} readOnly={true} />;
        </div>
      ) : (
        <div className={styles.editorStyles}>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
          />
          {/* <textarea
              disabled
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
            <div>{draftToHtml(convertToRaw(editorState.getCurrentContent()))}</div> */}
        </div>
      )}
    </>
  );
};

// export const ReadOnlyPageEditor = ({ editorState }) => {
//   return;
// };
