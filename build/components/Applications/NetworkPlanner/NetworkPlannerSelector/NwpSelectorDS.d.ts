import { DataHandler } from '@future-grid/fgp-graph/lib/services/dataService';
import { GraphSeries, DataRequestTarget } from '@future-grid/fgp-graph/lib/metadata/configurations';
import '@future-grid/fgp-graph/lib/css/graph.css';
export default class NwpDataSelectorService implements DataHandler {
    source: string;
    baseUrl: string;
    cb: (data: {
        substationId: string;
        rowIndex: number;
        data: [];
        timeWindow: number[];
        deviceType: string;
    }) => void;
    fetchFirstNLast: (ids: Array<string>, deviceType: string, interval: string, fields?: Array<string>) => Promise<Array<any>>;
    fetchdata: (ids: Array<string>, deviceType: string, interval: string, range: {
        start: number;
        end: number;
    }, fields?: Array<string>, seriesConfig?: Array<GraphSeries>, target?: DataRequestTarget) => Promise<Array<{
        id: string;
        data: Array<any>;
    }>>;
    deviceType: string;
    constructor(baseUrl: string, substationId: string, rowIndex: number, deviceType: string, cb: (data: {
        substationId: string;
        rowIndex: number;
        data: [];
        timeWindow: number[];
        deviceType: string;
    }) => void);
}
