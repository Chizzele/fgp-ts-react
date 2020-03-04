export interface DeviceWidgetPropsInterface {
    breadCrumbsExpanded? : boolean;
    detailsExpanded? : boolean;
    mapExpanded? : boolean;
    widgetExpanded? : boolean
    toggleWidgetExpandedCb? : (toggleState:boolean) => void;
}

export interface DeviceWidgetStateInterface {
    breadCrumbsExpanded : boolean;
    detailsExpanded : boolean;
    mapExpanded : boolean;
    widgetExpanded : boolean
}