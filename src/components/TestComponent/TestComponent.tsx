import {TestPropsInterface} from '../../interfaces';

import React, { Component } from 'react'

export class TestComponent extends Component<TestPropsInterface> {
  constructor(props:TestPropsInterface){
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div role='heading'>
        {this.props.headingText}
        {this.props.backupText}
      </div>
    )
  }
}

export default TestComponent
