export interface DeviceWidgetPropsInterface {
    breadCrumbsExpanded? : boolean;
    detailsExpanded? : boolean;
    mapExpanded? : boolean;
    widgetExpanded? : boolean
    zoomHandler? : boolean
    cssClassesToShrink? : string[];
    topTabs? : ContentTab[];
    toggleWidgetExpandedCb? : (widgetToggleState:boolean) => void;
    zoomHandlerCb? : (zoomLevel:number) => void
    toggleBreadCrumbsExpandedCb? : (breadCrumbToggleState:boolean) => void
    toggleDetailsExpandedCb? : (detailsToggleState:boolean) => void
    toggleMapExpandedCb? : (detailsToggleState:boolean) => void
}

export interface DeviceWidgetStateInterface {
    breadCrumbsExpanded : boolean;
    detailsExpanded : boolean;
    mapExpanded : boolean;
    widgetExpanded : boolean
    zoomHandler : boolean;
    zoomLevel : number;
    cssClassesToShrink : string[];
    topTabs : ContentTab[];
}