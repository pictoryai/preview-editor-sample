import React, { useEffect, useState, useRef } from 'react'
import { Typography, Button, Box } from '@mui/material'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'

const StoryboardInput = ({ onLoadPreviewClick }) => {
  const editorContainerRef = useRef(null)
  const jsonEditorRef = useRef(null)
  const [storyboardResponse, setStoryboardResponse] = useState(null)

  useEffect(() => {
    if (
      editorContainerRef.current &&
      editorContainerRef.current.children.length === 0
    ) {
      const editor = new JSONEditor(editorContainerRef.current, {
        mode: 'code',
        onChange: onStoryboardInputChange
      })
      jsonEditorRef.current = editor
    }
  }, [])

  const onStoryboardInputChange = () => {
    try {
      let storyBoardInputText = jsonEditorRef.current.get()
      setStoryboardResponse(storyBoardInputText)
    } catch (error) {
      console.log(error)
    }
  }

  const onLoadPreviewEditorClick = () => {
    if (storyboardResponse) {
      if (
        storyboardResponse.data &&
        storyboardResponse.data.renderParams &&
        storyboardResponse.data.preview
      ) {
        onLoadPreviewClick &&
          onLoadPreviewClick({
            renderParams: storyboardResponse.data.renderParams,
            preview: storyboardResponse.data.preview
          })
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <Box
        sx={{
          padding: 2,
          backgroundColor: '#e0e0e0',
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        <Typography variant='h6'>Storyboard Response Input</Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        ref={editorContainerRef}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 2
        }}
      >
        <Button
          variant='contained'
          color='primary'
          onClick={onLoadPreviewEditorClick}
        >
          Load Preview Editor
        </Button>
      </Box>
    </Box>
  )
}

export default StoryboardInput
