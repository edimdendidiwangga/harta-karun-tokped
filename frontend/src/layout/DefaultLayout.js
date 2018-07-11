import React from 'react'

export default class extends React.Component {
  render () {
    const { children } = this.props
    return (
      <div>
        { children }
      </div>
    )
  }
}
