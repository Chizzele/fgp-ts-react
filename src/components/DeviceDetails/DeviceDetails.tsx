import React, { Component } from 'react'
import { DeviceDetailsPropsInterface, DeviceDetailsStateInterface } from './DeviceDetailsInterfaces';
import './DeviceDetails.css';
export class DeviceDetails extends Component<DeviceDetailsPropsInterface, DeviceDetailsStateInterface> {
    constructor(props:DeviceDetailsPropsInterface){
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <div className={""}>
                Detail
            </div>
        )
    }
}

export default DeviceDetails
