import React from 'react'
import { debounce } from 'lodash'

const listeners = []

function listenerWrapper() {
  listeners.forEach(listener => {
    listener()
  })
}

function addListener(fn) {
  listeners.push(fn)
}

function removeListener(fn) {
  const index = listeners.findIndex(fn)
  listeners.splice(index, 1)
}

const listenerWrapperDebounced = debounce(listenerWrapper, 500)

window.addEventListener('resize', listenerWrapperDebounced)
window.addEventListener('orientationchange', listenerWrapperDebounced)

export default function rerenderOnResize(Target, property, descriptor) {
  return class RerenderedOnResize extends React.Component {
    onResize = () => {
      console.log('RERENDER')
      this.forceUpdate()
    }

    componentDidMount() {
      addListener(this.onResize)
    }

    componentWillUnmount() {
      removeListener(this.onResize)
    }

    render() {
      return <Target {...this.props} />
    }
  }
}
