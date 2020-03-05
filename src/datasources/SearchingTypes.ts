const DefaultSearchingTypes:SearchingTypeArray = [
    {
        "key": "==\"*?*\"",
        "label": "Include"
    },{
        "key": "==*?*",
        "label": "In List"
    },{
        "key": "!=*?*",
        "label": "Not In List"
    },{
        "key": "<?",
        "label": "Less Than"
    },{
        "key": ">?",
        "label": "Greater Than"
    },{
        "key": "<=?",
        "label": "Less Than or Equal To"
    },{
        "key": ">=?",
        "label": "Greater Than or Equal To"
    },{
        "key": "!=\"?\"",
        "label": "Not Equal To"
    },{
        "key": "==\"?\"",
        "label": "Equal To"
    },{
        "key": "=isnull=true",
        "label": "Is Null"
    },{
        "key": "=isnull=false",
        "label": "Not Null"
    }
];

export {
    DefaultSearchingTypes
}