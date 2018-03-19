import React from 'react'

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
    const { legend } = this.props
    return (
      <div style={wrapper}>
        <div style={svgWrapper}>
          <svg style={svg} id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 35.05">
            <title>bar3</title>
            <rect x="-18.23" y="-140.95" width="224" height="235" fill="none"/>
            <rect y="12" width="7.84" height="23.05" fill="#2e65a1"/>
            <rect x="0.04" y="21.67" width="7.96" height="3.71" fill="#fff"/>
            <rect x="14" width="7.84" height="19.05" fill="#2e65a1"/>
            <rect x="14.04" y="7.94" width="7.96" height="3.18" fill="#fff"/>
          </svg>
        </div>
        <div style={text}>
          <p>{legend}</p>
        </div>
      </div>
    )
  }
}
