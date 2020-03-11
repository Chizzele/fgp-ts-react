export interface DeviceWidgetPropsInterface {
    breadCrumbsExpanded? : boolean;
    detailsExpanded? : boolean;
    mapExpanded? : boolean;
    widgetExpanded? : boolean
    zoomHandler? : boolean

    cssClassesToShrink? : string[];
    topTabs? : ContentTab[];
    breadCrumbs? : CrumbArr;

    toggleWidgetExpandedCb? : (widgetToggleState:boolean) => void;
    zoomHandlerCb? : (zoomLevel:number) => void
    toggleBreadCrumbsExpandedCb? : (breadCrumbToggleState:boolean) => void
    toggleDetailsExpandedCb? : (detailsToggleState:boolean) => void
    toggleMapExpandedCb? : (detailsToggleState:boolean) => void

    completeDevice?: BasicDevice;

    baseUrl : string;
}

export interface DeviceWidgetStateInterface {
    breadCrumbsExpanded : boolean;
    detailsExpanded : boolean;
    mapExpanded : boolean;
    widgetExpanded : boolean
    zoomHandler : boolean;
    zoomLevel : number;

    breadCrumbs : CrumbArr;
    cssClassesToShrink : string[];
    topTabs : ContentTab[];
    device : BasicDevice;
}
