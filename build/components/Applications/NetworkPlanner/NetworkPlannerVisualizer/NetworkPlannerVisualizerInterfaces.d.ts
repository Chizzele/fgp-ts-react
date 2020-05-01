export interface NetworkPlannerVisualizerPropsInterface {
    rawDataLines: NetworkPlannerDataLineCollection[];
    dateWindow: number[];
    config: NetworkPlannerVisualizerMapConfig;
    selectionRows: NetworkPlannerSelectorRow[];
    baseUrl: string;
}
export interface NetworkPlannerVisualizerStateInterface {
    map: any;
    visualizerReady: boolean;
    layers: any[];
    layersParent: any[];
    layersChildren: any[];
    addDummy: boolean;
    mapVisible: boolean;
    rowsProcessed: boolean;
    scaleFactor: number;
    completeParents: NetworkPlannerVisualizerParentPreType[];
    completeChildren: NetworkPlannerVisualizerChildPreType[];
    mapCenter: number[];
    tracker: trackerNWP[];
}
