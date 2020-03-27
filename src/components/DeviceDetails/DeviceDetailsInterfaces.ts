import WidgetDataProcessor from '../DeviceWidget/DeviceWidgetDataProcessor'

export interface DeviceDetailsPropsInterface {
    isExtended : boolean;
    device : DeviceWithExtensions
    processorConfig? : DeviceConfig
    customDeviceInfo? : any[];
}

export interface DeviceDetailsStateInterface {
    device : DeviceWithExtensions
    dataProcessor : WidgetDataProcessor
    dataProcessed : boolean
    processedData : any[]
}

export interface DeviceDetailsRowPropsInterface{
    dataRow : CleanedExtensionDataForProcessor;
}