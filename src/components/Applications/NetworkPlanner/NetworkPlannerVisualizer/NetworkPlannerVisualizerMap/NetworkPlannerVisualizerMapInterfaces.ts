export interface NetworkPlannerVisualizerMapPropsInterface {
    projection : string;
    initialZoom : number
    mapCenter : number[]
    // config : NetworkPlannerVisualizerMapConfig;
    onClickHandler : (map:any, event:any) => void;
    onDoubleClickHandler : (map:any, event:any) => void;
    layers : any[]
    layerChildren : any[];
    layersParents : any[];
}


export interface NetworkPlannerVisualizerMapStateInterface {
    map : any; // cant really define a map as a type
    layers : any[];
    zoomLevel : number;
    projection : string;
    highlightedFeatures : any[];
    focusedFeatures : any[];
    popupVisible : boolean;    
}

export interface VisualizerMapPopupPropsInterface {
    focusedFeatures : FocusFeatureProperties[]
    popupVisible : boolean
}

