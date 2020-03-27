export default class WidgetDataProcessor {
    deviceConfig: DeviceConfig;
    constructor(deviceConfig: DeviceConfig);
    getFormat(key: string): string;
    getRedirect(key: string, value: any): string | null;
    wordConvert(given: string): string;
    capitalise(word: string): string;
    cleanData(data: RawExtensionDataForProcessor[]): any[];
    cleanRelationshipData(data: CleanedExtensionDataForProcessor[]): any[];
    relationshipExclude(data: CleanedExtensionDataForProcessor[]): any[];
    relationshipRename(point: CleanedExtensionDataForProcessor): string;
    relationshipFormat(point: CleanedExtensionDataForProcessor): string;
    relationshipRedirect(point: CleanedExtensionDataForProcessor): string;
}
