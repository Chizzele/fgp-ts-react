import { Component } from 'react';
import { NetworkPlannerPropsInterface, NetworkPlannerStateInterface, NetworkPlannerSelectorRow } from './NetworkPlannerInterfaces';
import './NetworkPlanner.css';
export declare class NetworkPlanner extends Component<NetworkPlannerPropsInterface, NetworkPlannerStateInterface> {
    constructor(props: NetworkPlannerPropsInterface);
    retrieveAutoCompleteItems(): AutoCompleteDeviceItem[];
    componentDidMount(): void;
    confirmSelection(): void;
    changeTimeWindow(timeWindow: Date[], cb: (timeWindow: number[]) => void): void;
    setRows(rows: NetworkPlannerSelectorRow[], index?: number, cb?: (myIndex: number) => void): void;
    render(): JSX.Element;
}
export default NetworkPlanner;
