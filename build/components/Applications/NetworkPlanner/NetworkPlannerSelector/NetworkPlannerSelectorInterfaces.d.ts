export interface NetworkPlannerSelectorPropsInterface {
    confirmHandler: () => void;
    baseUrl: string;
    autocompleteDevices: AutoCompleteDeviceItem[];
    selectionRows: NetworkPlannerSelectorRow[];
    updateRowsHandler: (rows: NetworkPlannerSelectorRow[], index?: number, cb?: (rowIndex: number) => void) => void;
    dateWindow: number[];
    dateWindowHandler: (timeWindow: Date[], cb?: (timeWindow: number[]) => void) => void;
    subsLoaded: boolean;
    config: NetworkPlannerConfiguration;
    dataLineUpdateHandler: (lineCollection: NetworkPlannerDataLineCollection) => void;
}
export interface NetworkPlannerSelectorStateInterface {
    graphList: {
        graph: any;
        elemId: string;
    }[];
    tempValidChildren: any[];
}
