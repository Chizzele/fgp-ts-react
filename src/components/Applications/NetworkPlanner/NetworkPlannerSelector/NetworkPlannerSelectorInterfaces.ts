export interface NetworkPlannerSelectorPropsInterface {
    confirmHandler : (searchRows:NetworkPlannerSelectorRow[], timeRange:number[]) => void;
    baseUrl : string;
    autocompleteDevices : AutoCompleteDeviceItem[];
    selectionRows : NetworkPlannerSelectorRow[];
    updateRowsHandler : (rows:NetworkPlannerSelectorRow[], index?:number, cb?:(rowIndex:number)=>void) => void;
    dateWindow : number[];
    dateWindowHandler : (timeWindow:Date[], cb?:(timeWindow:number[])=>void) => void;
    subsLoaded : boolean;
    config : NetworkPlannerConfiguration;
}

export interface NetworkPlannerSelectorStateInterface {
    
}