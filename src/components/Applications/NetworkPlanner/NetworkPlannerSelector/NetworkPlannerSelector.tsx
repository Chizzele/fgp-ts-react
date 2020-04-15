import React, { Component } from 'react'
import { NetworkPlannerSelectorPropsInterface, NetworkPlannerSelectorStateInterface } from './NetworkPlannerSelectorInterfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NetworkPlannerSelectorRowCmp } from './NetworkPlannerSelectorRow/NetworkPlannerSelectorRow';
import { NetworkPlannerSelectorRow } from '../NetworkPlannerInterfaces';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../NetworkPlanner.css'
// /Users/anthonycarnell/workspace/fgp-ts-react/node_modules/@future-grid/fgp-graph/lib/services/dataService.d.ts
import FgpGraph from '@future-grid/fgp-graph/';
import NwpDataSelectorService from './NwpSelectorDS'
import { Formatters } from '@future-grid/fgp-graph/lib/extras/formatters';
export class NetworkPlannerSelector extends Component<NetworkPlannerSelectorPropsInterface, NetworkPlannerSelectorStateInterface> {
    constructor(props:NetworkPlannerSelectorPropsInterface){
        super(props);
        this.state = {
            
        };
        this.addSelectionRow = this.addSelectionRow.bind(this)
        this.removeSelectionRow = this.removeSelectionRow.bind(this)
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.onBlurHandler = this.onBlurHandler.bind(this)
        this.onConfirmHandler = this.onConfirmHandler.bind(this)
        this.onToggleGraphHandler = this.onToggleGraphHandler.bind(this)
        this.testCb = this.testCb.bind(this)
        this.fetchGraph = this.fetchGraph.bind(this)
        this.onAutoCompleteSelectionHandler = this.onAutoCompleteSelectionHandler.bind(this)
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

    autoCompletePasser(value:AutoCompleteDeviceItem){
        console.log(value)
    }

    onAutoCompleteSelectionHandler(value:AutoCompleteDeviceItem, indexKey:number, ){
        let rows = [...this.props.selectionRows];
        const rowIndex = rows.map(r => r.indexKey).indexOf(indexKey);
        rows[rowIndex]['description'] = value.description;
        rows[rowIndex]['name'] = value.name;
        rows[rowIndex]['value'] = value.description;
        rows[rowIndex]['id'] = value.id;
        // setting filter results and show options to initial state to hide
        rows[rowIndex]["filteredItems"] = [];
        rows[rowIndex]["showOptions"] = false;
        rows[rowIndex]["allowConfirm"] = true;
        this.props.updateRowsHandler(rows)
    }

    onConfirmHandler(indexKey:number){
        let rows = [...this.props.selectionRows];
        const rowIndex = rows.map(r => r.indexKey).indexOf(indexKey);
        rows[rowIndex].showCheck = false; //shows loading spinner
        rows[0].allowedToGo = false; // stops additional graphs being made
        this.props.updateRowsHandler(rows, rowIndex, this.fetchGraph)
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

    testCb2(data:{substationId : string, rowIndex : number, data : []}){
        console.log(data)
    }

    // takes the row index, grabs data related top the row index's selected field
    fetchGraph(rowIndex:number){
        var dataService = new NwpDataSelectorService(this.props.baseUrl, this.props.selectionRows[rowIndex].id, rowIndex, this.testCb2);
        let elem:any = document.getElementById(`vg_${this.props.selectionRows[rowIndex].id}`);
        var domElem:HTMLElement = elem;
        var formatter = new Formatters('Australia/Melbourne');
        // http://localhost:8081/sapn/transformer/GA01-97/relation/nmi_transformer?isParent=false
        let fgpGraphConfig = {
        name: `${this.props.config.parent.deviceType} ${this.props.config.parent.planningField}`,
        connectSeparatedPoints: true,
        graphConfig: {
            features: { 
                zoom: true,
                scroll: true,
                rangeBar: rowIndex === 0 ? true : false,
                legend: formatter.legendForSingleSeries,
            },
            entities: [{id: this.props.selectionRows[rowIndex].id, type:this.props.config.parent.deviceType, name: this.props.selectionRows[rowIndex].name}],
            rangeEntity: {id: this.props.selectionRows[rowIndex].id, type:this.props.config.parent.deviceType, name: this.props.selectionRows[rowIndex].name},
            rangeCollection : {
                label : `${this.props.config.parent.intervalName}`,
                name : `${this.props.config.parent.intervalName}`,
                interval : 300000,
                series: [
                    {
                        label: `${this.props.config.parent.planningField}`,
                        type: 'line',
                        exp: `(data.${this.props.config.parent.planningField})`,
                        yIndex: 'left',
                        color: '#d80808'
                    }
                ]
            },
            collections: [
                {
                    label : `${this.props.config.parent.intervalName}`,
                    name : `${this.props.config.parent.intervalName}`,
                    interval : 300000,
                    series: [
                        {
                            label: `${this.props.config.parent.planningField}`,
                            type: 'line',
                            exp: `(data.${this.props.config.parent.planningField})`,
                            yIndex: 'left',
                            color: '#d80808'
                        }
                    ],
                    threshold: this.props.config.parent.threshold,
                    yLabel: `${this.props.config.parent.planningField}`,
                    fill: false
                }],
            },
            dataService: dataService,
            show: true,
            ranges: [
                { name: '3 days', value: (3 * 1000 * 60 * 60 * 24 ), show: true }
            ],
            initRange: {
                start: this.props.dateWindow[0],
                end: this.props.dateWindow[1]
            },
            interaction: {
                callback: {
                    highlightCallback: (datetime:any, series:any, points:any) => {
                        console.log(datetime, series, points)
                        return [];
                    },
                    selectCallback: (series:any) => {
                        console.log(series)
                    },
                    syncDateWindow : (dateWindow:number[]) => {                                                        
                        this.props.dateWindowHandler([new Date(dateWindow[0]), new Date(dateWindow[1])],()=>{})
                    }
                }
            },
            timezone: 'Australia/Melbourne'
        }
        console.log(fgpGraphConfig)
        var selectorGraph = new FgpGraph(domElem, [fgpGraphConfig])
        let rows=[...this.props.selectionRows]
        rows[rowIndex].confirmed = true;
        rows[rowIndex].showGraph = true;
        rows[rowIndex].showCheck = true;
        this.props.updateRowsHandler(rows, rowIndex, ()=>{selectorGraph.initGraph()})
        
    }
    
    render() {
        return (
            <div className={"nwpSelectorScreen"}>
                {
                    this.props.subsLoaded === true ? (
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
                                        autoCompleteItems={this.props.autocompleteDevices}
                                        onAutoCompleteSelectionHandler={this.onAutoCompleteSelectionHandler}
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
