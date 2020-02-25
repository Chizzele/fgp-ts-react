export interface AutoCompleteItemPropsInterface{
    searchRow : AutoCompleteSearchRow;
    item : AutoCompleteDeviceItem;
    onClick : ( item:AutoCompleteDeviceItem ) => void
    displayField? : string;
}

export interface AutoCompletePropsInterface{
    threshold : number;
    onChange? : ( indexKey : string ) => void;
    onBlur? : ( event : React.FocusEvent<HTMLInputElement> ) => void;
    onClick? : ( item:AutoCompleteDeviceItem) => void
    index : number;
    searchRow : AutoCompleteSearchRow;
    placeHolderText? : string;
    items : AutoCompleteDeviceItem[];
    matchOn? : string;
    displayField? : string;
    clickCallBack? : (items:AutoCompleteDeviceItem) => void
    changeCallBack? : (item:AutoCompleteDeviceItem[], userInput:string) => void
}

export interface AutoCompleteStateInterface{
    index : number;
    searchRow : AutoCompleteSearchRow;
}


// Standard no Widget implementations
