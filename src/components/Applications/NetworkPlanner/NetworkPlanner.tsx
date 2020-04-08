import React, { Component } from 'react'
import { NetworkPlannerPropsInterface, NetworkPlannerStateInterface, NetworkPlannerSelectorRow } from './NetworkPlannerInterfaces';
import moment from 'moment';
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
                new  NetworkPlannerSelectorRow(0),
                new  NetworkPlannerSelectorRow()
            ],
            timeWindow : [ moment().subtract(3, 'days').valueOf(), moment().valueOf()],
            parentDataLines : [],
            childDataLines : [],
            childDevices : []
        }
        this.retrieveAutoCompleteItems = this.retrieveAutoCompleteItems.bind(this);
        this.confirmSelection = this.confirmSelection.bind(this);
        this.changeTimeWindow = this.changeTimeWindow.bind(this);
        this.setRows = this.setRows.bind(this);

    }

    retrieveAutoCompleteItems() {
        console.log('retrieving...')
        return []
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
        console.log('hit me');
        let newTimeWindow = [moment(timeWindow[0]).subtract(3, 'days').startOf('day').valueOf(), moment(timeWindow[1]).endOf('day').valueOf()]
        this.setState({
            timeWindow: newTimeWindow
        }, ()=>{cb(newTimeWindow)})
    }
   

    setRows(rows:NetworkPlannerSelectorRow[]){
        this.setState({
            deviceSelectionRows : rows
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
