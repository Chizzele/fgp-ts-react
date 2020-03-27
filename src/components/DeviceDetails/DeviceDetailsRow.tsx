import React, { Component } from 'react'
import { DeviceDetailsRowPropsInterface } from './DeviceDetailsInterfaces';
import Moment from 'react-moment'; 
export class DeviceDetailsRow extends Component<DeviceDetailsRowPropsInterface> {
    constructor(props:DeviceDetailsRowPropsInterface){
        super(props)
    }

    componentDidMount(){    
        console.log(this.props.dataRow.data)
    }
    render() {
        return (
            <span >
                {`${this.props.dataRow.title}  : `}
                <label className="fgReact_assetLabel" >{
                    this.props.dataRow.style === 'datetime' ? <Moment date={this.props.dataRow.data} format={"lll"}></Moment> : // date time style
                    this.props.dataRow.style === 'currency' ? <span>{`A$${this.props.dataRow.data}`}</span> : // currency style
                    this.props.dataRow.style === 'decimal' ? <span>{`${this.props.dataRow.data.toFixed(this.props.dataRow.styleValue)}`}</span> :
                        <span>{this.props.dataRow.data}</span> // default style
                }</label>
            </span>
        )
    }
}

export default DeviceDetailsRow
