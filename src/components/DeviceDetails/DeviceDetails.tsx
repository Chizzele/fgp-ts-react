import React, { Component } from 'react'
import { DeviceDetailsPropsInterface, DeviceDetailsStateInterface } from './DeviceDetailsInterfaces';
import './DeviceDetails.css';
import WidgetDataProcessor from '../DeviceWidget/DeviceWidgetDataProcessor'
import defaultProcessorConfig from '../DeviceWidget/defaultProcessorConfig.json'
import { DeviceDetailsRow } from '../DeviceDetails/DeviceDetailsRow'
export class DeviceDetails extends Component<DeviceDetailsPropsInterface, DeviceDetailsStateInterface> {
    constructor(props:DeviceDetailsPropsInterface){
        super(props);
        this.state = {
            device : this.props.device,
            dataProcessor : new WidgetDataProcessor(this.props.processorConfig !== undefined ? this.props.processorConfig : defaultProcessorConfig),
            dataProcessed : false,
            processedData : []
        };
        this.renderData = this.renderData.bind(this);
    }
    componentDidMount(){
        console.log(this.state.dataProcessor)
        this.renderData();
    }

    renderData () {
        let rawData:RawExtensionDataForProcessor[] = [];
            Object.keys(this.state.device.extensions).forEach(key => {
                rawData.push(
                    {
                    data: this.state.device.extensions[key],
                    relationship: key
                    }
                )
            });
            let cleanedData = this.state.dataProcessor.cleanData(rawData); // clean up the data configured by the JSON
            // let deviceData:RawExtensionDataForProcessor = []
            // if(this.props.customDeviceInfo !== undefined){
            //     deviceData = [...this.props.customDeviceInfo]
            // } else{
            //     deviceData = [...cleanedData];
            //     if(this.props.additionalDeviceInfo !== undefined && this.props.additionalDeviceInfo!== null){
            //         deviceData = [...cleanedData, ...this.props.additionalDeviceInfo];
            //     }
            // }
            this.setState({
                dataProcessed : true,
                processedData : cleanedData
            })
    }
    render() {
        return (
            <ul className={"DeviceDetailsCont text-left"}>
            {
                this.props.isExtended !== true ? (
                    <div style={{"position":"relative", "padding": "20px", "left":"-20px", "textAlign":"center"}}>
                        <div style={{"fontSize":"1.5rem"}}>
                            <b>{this.props.device.type} </b>
                        </div>
                        <br></br>
                        <div>
                            {this.state.device.name}
                        </div>
                    </div>
                    
                ) : (
                    this.state.dataProcessed === true ? (
                        // Iterates over the data set and renders each as a title and label
                        // Will not work for things that pass in objects/lists/null.
                        this.state.processedData.map((row, i) => {
                        if(typeof row.data !== 'object') {
                            if(row.redirect) {
                            return ( // if there is a redirect, render the row with the redirect
                                <li key={i}>
                                    <a className="fgReact_assetRedirect" href={row.redirect}> 
                                        <DeviceDetailsRow  dataRow={row}/> 
                                    </a>
                                </li>
                            )
                            } else {
                            return ( // if there is no redirect, render the row on its own
                                <li key={i}>
                                    <DeviceDetailsRow dataRow={row}/>
                                </li>
                            )
                            }
                        }else{
                            return ""
                        }
                        }) 
                                                            
                    ) : (
                        ""
                    )
                )
            }
            </ul>
        )
    }
}

export default DeviceDetails
