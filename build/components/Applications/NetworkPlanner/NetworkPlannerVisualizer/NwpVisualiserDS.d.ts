export default class NwpVisualiserDS {
    originalParentLine: any;
    parentId: string;
    childLines: any[];
    planningChildLines: any[];
    timeRange: number[];
    tInts: any;
    fetchFirstNLast: (ids: string[], deviceType: string, interval: string, fields: string[]) => Promise<{}>;
    buildParentLine: (substationId: string, childLines: any[], returnPlanningLine: any, planningChildLines: any[], len?: number) => {
        id: string;
        data: any[];
    };
    fetchdata: (ids: string[], deviceType: string, interval: string, range: number, fields: string[]) => Promise<{}>;
    constructor(parentId: string, childLines: any[], timeRange: number[], planningChildLines: any[], tInts: any);
}
