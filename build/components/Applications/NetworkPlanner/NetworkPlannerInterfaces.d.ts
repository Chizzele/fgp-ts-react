export interface NetworkPlannerPropsInterface {
    baseUrl: string;
    referenceName: string;
    selectionDevices?: AutoCompleteDeviceItem[];
}
export interface NetworkPlannerStateInterface {
    selectionMade: boolean;
    selectionDevices: AutoCompleteDeviceItem[];
    deviceSelectionRows: NetworkPlannerSelectorRow[];
    timeWindow: number[];
    parentDevices: DeviceWithExtensions[];
    parentDataLines: any[];
    childDevices: DeviceWithExtensions[];
    childDataLines: any[];
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
    graphCannotBeRendered: boolean;
    constructor(indexKey?: number);
}
