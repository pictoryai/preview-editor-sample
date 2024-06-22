import React, { useState } from 'react'
import EditorContainer from '../EditorContainer'
import StoryboardInput from '../StoryboardInput'
import storyboard from '../../data/storyboard.json'

const Home = () => {
  const [storyboardInput, setStoryboardInput] = useState({
    renderParams: storyboard.renderParams,
    preview: storyboard.preview
  })
  const [showStoryboardInput, setShowStoryboardInput] = useState(false)

  const onLoadPreviewClicked = ({ renderParams, preview }) => {
    setStoryboardInput({ renderParams, preview })
    setShowStoryboardInput(false)
  }

  return (
    <>
      {showStoryboardInput ? (
        <StoryboardInput
          onLoadPreviewClick={onLoadPreviewClicked}
        ></StoryboardInput>
      ) : (
        <EditorContainer
          {...storyboardInput}
          onNewStoryboardInputClick={() => setShowStoryboardInput(true)}
        ></EditorContainer>
      )}
    </>
  )
}

export default Home
