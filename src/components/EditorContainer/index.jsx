import React, { useEffect, useState, useRef } from 'react'
import API from '../../services/API'
import useErrorHandler from '../../utils/errorHandler'
import Editor from '../Editor'
import Error from '../Error'
import Loader from '../Loader'
import { Grid } from '@mui/material'
import storyboard from '../../data/storyboard.json'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'
import { v4 as uuid } from 'uuid'

const EditorContainer = () => {
  const editorContainerRef = useRef(null)
  const [jsonEditor, setJsonEditor] = useState(null)
  const [renderParams, setRenderParams] = useState(null)

  useEffect(() => {
    if (editorContainerRef.current.children.length === 0) {
      const options = {}
      const editor = new JSONEditor(editorContainerRef.current, {
        onChangeText: onPreviewJsonChange
      })
      editor.set(storyboard.renderParams)
      setJsonEditor(editor)
    }
  }, [])

  const onPreviewJsonChange = jsonText => {
    let renderParams = JSON.parse(jsonText)
    if (renderParams.scenes && renderParams.scenes.length > 0) {
      for (let scene of renderParams.scenes) {
        if (
          scene.background &&
          scene.background.src &&
          scene.background.src.length > 0
        ) {
          for (let src of scene.background.src) {
            src.resource_id = uuid()
          }
        }
      }
    }
    setRenderParams(renderParams)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} ref={editorContainerRef}></Grid>
      <Grid item xs={6}>
        <Editor
          renderParams={renderParams}
          editorUrl={storyboard.preview}
        ></Editor>
      </Grid>
    </Grid>
  )
}

export default EditorContainer
