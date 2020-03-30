import { BooleanLiteral } from "@babel/types";

export interface DeviceWidgetPropsInterface {
    // widget props
    breadCrumbsExpanded? : boolean;
    detailsExpanded? : boolean;
    mapExpanded? : boolean;
    widgetExpanded? : boolean
    zoomHandler? : boolean
    cssClassesToShrink? : string[];
    topTabs? : ContentTab[];

    // breadcrumb props
    breadCrumbs? : CrumbArr;
    breadCrumbPath? : any[];

    //children props
    isParent? : boolean;
    childrenRelations? : ChildRelationObj[];

    //callbacks 
    toggleWidgetExpandedCb? : (widgetToggleState:boolean) => void;
    zoomHandlerCb? : (zoomLevel:number) => void
    toggleBreadCrumbsExpandedCb? : (breadCrumbToggleState:boolean) => void
    toggleDetailsExpandedCb? : (detailsToggleState:boolean) => void
    toggleMapExpandedCb? : (detailsToggleState:boolean) => void

    //device
    basicDevice?: BasicDevice;
    deviceWithExtensions?: DeviceWithExtensions;
    extensionNames : string[];

    //api
    baseUrl : string;

    //map
    zoomLevel? : number;
    mapCenter? : number[]; 
    layers ? : any[];
    featureStyles? : FeatureStyle[];
    deviceLatLonFields : string[]; // pass [latName, lngName]
    projection? : string;
    mapOnClickCallBack? : () => void;
    mapOnDoubleClickCallBack? : () => void;
    redirectOnMapSingleClick?  : boolean;
    redirectOnMapDoubleClick? : boolean;

    //device extension config
    processorConfig? : any
}

export interface DeviceWidgetStateInterface {
    breadCrumbsExpanded : boolean;
    detailsExpanded : boolean;
    mapExpanded : boolean;
    widgetExpanded : boolean
    zoomHandler : boolean;
    zoomLevel : number;
    triggerMapResize : boolean;

    breadCrumbs : CrumbArr;
    breadCrumbsLoaded : boolean;

    cssClassesToShrink : string[];
    topTabs : ContentTab[];
    device : DeviceWithExtensions;

    deviceIsLoaded : boolean;
    couldntLoadDevice : boolean
    processorConfig? : any; 

    layers : any[];
    projection : string;

    isParent : boolean;

    children : ChildDeviceCollection[];
}
