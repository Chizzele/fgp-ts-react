// declare module "*.module.css";

type Todo = {
    id : string;
    text : string;
    config? : json;
    isComplete : boolean;
}

type ApplicationUIConf = {
    uiId : string;
    description : string;
    applicationConf : Todo;
}

type AutoCompleteSearchRow = {
    name : string;
    id : string;
    description : string;
    confirmed : boolean,
    value : string;
    label : string;
    // meters : []
    // location : {},
    indexKey : number,
    filteredItems : AutoCompleteDeviceItem[],
    showOptions : boolean; //false
    showCheck : boolean; //true
    allowConfirm : boolean; // false
    voltageGraph : null;
    currentGraph : null;
    graphVisible : boolean; //true
    graphData : null;
    graphCannotBeRendered : boolean; //false
}

type AutoCompleteDeviceItem = {
    name? : string;
    id : string;
    description? : string
    label? : string
}
