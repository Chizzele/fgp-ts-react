export interface NetworkPlannerSelectorPropsInterface {
    confirmHandler : (searchRows:NetworkPlannerSelectorRow[], timeRange:number[]) => void;
    baseUrl : string;
    autocompleteDevices : AutoCompleteDeviceItem[];
    selectionRows : NetworkPlannerSelectorRow[];
    updateRowsHandler : (rows:NetworkPlannerSelectorRow[]) => void;
    dateWindow : number[];
    dateWindowHandler : (timeWindow:Date[], cb:(timeWindow:number[])=>void) => void;
}

export interface NetworkPlannerSelectorStateInterface {
    subsLoading : boolean;
    autocompleteDevices : AutoCompleteDeviceItem[]
}