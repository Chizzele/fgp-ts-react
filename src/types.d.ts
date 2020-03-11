declare module '*.png' // allowing images
////////BEGIN AUTOCOMPLETE TYPES////////
// Search Row of Autcomplete
type AutoCompleteSearchRow = {
    name : string;
    id : string;
    description : string;
    confirmed : boolean,
    value : string;
    label : string;
    indexKey : number,
    filteredItems : AutoCompleteDeviceItem[],
    showOptions : boolean; //false
}
// currently unused
type AutoCompleteSearchRowNWP = {
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

// the structure of a device expected by the autocomplete item arrays
type AutoCompleteDeviceItem = {
    name : string;
    id : string;
    description : string
    label : string
}
////////END AUTOCOMPLETE TYPES////////


////////BEGIN API MONITORING TYPES////////

////////END API MONITORING TYPES////////

////////BEGIN DEVICE PAGE TYPES////////
type ContentTab = {
    title : string;
    id : string;
    hasContent : boolean;
    active : boolean;
    content? : any;
    collapsedContent? : any;
}
////////END DEVICE PAGE TYPES////////
////////BEGIN SPLASHSCREEN TYPES////////

type SplashReferenceQuery = {
    returnSize : number;
    pageNumber : number;
    rsql : string; // this is a special string which much utilise one or more the searching types and criteria delimited by <$> 
}

type SplashWidgetArray = HTMLDivElement[]; // 

////////END SPLASHSCREEN TYPES////////



////////BEGIN SEARCHINGTYPE TYPES////////
type SearchingTypeArray = SearchingType[]

type SearchingType = {
    key : string;
    label : string;
}
////////END SEARCHINGTYPE TYPES////////


////////BEGIN BREADCRUMBS TYPES////////
type CrumbArr = Crumb[]

type Crumb = {
    deviceType : string;
    deviceTypeShortName : string;
    deviceName : string;
    deviceDescription : string;
    linkTo? : string;
    image? : string // one of "icp", "circuit", "transformer", "substation", "feeder", "gxp"
}
////////END BREADCRUMBS TYPES////////


////////BEGIN DEVICE TYPES////////
type BasicDevice = {
    description : string;
    name : string;
    type : string;
}
////////END DEVICE TYPES////////