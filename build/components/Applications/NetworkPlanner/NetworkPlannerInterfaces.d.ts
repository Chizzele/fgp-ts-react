export interface NetworkPlannerPropsInterface {
    baseUrl: string;
    selectionDevices?: AutoCompleteDeviceItem[];
    selectorConfig: NetworkPlannerConfiguration;
    visualizerConfig: NetworkPlannerVisualizerMapConfig;
}
export interface NetworkPlannerStateInterface {
    selectionMade: boolean;
    selectionDevices: AutoCompleteDeviceItem[];
    deviceSelectionRows: NetworkPlannerSelectorRow[];
    timeWindow: number[];
    parentDataLines: NetworkPlannerDataLineCollection[];
    dataLines: NetworkPlannerDataLineCollection[];
    substationsLoaded: boolean;
    confirmedDevices: any[];
}
export declare class NetworkPlannerSelectorRow {
    name: string;
    id: string;
    description: string;
    value: string;
    label: string;
    indexKey: number;
    filteredItems: AutoCompleteDeviceItem[];
    showOptions: boolean;
    showCheck: boolean;
    allowConfirm: boolean;
    allowedToGo: boolean;
    confirmed: boolean;
    showGraph: boolean;
    childrenAssigned: string[];
    childrenDevices: DeviceWithExtensions[];
    graphCannotBeRendered: boolean;
    constructor(indexKey?: number);
}
