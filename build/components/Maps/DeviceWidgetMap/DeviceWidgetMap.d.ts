import { Component } from 'react';
import { DeviceWidgetMapPropsInterface, DeviceWidgetMapStateInterface } from './DeviceWidgetMapInterfaces';
import './DeviceWidgetMap.css';
export declare class DeviceWidgetMap extends Component<DeviceWidgetMapPropsInterface, DeviceWidgetMapStateInterface> {
    constructor(props: DeviceWidgetMapPropsInterface);
    componentDidMount(): void;
    hoverHandler(event: any): void;
    styleHandlerZoom(): void;
    triggerResize(): void;
    redirectToPoint(event: any): void;
    buildMap(): void;
    componentWillReceiveProps(prevProps: any): void;
    render(): JSX.Element;
}
export default DeviceWidgetMap;
