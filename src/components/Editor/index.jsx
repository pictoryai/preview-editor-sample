import { Box } from '@mui/material'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import API from '../../services/API'
import { PreviewEditor } from '../../previewEditor'
import Loader from '../Loader'

const Editor = ({ renderParams, previewUrl, onError, onPreviewLoaded }) => {
  const editorContainerRef = useRef(null)
  const [previewEditor, setPreviewEditor] = useState(null)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    return () => {
      if (previewEditor) {
        previewEditor.close()
      }
    }
  }, [])

  useEffect(() => {
    if (renderParams) {
      previewEditor.updatePreview(renderParams)
    }
  }, [renderParams])

  useLayoutEffect(() => {
    let editor = new PreviewEditor(editorContainerRef.current, previewUrl)
    editor.onLoaded = onEditorLoaded
    editor.onError = onEditorErrored
    setPreviewEditor(editor)
  }, [])

  const onEditorLoaded = async editor => {
    setShowLoader(false)
    onPreviewLoaded && onPreviewLoaded();
  }

  const onEditorErrored = (editor, error) => {
    onError && onError(error)
  }

  return (
    <>
      <Loader show={showLoader}></Loader>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          boxSizing: 'border-box',
          opacity: showLoader ? 0 : 1
        }}
        ref={editorContainerRef}
      ></Box>
    </>
  )
}

export default Editor
