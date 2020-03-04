import { Component } from 'react';
import { MonitorAPIPropsInterface, MonitorAPIStateInterface } from '../FGPMonitoringInterfaces';
import './MonitorApi.css';
export declare class MonitorApi extends Component<MonitorAPIPropsInterface, MonitorAPIStateInterface> {
    constructor(props: MonitorAPIPropsInterface);
    checkApiHealth(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default MonitorApi;
