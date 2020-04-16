import axios from 'axios';
// import moment from 'moment';
import {DataHandler} from '@future-grid/fgp-graph/lib/services/dataService'
import {GraphSeries, DataRequestTarget} from '@future-grid/fgp-graph/lib/metadata/configurations'
import '@future-grid/fgp-graph/lib/css/graph.css'
export default class NwpDataSelectorService implements DataHandler {
    source : string;
    baseUrl : string;
    cb : (data:{substationId : string, rowIndex : number, data : [], timeWindow:number[], deviceType:string}) => void;
    fetchFirstNLast : (ids: Array<string>, deviceType: string, interval: string, fields?: Array<string>) => Promise<Array<any>>
    fetchdata : (ids: Array<string>, deviceType: string, interval: string, range: {start: number, end: number }, fields?: Array<string>, seriesConfig?: Array<GraphSeries>, target?: DataRequestTarget) => 
    Promise<Array<{
        id: string;
        data: Array<any>;
    }>>
    deviceType: string;

    constructor(baseUrl:string, substationId:string, rowIndex:number, deviceType:string , cb:(data:{substationId : string, rowIndex : number, data : [], timeWindow:number[], deviceType:string}) => void){
        this.baseUrl = baseUrl;
        this.cb = cb;
        this.deviceType = deviceType;

        
        this.fetchFirstNLast = (ids:string[], deviceType:string, interval:string, fields:string[]) => {
            fields ? console.log(fields) : null;
            let url = `${this.baseUrl}${deviceType}/${interval}/${ids[0]}/first-last`
            return new Promise((resolve, reject) => {
                axios.get(
                    url
                ).then((resp:any)=>{
                    console.log(resp)
                    resp.id = ids[0]
                    resolve([resp])

                }).catch(err => {
                    reject(err)
                    // console.log(err)
                })
            });
    
        };

        this.fetchdata = (ids: Array<string>, deviceType: string, interval: string, range: {start: number, end: number }, fields?: Array<string>) => {
            let url = `${this.baseUrl}${deviceType}/${interval}`
            return new Promise((resolve, reject) => {
                axios.post(url,
                {
                    "start" : range.start,
                    "end" : range.end,
                    "devices" : ids,
                    "fields": fields
                })
                .then((res:any) => {
                    let result:any = [];
                    Object.keys(res.data).forEach(key => {
                        res.data[key].id = key;

                        result.push(res.data[key]);
                    });
                    resolve(result)
                    this.cb({substationId : substationId, rowIndex : rowIndex, data : result, deviceType:this.deviceType, timeWindow:[range.start,range.end]})
                })
                .catch((err:any) => {
                    reject(err)
                });
            });
        };
    }

}