import { Component } from 'react';
import { NetworkPlannerVisualizerMapPropsInterface, NetworkPlannerVisualizerMapStateInterface } from './NetworkPlannerVisualizerMapInterfaces';
import './NetworkPlannerVisualizerMap.css';
export declare class NetworkPlannerVisualizerMap extends Component<NetworkPlannerVisualizerMapPropsInterface, NetworkPlannerVisualizerMapStateInterface> {
    constructor(props: NetworkPlannerVisualizerMapPropsInterface);
    hoverHandler(event: any): void;
    onZoomHandler(): void;
    initMap(): void;
    componentDidMount(): void;
    componentWillReceiveProps(props: NetworkPlannerVisualizerMapPropsInterface): void;
    render(): JSX.Element;
}
export default NetworkPlannerVisualizerMap;
