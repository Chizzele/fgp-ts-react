export interface NetworkPlannerVisualizerMapPropsInterface {
    projection: string;
    initialZoom: number;
    mapCenter: number[];
    onClickHandler: (map: any, event: any) => void;
    onDoubleClickHandler: (map: any, event: any) => void;
    layers: any[];
    layerChildren: any[];
    layersParents: any[];
}
export interface NetworkPlannerVisualizerMapStateInterface {
    map: any;
    layers: any[];
    zoomLevel: number;
    projection: string;
    highlightedFeatures: any[];
    focusedFeatures: any[];
    popupVisible: boolean;
}
export interface VisualizerMapPopupPropsInterface {
    focusedFeatures: FocusFeatureProperties[];
    popupVisible: boolean;
}
