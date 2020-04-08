import React, { Component } from 'react'
import { NetworkPlannerSelectorPropsInterface, NetworkPlannerSelectorStateInterface } from './NetworkPlannerSelectorInterfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NetworkPlannerSelectorRowCmp } from './NetworkPlannerSelectorRow/NetworkPlannerSelectorRow';
import { NetworkPlannerSelectorRow } from '../NetworkPlannerInterfaces';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../NetworkPlanner.css'
export class NetworkPlannerSelector extends Component<NetworkPlannerSelectorPropsInterface, NetworkPlannerSelectorStateInterface> {
    constructor(props:NetworkPlannerSelectorPropsInterface){
        super(props);
        this.state = {
            subsLoading : this.props.autocompleteDevices !== undefined &&
                          this.props.autocompleteDevices.length > 0 ? (
                            true
                          ) : (
                            false
                          ),
            autocompleteDevices : this.props.autocompleteDevices !== undefined &&
                            this.props.autocompleteDevices.length > 0 ?
                            this.props.autocompleteDevices :
                            [],
            
        };
        this.addSelectionRow = this.addSelectionRow.bind(this)
        this.removeSelectionRow = this.removeSelectionRow.bind(this)
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.onBlurHandler = this.onBlurHandler.bind(this)
        this.onConfirmHandler = this.onConfirmHandler.bind(this)
        this.onToggleGraphHandler = this.onToggleGraphHandler.bind(this)
        this.testCb = this.testCb.bind(this)
    }

    

    addSelectionRow(){
        let rows = [...this.props.selectionRows];
        rows.push(new NetworkPlannerSelectorRow())
        this.props.updateRowsHandler(rows)
    }

    removeSelectionRow(indexKey:number){
        let rows = [...this.props.selectionRows];
        const removalIndex = rows.map(r => r.indexKey).indexOf(indexKey);
        rows.splice(removalIndex, 1);
        this.props.updateRowsHandler(rows)
    }

    inputChangeHandler(key:any, indexKey:number, value: any) {
        let rows = [...this.props.selectionRows];
        const rowIndex = rows.map(r => r.indexKey).indexOf(indexKey);
        const options  = this.props.autocompleteDevices;
        const userInput = value.target.value;
        const filteredOptions = options.filter(
            (option:any) => option.description.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        rows[rowIndex]["filteredItems"] = filteredOptions;
        rows[rowIndex]["confirmed"] = false;
        rows[rowIndex]["allowConfirm"] = false;
        filteredOptions.length > 0 ? rows[rowIndex]["showOptions"] = true : rows[rowIndex]["showOptions"] = false;
        rows[rowIndex][key] = value.target.value;
        this.props.updateRowsHandler(rows)
    }

    onBlurHandler(indexKey:number){
        // clearing the filtered results and hiding the box when not in focus 
        let rows = [...this.props.selectionRows];
        const rowIndex = rows.map(r => r.indexKey).indexOf(indexKey);
        rows[rowIndex]["filteredItems"] = [];
        rows[rowIndex]["showOptions"] = false;
        this.props.updateRowsHandler(rows)
    }

    onConfirmHandler(indexKey:number){
        let rows = [...this.props.selectionRows];
        const rowIndex = rows.map(r => r.indexKey).indexOf(indexKey);
        rows[rowIndex].confirmed = true;
        this.props.updateRowsHandler(rows)
    }

    onToggleGraphHandler(indexKey:number){
        let rows = [...this.props.selectionRows];
        const rowIndex = rows.map(r => r.indexKey).indexOf(indexKey);
        rows[rowIndex].showGraph = !rows[rowIndex].showGraph;
        this.props.updateRowsHandler(rows)
    }

    testCb(){
        console.log('called', arguments)
    }
    
    render() {
        return (
            <div className={"nwpSelectorScreen"}>
                {
                    this.state.subsLoading === true ? (
                        <div>
                            <div className={"col-12"}>
                                <label htmlFor={"nwpDP"} className={'nwpDatePickerSelectionText btnPrimaryHoverCancel btn btn-primary fs-larger'}>
                                    End Date: 
                                </label>                
                                <div className={'nwpDatePickerSelection fs-larger'}>
                                    < DatePicker  
                                        className={"nwpDatePickerSelectionDP"}
                                        name={"nwpDP"}
                                        id={"nwpDP"}
                                        selected={new Date(this.props.dateWindow[1])}
                                        onChange={(date:Date) => 
                                            this.props.dateWindowHandler([new Date(date), new Date(date)], this.testCb)
                                        }
                                        showMonthDropdown
                                        showYearDropdown
                                        dateFormat={"yyyy-MM-dd"}
                                    />
                                </div>
                                <div className={'nwpGoButton'}>
                                        {this.props.selectionRows.every((row)=>row.confirmed) && this.props.selectionRows[0].allowedToGo === true ? (
                                            <button className={"btn-primary btn"}
                                                onMouseDown={()=>{this.props.confirmHandler}}
                                                title={"start network planning"}
                                            >
                                                Start Planning
                                            </button>
                                        ) : (
                                            <button className={"btn-primary btn nwpGoButton-disabled"} 
                                                disabled
                                                title={"please select and confirm 2 substations"}
                                            >
                                                Start Planning
                                            </button>
                                        )}
                                </div>
                            </div>
                            {this.props.selectionRows.map((row:NetworkPlannerSelectorRow, index:number) =>{
                                return(
                                    < NetworkPlannerSelectorRowCmp
                                        key={index}
                                        addRowHandler={this.addSelectionRow}
                                        removeRowHandler={this.removeSelectionRow}
                                        rowInputHandler={this.inputChangeHandler}
                                        onBlurHandler={this.onBlurHandler}
                                        updateRowsHandler={this.props.updateRowsHandler}
                                        onConfirmHandler={this.onConfirmHandler}
                                        row={row}
                                        dateWindow={this.props.dateWindow}
                                        onToggleGraphHandler={this.onToggleGraphHandler}
                                        totalRows={this.props.selectionRows.length}
                                        autoCompleteItems={this.state.autocompleteDevices}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <div>
                            Loading devices <FontAwesomeIcon spin icon="spinner"/>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default NetworkPlannerSelector
