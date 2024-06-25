import { v4 as uuid } from 'uuid'

export class PreviewEditor {
  constructor (containerElement, editUrl, options) {
    this.options = options || {}
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', editUrl)
    iframe.style.border = 'none'
    iframe.style.height = '100vh'
    iframe.style.width = '100%'
    this.inProgressTasks = {}

    containerElement.innerHTML = ''
    containerElement.append(iframe)

    window.addEventListener('message', this.receiveEditorMessages)

    this.iframe = iframe
    this.loaded = false
    this.onLoaded = null
    this.onError = null
  }

  close () {
    window.removeEventListener('message', this.receiveEditorMessages)
    if (this.iframe.parentNode) {
      this.iframe.parentNode.removeChild(this.iframe)
      this.iframe.setAttribute('src', '')
    }

    this.inProgressTasks = {}
  }

  updatePreview = async renderParams => {
    await this.executeEditorAction({
      message: 'UPDATE_PREVIEW',
      renderParams
    }).catch(error => {
      throw new Error(`Failed to update preview: ${error.message}`)
    })
  }

  executeEditorAction = async (message, payload) => {
    if (!this.loaded) {
      throw new Error('The Editor is not loaded.')
    }

    const id = uuid()
    if (this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(
        { id, ...JSON.parse(JSON.stringify(message)), ...payload },
        '*'
      )
    }

    // Create pending promise
    return new Promise(
      (resolve, reject) => (this.inProgressTasks[id] = { resolve, reject })
    )
  }

  receiveEditorMessages = async event => {
    if (!event.data || typeof event.data !== 'object') {
      return
    }

    if (this.iframe.contentWindow !== event.source) {
      return
    }

    const { id, message, error, ...args } = event.data

    if (id) {
      // Resolve pending promise
      const inProgressTask = this.inProgressTasks[id]
      if (inProgressTask) {
        if (error) {
          inProgressTask.reject(new Error(error))
        } else {
          inProgressTask.resolve(args)
        }

        // Clean up
        delete this.inProgressTasks[id]
      }
    } else {
      switch (message) {
        case 'ON_LOADED':
          this.loaded = true
          if (this.onLoaded) {
            await this.onLoaded(this)
          }
          break
        case 'ON_ERROR':
          this.errored = true
          if (this.onError) {
            await this.onError(this, error)
          }
          break
      }
    }
  }
}
