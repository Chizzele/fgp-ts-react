export interface NetworkPlannerSelectorRowCmpPropsInterface {
    row: NetworkPlannerSelectorRow;
    addRowHandler: () => void;
    removeRowHandler: (indexKey: number) => void;
    rowInputHandler: (key: any, indexKey: number, value: any) => void;
    onBlurHandler: (indexKey: number) => void;
    updateRowsHandler: (rows: NetworkPlannerSelectorRow[]) => void;
    onConfirmHandler: (indexKey: number) => void;
    dateWindow: number[];
    onToggleGraphHandler: (indexKey: number) => void;
    totalRows: number;
    autoCompleteItems: AutoCompleteDeviceItem[];
}
export interface NetworkPlannerSelectorRowCmpStateInterface {
}
