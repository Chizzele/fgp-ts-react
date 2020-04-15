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
            parentDevices : [],
            deviceSelectionRows : [
                new  NetworkPlannerSelectorRow(0)
            ],
            timeWindow : [ moment().subtract(3, 'days').valueOf(), moment().valueOf()],
            parentDataLines : [],
            childDataLines : [],
            childDevices : [],
            substationsLoaded : this.props.selectionDevices !== undefined ? 
            true : 
            false,
        }
        this.retrieveAutoCompleteItems = this.retrieveAutoCompleteItems.bind(this);
        this.confirmSelection = this.confirmSelection.bind(this);
        this.changeTimeWindow = this.changeTimeWindow.bind(this);
        this.setRows = this.setRows.bind(this);

    }

    retrieveAutoCompleteItems() {
    //     name : "item One",
    //     id : "id1",
    //     description : "Item 1 description",
    //     label :  "Label for item one"

        console.log('retrieving...')
        let devices:AutoCompleteDeviceItem[] = [];
        let deviceNum = this.props.config.parent.deviceCount !== undefined?this.props.config.parent.deviceCount : 10000;
        axios.get(`${this.props.baseUrl}${this.props.config.parent.referenceName}/data/${deviceNum}/0`)
        .then(resp =>{
            console.log(resp, devices)
            resp.data.map((result:any) => {
                devices.push({
                    id : result[`${this.props.config.parent.deviceIdField}`],
                    name : result[`${this.props.config.parent.deviceDescriptionField}`],
                    description  : result[`${this.props.config.parent.deviceDescriptionField}`],
                    label : result[`${this.props.config.parent.deviceDescriptionField}`]
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
                            config={this.props.config}
                        />
                    ) : (
                        <NetworkPlannerVisualizer 
                        
                        />
                    )
                }
            </div>
        )
    }
}

export default NetworkPlanner
