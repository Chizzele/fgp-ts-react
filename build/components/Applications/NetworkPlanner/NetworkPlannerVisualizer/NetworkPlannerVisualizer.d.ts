import { Component } from 'react';
import { NetworkPlannerVisualizerPropsInterface, NetworkPlannerVisualizerStateInterface } from './NetworkPlannerVisualizerInterfaces';
import './NetworkPlannerVisualizer.css';
export declare class NetworkPlannerVisualizer extends Component<NetworkPlannerVisualizerPropsInterface, NetworkPlannerVisualizerStateInterface> {
    constructor(props: NetworkPlannerVisualizerPropsInterface);
    prepareVisualizer(): void;
    collector(parentDevice: NetworkPlannerVisualizerParentPreType, childDeviceCollection: NetworkPlannerVisualizerChildPreType[]): void;
    visualizeData(): void;
    findFeatureInLayer(): void;
    updateGraphs(): void;
    moveChild(map: any, event: any): void;
    addDummy(map: any, event: any): void;
    onClickHandler(map: any, event: any): void;
    toggleAddDummy(cb?: () => void): void;
    toggleMapVisibility(): void;
    scale(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default NetworkPlannerVisualizer;
