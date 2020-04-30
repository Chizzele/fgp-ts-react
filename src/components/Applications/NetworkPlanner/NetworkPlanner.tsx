import React, { Component } from 'react'
import { NetworkPlannerPropsInterface, NetworkPlannerStateInterface, NetworkPlannerSelectorRow } from './NetworkPlannerInterfaces';
import moment from 'moment';
import axios from 'axios';
import { NetworkPlannerSelector } from './NetworkPlannerSelector/NetworkPlannerSelector';
import { NetworkPlannerVisualizer } from './NetworkPlannerVisualizer/NetworkPlannerVisualizer';
import './NetworkPlanner.css'
export class NetworkPlanner extends Component<NetworkPlannerPropsInterface, NetworkPlannerStateInterface> {
    constructor(props:NetworkPlannerPropsInterface){
        super(props)
        this.state = {
            selectionMade : false,
            selectionDevices : this.props.selectionDevices !== undefined ? 
            this.props.selectionDevices : 
            this.retrieveAutoCompleteItems(),
            // parentDevices : [],
            deviceSelectionRows : [
                new  NetworkPlannerSelectorRow(0)
            ],
            timeWindow : [ moment().subtract(3, 'days').valueOf(), moment().valueOf()],
            parentDataLines : [],
            // childDataLines : [],
            // childDevices : [],
            dataLines : [],
            substationsLoaded : this.props.selectionDevices !== undefined ? 
            true : 
            false,
            confirmedDevices : [],
        }
        this.retrieveAutoCompleteItems = this.retrieveAutoCompleteItems.bind(this);
        this.confirmSelection = this.confirmSelection.bind(this);
        this.changeTimeWindow = this.changeTimeWindow.bind(this);
        this.setLinesFromSelector = this.setLinesFromSelector.bind(this);
        this.setRows = this.setRows.bind(this);
    }

    retrieveAutoCompleteItems() {
        console.log('retrieving...')
        let devices:AutoCompleteDeviceItem[] = [];
        let deviceNum = this.props.selectorConfig.parent.deviceCount !== undefined?this.props.selectorConfig.parent.deviceCount : 10000;
        axios.get(`${this.props.baseUrl}${this.props.selectorConfig.parent.referenceName}/data/${deviceNum}/0`)
        .then(resp =>{
            console.log(resp, devices)
            resp.data.map((result:any) => {
                devices.push({
                    id : result[`${this.props.selectorConfig.parent.deviceIdField}`],
                    name : result[`${this.props.selectorConfig.parent.deviceDescriptionField}`],
                    description  : result[`${this.props.selectorConfig.parent.deviceDescriptionField}`],
                    label : result[`${this.props.selectorConfig.parent.deviceDescriptionField}`]
                })
            })
            this.setState({
                substationsLoaded : true
            })
        })
        .catch(resp =>{
            console.log(resp, devices)
        })
        return devices
    }


    componentDidMount(){
        // this.retrieveAutoCompleteItems()
    }

    // sets the search rows, sets the date window, initializes the Visualizer 
    confirmSelection(){
        this.setState({
            selectionMade : true,
        })
    }

    // changes the timeWindow and runs callback
    
    changeTimeWindow(timeWindow:Date[], cb:(timeWindow:number[])=>void){
        let newTimeWindow = [moment(timeWindow[0]).subtract(3, 'days').startOf('day').valueOf(), moment(timeWindow[1]).endOf('day').valueOf()]
        this.setState({
            timeWindow: newTimeWindow
        }, ()=>{cb(newTimeWindow)})
    }
   

    setRows(rows:NetworkPlannerSelectorRow[], index?:number, cb?:(myIndex:number)=>void){
        this.setState({
            deviceSelectionRows : rows
        }, cb && index !== undefined ? ()=>cb(index) : undefined )
    }

    setLinesFromSelector(lineCollection:NetworkPlannerDataLineCollection){
        let tempLines = [...this.state.dataLines]
        let indexArr:number[] = [];
        tempLines.forEach((line:NetworkPlannerDataLineCollection, index:number) => {
            if( line.id === lineCollection.id && line.isParent == lineCollection.isParent){
                indexArr.push(index);
            }
        })
        indexArr.sort(function(a,b){ return b - a; });
        for (var i = indexArr.length -1; i >= 0; i--){
            tempLines.splice(indexArr[i],1);
        }
        tempLines.push(lineCollection)
        this.setState({
            dataLines : tempLines
        })
    }

    render() {
        return (
            <div className={"w-100 d-flex"}>
                {
                    this.state.selectionMade === false ? 
                    (
                        <NetworkPlannerSelector 
                            confirmHandler={this.confirmSelection}
                            baseUrl={this.props.baseUrl}
                            selectionRows={this.state.deviceSelectionRows}
                            autocompleteDevices={this.state.selectionDevices}
                            updateRowsHandler={this.setRows}
                            dateWindow={this.state.timeWindow}
                            dateWindowHandler={this.changeTimeWindow}
                            subsLoaded={this.state.substationsLoaded}
                            config={this.props.selectorConfig}
                            dataLineUpdateHandler={this.setLinesFromSelector}
                        />
                    ) : (
                        <NetworkPlannerVisualizer 
                            baseUrl={this.props.baseUrl}
                            rawDataLines={this.state.dataLines}
                            dateWindow={this.state.timeWindow}
                            config={this.props.visualizerConfig}
                            selectionRows={this.state.deviceSelectionRows}
                        />
                    )
                }
            </div>
        )
    }
}

export default NetworkPlanner
