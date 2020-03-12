import axios from 'axios'
export function generateDevice(baseUrl:string, name:string, type:string):BasicDevice{
    let device:BasicDevice = {name: name, description: name, type:type};
    axios.get(`${baseUrl}${type}/name/${name}`)
    .then((resp) => {
        console.log(resp)
        device = {name: name, description: resp.data.description, type:type}
        return device;
    })
    .catch((err)=>{
        console.log(err);
        device = {name: name, description: name, type:type}
        return device
    })
    return device;
}

export function getExtensions(baseUrl:string, name:string, type:string, extensionNames:string[]){
    
}