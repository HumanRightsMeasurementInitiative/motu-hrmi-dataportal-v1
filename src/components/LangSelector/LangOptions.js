import React from 'react'
import PropTypes from 'prop-types'

export default class LangOptions extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSelect: PropTypes.func.isRequired,
    optionClassNames: PropTypes.string,
  }

  onClickHandler = (e) => {
    e.stopPropagation()
    this.props.onSelect(this.props.children, e)
  }

  render() {
    const { children, optionClassNames } = this.props
    return (
      <li className={optionClassNames} onClick={this.onClickHandler}>{children}</li>
    )
  }
}
