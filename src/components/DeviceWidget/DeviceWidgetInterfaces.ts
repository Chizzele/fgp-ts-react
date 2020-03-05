export interface DeviceWidgetPropsInterface {
    breadCrumbsExpanded? : boolean;
    detailsExpanded? : boolean;
    mapExpanded? : boolean;
    widgetExpanded? : boolean
    zoomHandler? : boolean
    zoomHandlerCb? : (zoomLevel:number) => void
    toggleWidgetExpandedCb? : (toggleState:boolean) => void;
    cssClassesToShrink? : string[];
}

export interface DeviceWidgetStateInterface {
    breadCrumbsExpanded : boolean;
    detailsExpanded : boolean;
    mapExpanded : boolean;
    widgetExpanded : boolean
    zoomHandler : boolean;
    zoomLevel : number;
    cssClassesToShrink : string[];
}