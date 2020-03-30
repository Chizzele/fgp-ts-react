import { Component } from 'react';
import { DeviceWidgetPropsInterface, DeviceWidgetStateInterface } from './DeviceWidgetInterfaces';
import './DeviceWidget.css';
export declare class DeviceWidget extends Component<DeviceWidgetPropsInterface, DeviceWidgetStateInterface> {
    constructor(props: DeviceWidgetPropsInterface);
    componentDidMount(): void;
    buildMapLayer(): void;
    getChildren(): Promise<void>;
    getParents(): Promise<void>;
    getDevice(): Promise<void>;
    resizeTargets: () => void;
    zoomInHandler: () => void;
    zoomOutHandler: () => void;
    toggleWidgetExpanded: () => void;
    toggleMapExpanded: () => void;
    toggleDetailsExpanded: () => void;
    toggleBreadcrumbsExpanded: () => void;
    swapTab(id: string): void;
    componentDidUpdate(): void;
    triggerMapResize(): void;
    render(): JSX.Element;
}
export default DeviceWidget;
