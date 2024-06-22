import React, { Fragment, useState } from "react";
import API from '../../services/API';
import useErrorHandler from "../../utils/errorHandler";
import Editor from "../Editor";
import Error from "../Error";
import Loader from "../Loader";
import Video from "../Video";

const EditorContainer = () => {
  const [showEditor, setShowEditor] = useState(false);
  const { error, showError, handleClose } = useErrorHandler();
  const [editorUrl, setEditorUrl] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  return (
    <Fragment>
      <Loader show={showLoader}></Loader>
      <Editor onError={showError} editorUrl={editorUrl}></Editor>
      <Error open={error !== null} handleClose={handleClose} message={error} />
    </Fragment>
  );
};

export default EditorContainer;
