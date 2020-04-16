export interface NetworkPlannerPropsInterface {
    baseUrl : string; 

    selectionDevices? :  AutoCompleteDeviceItem[]; // if you want to provide your own
    
    config : NetworkPlannerConfiguration;
}

export interface NetworkPlannerStateInterface {
    selectionMade : boolean;
    selectionDevices : AutoCompleteDeviceItem[];
    deviceSelectionRows : NetworkPlannerSelectorRow[];
    timeWindow : number[];
    // parent info
    // parentDevices : DeviceWithExtensions[];
    parentDataLines : NetworkPlannerDataLineCollection[];
    //child info
    // childDevices : DeviceWithExtensions[];
    // childDataLines : any[];
    dataLines : NetworkPlannerDataLineCollection[];
    substationsLoaded : boolean;
    confirmedDevices : any[];
}

// making a class so it is easier to add new Rows
export class NetworkPlannerSelectorRow{
    name : string; // 
    id : string;
    description : string; // what is filtered on and displayed
    value : string; // the search input
    label : string; // ?
    indexKey : number; // index in the array?
    filteredItems : AutoCompleteDeviceItem[];
    showOptions : boolean; //false
    showCheck : boolean; // loading / checked
    allowConfirm : boolean; // has been selected from list 
    allowedToGo : boolean; // can begin typing
    confirmed : boolean; // whether or not the device "locked in"
    showGraph : boolean; //whether or not the graph is shown.
    graphCannotBeRendered : boolean
    constructor(indexKey?:number){
        this.name = "";
        this.id = "";
        this.description = "";
        this.label = "";
        this.value = "";
        this.indexKey = indexKey !== undefined ?  indexKey : Math.random();
        this.filteredItems = [];
        this.showOptions = false;
        this.showCheck = true;
        this.allowConfirm = true;
        this.confirmed = false;
        this.graphCannotBeRendered = false;
        this.showGraph = true;
        this.allowedToGo = false;
    }
}