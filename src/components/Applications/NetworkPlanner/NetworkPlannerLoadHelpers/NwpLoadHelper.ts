// import moment from  'moment';

// const MAX_BYTE_SIZE = 5000000;
// const LOCAL_STORAGE_KEY = 'fgp_nwp_sub_store'
// const LOCAL_STORAGE_KEY_TS = 'fgp_nwp_sub_store_ts'
// const LOCAL_STORAGE_KEY_PS = 'fgp_nwp_sub_store_ps'

// export default class NwpLoadHelper {
//     MAX_BYTE_SIZE : number;
//     LOCAL_STORAGE_KEY : string;
//     LOCAL_STORAGE_KEY_TS : string;
//     LOCAL_STORAGE_KEY_PS : string;
//     constructor(){
//         this.MAX_BYTE_SIZE = MAX_BYTE_SIZE; // this is the maximum size for the lowest spec browser for the byte size for a local storage item.
//         this.LOCAL_STORAGE_KEY = LOCAL_STORAGE_KEY;
//         this.LOCAL_STORAGE_KEY_TS = LOCAL_STORAGE_KEY_TS;
//         this.LOCAL_STORAGE_KEY_PS = LOCAL_STORAGE_KEY_PS;
//     }

//     checkStorageKey(){
//         let exists;
//         localStorage.getItem(this.LOCAL_STORAGE_KEY) ? exists = true : exists = false;
//         return exists;
//     }

//     checkTimestampKey(){
//         let isFresh;
//         let exists;
//         localStorage.getItem(this.LOCAL_STORAGE_KEY_TS) !== null ? exists = true : exists = false;
//         // if it exists, check if it is stale (1 day)
//         if(exists){
//             let timestamp = localStorage.getItem(this.LOCAL_STORAGE_KEY_TS);
//             let startOfDay = moment().startOf('day').valueOf();
//             // if timestamp newer than start of today
//             if(timestamp > startOfDay){
//                 isFresh = true
//             }else{
//                 isFresh = false
//             }
//         }else{
//             isFresh = exists;
//         }
//         return isFresh;
//     }

//     checkData(){
//         if(`${localStorage.getItem(this.LOCAL_STORAGE_KEY_PS)}_0`){
//             return true;
//         }else{
//             return false;
//         }
//     }

//     fetchDataFromLs(){
//         let partitionCount = `${localStorage.getItem(this.LOCAL_STORAGE_KEY_PS)}`;
//         let data = [];
//         // sticking together the array from storage based on partition size  and returning
//         for (let x = 0; x < partitionCount; x++) {
//             let temp = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY_PS+'_'+x));
//             data = data.concat(temp)
//         }
//         return data;
//     }

//     logInfo(){
//         console.log(`Storage Key = ${localStorage.getItem(this.LOCAL_STORAGE_KEY)}`)
//         console.log(`Storage TS = ${localStorage.getItem(this.LOCAL_STORAGE_KEY_TS)}`)
//         console.log(`Storage Partitions = ${localStorage.getItem(this.LOCAL_STORAGE_KEY_PS)}`)
//         console.log(`TS Fresh? = ${this.checkTimestampKey()}`)
//     }

//     setStorageKey(){
//         localStorage.setItem(this.LOCAL_STORAGE_KEY, true);
//     }

//     setTimestamp(){
//         localStorage.setItem(this.LOCAL_STORAGE_KEY_TS, moment().valueOf())
//     }

//     // breaks the data into json packets which are suitable for the max size of a local storage item
//     setStorageItems(data){
//         let stringifiedData = JSON.stringify(data); 
//         if(new Blob([stringifiedData]).size < this.MAX_BYTE_SIZE){
//             // clear
//             localStorage.removeItem(this.LOCAL_STORAGE_KEY_PS+'_0')
//             localStorage.removeItem(this.LOCAL_STORAGE_KEY_PS+'_1')
//             localStorage.removeItem(this.LOCAL_STORAGE_KEY_PS+'_2')
//             localStorage.removeItem(this.LOCAL_STORAGE_KEY_PS+'_3')
//             localStorage.removeItem(this.LOCAL_STORAGE_KEY_PS+'_4')
//             localStorage.setItem(this.LOCAL_STORAGE_KEY_PS+'_0', stringifiedData)
//             // setting partition size
//             localStorage.setItem(this.LOCAL_STORAGE_KEY_PS, 1)
//         }else{
//             // clear
//             localStorage.removeItem(this.LOCAL_STORAGE_KEY_PS+'_0')
//             localStorage.removeItem(this.LOCAL_STORAGE_KEY_PS+'_1')
//             localStorage.removeItem(this.LOCAL_STORAGE_KEY_PS+'_2')
//             localStorage.removeItem(this.LOCAL_STORAGE_KEY_PS+'_3')
//             localStorage.removeItem(this.LOCAL_STORAGE_KEY_PS+'_4')
//             // if the size of the object is too big, we need to break it up
//             // create partitions
//             let partitions = Math.ceil(new Blob([stringifiedData]).size/this.MAX_BYTE_SIZE);
//             let partitionSize = Math.ceil(data.length / partitions);
//             var partitionedArrays = [];
//             for(var i = 0; i < partitions; i++){
//                 partitionedArrays.push([...data].splice( (i*partitionSize), partitionSize))
//                 localStorage.setItem(
//                     this.LOCAL_STORAGE_KEY_PS+"_"+i, //the key
//                     JSON.stringify([...data].splice( (i*partitionSize), partitionSize))
//                 );
//             }  
//             localStorage.setItem(this.LOCAL_STORAGE_KEY_PS, partitions)
//         }
//     }
// }