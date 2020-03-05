import { Component } from 'react';
import { DeviceWidgetPropsInterface, DeviceWidgetStateInterface } from './DeviceWidgetInterfaces';
import './DeviceWidget.css';
export declare class DeviceWidget extends Component<DeviceWidgetPropsInterface, DeviceWidgetStateInterface> {
    constructor(props: DeviceWidgetPropsInterface);
    resizeTargets: () => void;
    zoomInHandler: () => void;
    zoomOutHandler: () => void;
    toggleWidgetExpanded: () => void;
    toggleMapExpanded: () => void;
    toggleDetailsExpanded: () => void;
    toggleBreadcrumbsExpanded: () => void;
    render(): JSX.Element;
}
export default DeviceWidget;
