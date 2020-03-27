import axios from 'axios';
const debug = true; // set to true if you want to use local var 

export async function getDeviceExtensions(baseUrl:string, deviceName: string, deviceType: string, extensionNames:string[]): Promise<DeviceWithExtensions>{
    // api call for extenions
    return await axios.post(`${baseUrl}${deviceType}/name/${deviceName}`, {extensions : extensionNames})
    .then( resp => {
        var device3:DeviceWithExtensions = {
            name : deviceName,
            type : deviceType,
            description : resp.data["device"].description,
            extensions : resp.data
        }
        return device3
    })
    .catch( err => {
        console.log(err)
        if(debug !== true){
            var device3:DeviceWithExtensions = {"name":"20015701210","type":"nmi","description":"20015701210","extensions":{"device":{"deviceKey":{"id":"613c3e2b-851b-42e8-844a-f946701afc7e"},"name":"20015701210","type":"nmi","description":"20015701210"},"nmi_ext":{"nmiUuid":{"id":"613c3e2b-851b-42e8-844a-f946701afc7e"},"nmi":"20015701210","connectionStatus":"A","customerType":"Domestic","addressLine1":"FL xxxxxxxxx ST","addressLine2":null,"city":"GAWLER SOUTH","state":"S.A","zip":"5118","meter":"872661"}}}
        }else{
            var device3:DeviceWithExtensions = {
                description : "_fail_",
                type : "_fail_",
                name : "_fail_",
                extensions : ["_fail_"]
            }
        }
        return device3
    })   
}

export async function getDeviceParents(baseUrl:string, deviceName:string, breadCrumbPath:CrumbPathObj[]): Promise<CrumbArr>{
    var breadCrumbArray:CrumbArr = [];
    for(var i = 0; i < breadCrumbPath.length; i++){
        i === 0 ? deviceName = deviceName : deviceName = breadCrumbArray[i -1].deviceName
        await axios.get(`${baseUrl}${breadCrumbPath[i].deviceType}/${deviceName}/relation/${breadCrumbPath[i].relationName}?isParent=true`)
        .then ((resp) => {
            breadCrumbArray.push({
                deviceType : breadCrumbPath[i].parentDeviceTypeName,
                deviceTypeShortName : breadCrumbPath[i].parentDeviceTypeShortName,
                deviceName : resp.data.name,
                deviceDescription : resp.data.description,
                image : breadCrumbPath[i].image,
                linkTo : `${breadCrumbPath[i].linkTo}${resp.data.name}`
            })
        })
        .catch(err =>{
            console.log(err)
        })
    }
    return breadCrumbArray
}