export interface DeviceWidgetPropsInterface {
    breadCrumbsExpanded?: boolean;
    detailsExpanded?: boolean;
    mapExpanded?: boolean;
    widgetExpanded?: boolean;
    zoomHandler?: boolean;
    cssClassesToShrink?: string[];
    topTabs?: ContentTab[];
    breadCrumbs?: CrumbArr;
    breadCrumbPath?: any[];
    toggleWidgetExpandedCb?: (widgetToggleState: boolean) => void;
    zoomHandlerCb?: (zoomLevel: number) => void;
    toggleBreadCrumbsExpandedCb?: (breadCrumbToggleState: boolean) => void;
    toggleDetailsExpandedCb?: (detailsToggleState: boolean) => void;
    toggleMapExpandedCb?: (detailsToggleState: boolean) => void;
    basicDevice?: BasicDevice;
    deviceWithExtensions?: DeviceWithExtensions;
    extensionNames: string[];
    baseUrl: string;
    zoomLevel?: number;
    mapCenter?: number[];
    layers?: any[];
    featureStyles?: FeatureStyle[];
    deviceLatLonFields: string[];
    projection?: string;
    mapOnClickCallBack?: () => void;
    mapOnDoubleClickCallBack?: () => void;
    processorConfig?: any;
}
export interface DeviceWidgetStateInterface {
    breadCrumbsExpanded: boolean;
    detailsExpanded: boolean;
    mapExpanded: boolean;
    widgetExpanded: boolean;
    zoomHandler: boolean;
    zoomLevel: number;
    triggerMapResize: boolean;
    breadCrumbs: CrumbArr;
    breadCrumbsLoaded: boolean;
    cssClassesToShrink: string[];
    topTabs: ContentTab[];
    device: DeviceWithExtensions;
    deviceIsLoaded: boolean;
    couldntLoadDevice: boolean;
    processorConfig?: any;
    layers: any[];
    projection: string;
}
