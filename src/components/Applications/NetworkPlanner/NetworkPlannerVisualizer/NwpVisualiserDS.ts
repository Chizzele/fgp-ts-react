
export default class NwpVisualiserDS{
    originalParentLine : any
    parentId:string;
    childLines : any[]
    planningChildLines : any[] 
    timeRange : number[]
    tInts : any
    
    fetchFirstNLast : (ids:string[], deviceType:string, interval:string, fields:string[]) => Promise<{}>
    buildParentLine : (substationId:string, childLines:any[], returnPlanningLine:any, planningChildLines:any[], len?:number) => {id : string, data : any[]}
    fetchdata : (ids:string[], deviceType:string, interval:string, range:number , fields:string[]) => Promise<{}>

    constructor(parentId:string, childLines:any[], timeRange:number[], planningChildLines:any[], tInts:any){
        // this.baseUrl = baseUrl;
        this.originalParentLine = null;
        this.parentId = parentId
        this.childLines = childLines;
        this.planningChildLines = planningChildLines;
        this.timeRange = timeRange;
        tInts ? this.tInts = tInts : this.tInts = null;


        this.fetchFirstNLast = (ids:string[], deviceType:string, interval:string, fields:string[]) => {
            let parentDataLine = this.buildParentLine(this.parentId, this.childLines, true, this.planningChildLines);
            let completedResponse = {
                first : {
                    timestamp : this.timeRange[0]
                },
                end : {
                    timestamp : this.timeRange[1]
                },
                id : parentDataLine.id,
                data : parentDataLine.data
            }


            return new Promise((resolve, reject) => {              
                resolve([completedResponse])
            });
    
        };

        this.fetchdata = (ids:string[], deviceType:string, interval:string, range:number , fields:string[]) => {
            var subKeyName = parentId

            var originalResp = {}
            var planningResp = {}
                   
            originalResp[subKeyName] = subKeyName
            originalResp["data"] = childLines
            originalResp["id"] = parentId

            let parentDataLine = this.buildParentLine(this.parentId, this.childLines, true, this.planningChildLines);
            let completedResponse = {
                key : parentDataLine.id,
                id : parentDataLine.id,
                data : parentDataLine.data
            }


            return new Promise((resolve, reject) => {    
                resolve([completedResponse])
            });

        };

        this.buildParentLine = (substationId:string, childLines:any[], returnPlanningLine:any, planningChildLines:any[], len?:number) => {
            var current = 0;
            var currentPlanning = 0;
            var datapointQty;
            // if(returnPlanningLine !== true){
                var substationCurrentIntervals  = [];
                // first get the length of the first channel line
    
                childLines[0].data.length === 0 ? datapointQty = len : datapointQty = childLines[0].data.length;
                if(childLines[0].data.length === 0){
                    datapointQty = this.tInts.length;
                    childLines[0].data = [];
                    this.tInts.forEach((point:any) => {
                        childLines[0].data.push({
                            currentSumLct : 0,
                            timestamp : point.timestamp,
                            intervalTs : point.intervalTs
                        })
                    })
                    
                }else{
                    datapointQty =  childLines[0].data.length;
                }
                // for each interval, iterate through all of the channels 
                // and sum the current 
                for(var x = 0; x < datapointQty; x++){
                    current = 0;
                    currentPlanning = 0;
                    childLines.forEach(channel => {
                        channel.data[x] ?  channel.data[x]["ampsLct"] ? current += channel.data[x]["ampsLct"] :  current += 0 : current += 0;
                       
                    });
                    planningChildLines.forEach(channel => {
                        channel.data[x] ?  channel.data[x]["ampsLct"] ? currentPlanning += channel.data[x]["ampsLct"] :  currentPlanning += 0 : currentPlanning += 0;
                    });
                   
                    //pushing the current into the the intterval array 
                    substationCurrentIntervals.push({
                        allCurrentSumLct : current,
                        planningAmpsLct : currentPlanning,
                        timestamp :  childLines[0].data[x]["timestamp"],
                        intervalTs :  childLines[0].data[x]["intervalTs"]
                    })
                }
                return {
                    id : substationId,
                    data : substationCurrentIntervals
                };
            // }else{
    
            // }
        }
    }


}