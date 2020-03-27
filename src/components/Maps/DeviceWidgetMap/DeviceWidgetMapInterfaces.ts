export interface DeviceWidgetMapPropsInterface {
    mapId : string
    triggerResize : boolean;
    zoomLevel? : number;
    mapCenter? : number[]; 
    layers ? : any[];
    featureStyles? : FeatureStyle[];
    projection? : string;
}

export interface DeviceWidgetMapStateInterface {
    map : any; // cant really define a map as a type
    layers : any[];
    mapCenter : number[];
    zoomLevel : number;
    projection : string;
    highlightedFeatures : any[];
    focusedFeatures : any[];
    popupVisible : boolean;
}

export interface MapPopupPropsInterface {
    popupVisible : boolean;
    focusedFeatures : any[];
}