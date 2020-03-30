export interface DeviceWidgetMapPropsInterface {
    mapId: string;
    triggerResize: boolean;
    zoomLevel?: number;
    mapCenter?: number[];
    layers?: any[];
    featureStyles?: FeatureStyle[];
    projection?: string;
    onClickCallBack?: () => void;
    onDoubleClickCallBack?: () => void;
    redirectOnMapSingleClick?: boolean;
    redirectOnMapDoubleClick?: boolean;
}
export interface DeviceWidgetMapStateInterface {
    map: any;
    layers: any[];
    mapCenter: number[];
    zoomLevel: number;
    projection: string;
    highlightedFeatures: any[];
    focusedFeatures: any[];
    popupVisible: boolean;
}
export interface MapPopupPropsInterface {
    popupVisible: boolean;
    focusedFeatures: any[];
}
