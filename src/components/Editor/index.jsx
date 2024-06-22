import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import API from '../../services/API';
import { PreviewEditor } from "../../previewEditor";
import Loader from "../Loader";

const Editor = ({ editorUrl, onError }) => {
  const editorContainerRef = useRef(null);
  const [previewEditor, setPreviewEditor] = useState(null);
  const [accessTokenIntervalId, setAccessTokenIntervalId] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    return () => {
      if (accessTokenIntervalId) {
        clearInterval(accessTokenIntervalId);
      }
      if (previewEditor) {
        previewEditor.close();
      }
    }
  }, []);

  useLayoutEffect(() => {
    let editor = new PreviewEditor(editorContainerRef.current, "https://development.d3nakplooji4fy.amplifyapp.com/preview/53ea1251-5afa-4301-ae89-1f5ea62efd65");
    editor.onLoaded = onEditorLoaded;
    editor.onError = onEditorErrored;
    setPreviewEditor(editor);
  }, []);

  const onEditorLoaded = async (editor) => {
    setShowLoader(false);
    await editor.configurePreview({
      showHeader:false,
      showWarning: false,
    });
    setShowLoader(false);
  }

  const onEditorErrored = (editor, error) => {
    onError && onError(error);
  }

  return <>
    <Loader show={showLoader}></Loader>
    <Box sx={{ display: "flex", height: "80%", width: "100%", flexDirection: "column", boxSizing: "border-box", opacity: showLoader ? 0 : 1 }} ref={editorContainerRef}>
    </Box>
  </>
};

export default Editor;
