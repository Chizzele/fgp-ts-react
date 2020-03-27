import { Component } from 'react';
import { DeviceDetailsPropsInterface, DeviceDetailsStateInterface } from './DeviceDetailsInterfaces';
import './DeviceDetails.css';
export declare class DeviceDetails extends Component<DeviceDetailsPropsInterface, DeviceDetailsStateInterface> {
    constructor(props: DeviceDetailsPropsInterface);
    componentDidMount(): void;
    renderData(): void;
    render(): JSX.Element;
}
export default DeviceDetails;
