export interface AutoCompleteItemPropsInterface{
    searchRow : AutoCompleteSearchRow;
    item : AutoCompleteDeviceItem;
    onClick : ( event:React.MouseEvent<HTMLLIElement>, indexKey : number, item:AutoCompleteDeviceItem ) => void;
}

export interface AutoCompletePropsInterface{
    threshold : number;
    onChange? : ( indexKey : string ) => void;
    onBlur? : ( id : string ) => void;
    onClick? : ( event:React.MouseEvent<HTMLLIElement>, indexKey : number, item:AutoCompleteDeviceItem ) => void
    index : number;
    searchRow : AutoCompleteSearchRow;
    placeHolderText? : string;
    items : AutoCompleteDeviceItem[];
    matchOn? : string;
}

export interface AutoCompleteStateInterface{
    index : number;
    searchRow : AutoCompleteSearchRow;
}


// Standard no Widget implementations
