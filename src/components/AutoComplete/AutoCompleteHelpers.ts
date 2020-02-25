export function configureDisplayField(displayField:string, item:AutoCompleteDeviceItem){
    let displayKey = displayField;
    if(item[displayKey]){
        return item[displayKey];
    }else{
        return item.description
    }
}