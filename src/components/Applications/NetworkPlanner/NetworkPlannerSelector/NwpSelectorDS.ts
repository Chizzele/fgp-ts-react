import axios from 'axios';
// import moment from 'moment';
import {DataHandler} from '@future-grid/fgp-graph/lib/services/dataService'
import {GraphSeries, DataRequestTarget} from '@future-grid/fgp-graph/lib/metadata/configurations'
export default class NwpDataSelectorService implements DataHandler {
    source : string;
    baseUrl : string;
    cb : (data:{substationId : string, rowIndex : number, data : []}) => void;
    fetchFirstNLast : (ids: Array<string>, deviceType: string, interval: string, fields?: Array<string>) => Promise<Array<any>>
    fetchdata : (ids: Array<string>, deviceType: string, interval: string, range: {start: number, end: number }, fields?: Array<string>, seriesConfig?: Array<GraphSeries>, target?: DataRequestTarget) => 
    Promise<Array<{
        id: string;
        data: Array<any>;
    }>>

    constructor(baseUrl:string, substationId:string, rowIndex:number, cb:(data:{substationId : string, rowIndex : number, data : []}) => void){
        this.baseUrl = baseUrl;
        this.cb = cb;

        this.fetchFirstNLast = (ids:string[], deviceType:string, interval:string, fields:string[]) => {
            console.log('fetching fnl', ids, deviceType, interval, fields )
            let url = `${this.baseUrl}${deviceType}/${interval}/${ids[0]}/first-last`
            return new Promise((resolve, reject) => {
                // console.log(reject,fields)
                // sample data for first and last
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

        this.fetchdata = (ids: Array<string>, deviceType: string, interval: string, range: {start: number, end: number }, fields?: Array<string>, seriesConfig?: Array<GraphSeries>, target?: DataRequestTarget) => {
            console.log('fetch', seriesConfig, target)
            let url = `${this.baseUrl}${deviceType}/${interval}`
            return new Promise((resolve, reject) => {
                console.log(reject)
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
                    this.cb({substationId : substationId, rowIndex : rowIndex, data : result})
                })
                .catch((err:any) => {
                    reject(err)
                });
            });
        };
    }

}