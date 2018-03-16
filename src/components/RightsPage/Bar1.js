import React from 'react'
import styles from './style.css'

const wrapper = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
}
const svgWrapper = {
  alignSelf: 'flex-start',
  marginRight: '5px',
}
const svg = {
  height: '70px',
}
const text = {
  flexGrow: 1,
  alignSelf: 'center',
}

export default class Bar1 extends React.Component {
  render() {
    return (
      <div style={wrapper}>
        <div style={svgWrapper}>
          <svg style={svg} id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 37.05">
            <title>bar1</title>
            <rect x="-25.23" y="-47.95" width="224" height="235" fill="none"/>
            <rect width="8" height="37.05" fill="#2e65a1"/>
            <rect x="0.04" y="17.08" width="7.96" height="2.89" fill="#fff"/>
          </svg>
        </div>
        <div style={text}>
          <p>prova</p>
        </div>
      </div>
    )
  }
}
