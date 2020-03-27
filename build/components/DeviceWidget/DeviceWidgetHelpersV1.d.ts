export declare function getDeviceExtensions(baseUrl: string, deviceName: string, deviceType: string, extensionNames: string[]): Promise<DeviceWithExtensions>;
export declare function getDeviceParents(baseUrl: string, deviceName: string, breadCrumbPath: CrumbPathObj[]): Promise<CrumbArr>;
