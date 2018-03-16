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

export default class Bar2 extends React.Component {
  render() {
    return (
      <div style={wrapper}>
        <div style={svgWrapper}>
          <svg style={svg}id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 17.05">
            <title>bar2</title>
            <rect x="-25.23" y="-103.4" width="224" height="235" fill="none"/>
            <rect width="7.84" height="17.05" fill="#2e65a1"/>
            <rect x="0.04" y="6.94" width="7.96" height="3.18" fill="#fff"/>
          </svg>
        </div>
        <div style={text}>
          <p>prova</p>
        </div>
      </div>
    )
  }
}
