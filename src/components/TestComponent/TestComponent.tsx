interface Props {}
import React, { Component } from 'react'

export class TestComponent extends Component<Props> {
  render() {
    return (
      <div role='heading'>
        My First Component
      </div>
    )
  }
}

export default TestComponent
