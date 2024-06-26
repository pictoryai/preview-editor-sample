import React, { useEffect, useState, useRef } from 'react'
import API from '../../services/API'
import useErrorHandler from '../../utils/errorHandler'
import Editor from '../Editor'
import Error from '../Error'
import Loader from '../Loader'
import { Grid, Button } from '@mui/material'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'
import { v4 as uuid } from 'uuid'

const EditorContainer = ({
  renderParams,
  preview,
  onNewStoryboardInputClick
}) => {
  const editorContainerRef = useRef(null)
  const [jsonEditor, setJsonEditor] = useState(null)
  const [updatedRenderParams, setUpdatedRenderParams] = useState(null)
  const [showStoryboardButton, setShowStoryboardButton] = useState(false)

  useEffect(() => {
    if (editorContainerRef.current.children.length === 0) {
      const options = {}
      const editor = new JSONEditor(editorContainerRef.current, {
        onChangeText: onPreviewJsonChange
      })
      editor.set(renderParams)
      setJsonEditor(editor)
    }
  }, [])

  const onPreviewJsonChange = jsonText => {
    let inputRenderParams = JSON.parse(jsonText)
    if (inputRenderParams.scenes && inputRenderParams.scenes.length > 0) {
      for (let scene of inputRenderParams.scenes) {
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
    setUpdatedRenderParams(inputRenderParams)
  }

  const onTryStoryboardResponseClick = () => {
    onNewStoryboardInputClick && onNewStoryboardInputClick()
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} ref={editorContainerRef}></Grid>
      <Grid item xs={6}>
        <Grid item container direction='column'>
          <Grid item sx={{ height: '60vh' }}>
            <Editor
              renderParams={updatedRenderParams}
              previewUrl={preview}
              onPreviewLoaded={() => setShowStoryboardButton(true)}
            ></Editor>
          </Grid>
          <Grid
            container
            item
            sx={{ height: '40vh' }}
            alignItems='flex-start'
            justifyContent='center'
          >
            {showStoryboardButton && (
              <Button
                variant='contained'
                color='primary'
                sx={{
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
                onClick={onTryStoryboardResponseClick}
              >
                Try your Storyboard response
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EditorContainer
