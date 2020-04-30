import VectorLayer from 'ol/layer/Vector';
export declare const planningColors: {
    parent: {
        fillColor: string;
        borderColor: string;
    };
    child: {
        fillColor: string;
        borderColor: string;
    };
}[];
export declare function getCentroid(coord: any[]): any;
export declare function createParentLayer(device: NetworkPlannerVisualizerParentFeature, colorIndex: number): VectorLayer;
export declare function createChildLayer(devices: NetworkPlannerVisualizerChildFeature[], colorIndex: number, dummyId?: string): VectorLayer;
