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

type CrumbPathObj = {
    relationName : string;
    deviceType : string;
    linkTo? : string;
    image? : string // one of "icp", "circuit", "transformer", "substation", "feeder", "gxp"
    parentDeviceTypeShortName : string;
    parentDeviceTypeName : string
}
////////END BREADCRUMBS TYPES////////


////////BEGIN DEVICE TYPES////////
type BasicDevice = {
    description : string;
    name : string;
    type : string;
}

type DeviceWithExtensions = {
    description : string;
    name : string;
    type : string;
    extensions : any;
}

type ChildDeviceCollection = {
    devices : DeviceWithExtensions[];
    relationKey : string;
    childType : string;
}
////////END DEVICE TYPES////////


//////START DEVICE WIDGET TYPES////////
type ChildRelationObj = {
    relationName : string;
    childType : string;
    parentType : string;
    childExtensions? : string[] 
    isParentFlag : boolean
}

type DeviceFromGetRequest = {
    deviceKey : {id : string},
    name : string;
    type : string;
    description : string;
}

////////END DEVICE WIDGET TYPES////////

////////BEGIN CONFIG TYPES////////
type DeviceConfig = {
    excludedColumns : string[];
    mutatedColumns : MutatedColumns[];
    redirectColumns : RedirectColumns[];
    relation_excludedColumns : RelationExcludedColumns[];
    relation_mutatedColumns : RelationMutatedColumns[];
    relation_redirectColumns : RelationRedirectColumns[];
    relation_renameColumns : RelationRenameColumns[];
}

type MutatedColumns = {
    key : string;
    style : string;
} 

type RedirectColumns = {
    key : string;
    redirectTo : string;
}

type RelationRedirectColumns = {
    key : string;
    redirect : string;
    extension : string
} 

type RelationRenameColumns = {
    key : string;
    extension : string;
    desiredKey : string;
}

type RelationMutatedColumns = {
    key : string;
    extension : string;
    style : string;
}

type RelationExcludedColumns = {
    key : string;
    extension : string;
}

type RawExtensionDataForProcessor = {
    data : any;
    relationship: string;
}

type CleanedExtensionDataForProcessor = {
    data : any;
    title : string;
    style : string;
    key : any;
    redirect : string;
    extension : any;
    styleValue? : any;
}

////////END CONFIG TYPES /////////

////////BEGIN MAP TYPES////////
type FeatureStyle = {
    fillColor : string;
    strokeColor : string;
    strokeWidth : number;
    initRadius : number;
} 


type FocusFeatureProperties = {
    name : string;
    id : string;
    description : string;
    type : string;
    additionalInfo? : any
}
////////BEGIN MAP TYPES////////