import React, { Fragment, useState } from "react";
import API from '../../services/API';
import useErrorHandler from "../../utils/errorHandler";
import Editor from "../Editor";
import Error from "../Error";
import Loader from "../Loader";
import { Grid } from "@mui/material";

const EditorContainer = () => {
  const [showEditor, setShowEditor] = useState(false);
  const { error, showError, handleClose } = useErrorHandler();
  const [editorUrl, setEditorUrl] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  return (
    <Fragment>
      <Loader show={showLoader}></Loader>
      <Error open={error !== null} handleClose={handleClose} message={error} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={6}>
          <Editor onError={showError} editorUrl={editorUrl}></Editor>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditorContainer;
