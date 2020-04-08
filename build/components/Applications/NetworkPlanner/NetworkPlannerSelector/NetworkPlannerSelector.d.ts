import { Component } from 'react';
import { NetworkPlannerSelectorPropsInterface, NetworkPlannerSelectorStateInterface } from './NetworkPlannerSelectorInterfaces';
import "react-datepicker/dist/react-datepicker.css";
import '../NetworkPlanner.css';
export declare class NetworkPlannerSelector extends Component<NetworkPlannerSelectorPropsInterface, NetworkPlannerSelectorStateInterface> {
    constructor(props: NetworkPlannerSelectorPropsInterface);
    addSelectionRow(): void;
    removeSelectionRow(indexKey: number): void;
    inputChangeHandler(key: any, indexKey: number, value: any): void;
    onBlurHandler(indexKey: number): void;
    onConfirmHandler(indexKey: number): void;
    onToggleGraphHandler(indexKey: number): void;
    testCb(): void;
    render(): JSX.Element;
}
export default NetworkPlannerSelector;
