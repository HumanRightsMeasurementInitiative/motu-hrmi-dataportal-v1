import React from 'react'
import PropTypes from 'prop-types'

export default class DropdownOptions extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSelect: PropTypes.func.isRequired,
    optionClassNames: PropTypes.string,

  }

  onClickHandler = () => {
    this.props.onSelect(this.props.children)
  }

  render() {
    const { children, optionClassNames } = this.props
    return (
      <li className={optionClassNames} onClick={this.onClickHandler}>{children}</li>
    )
  }
}
