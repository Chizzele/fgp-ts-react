import React, { Component} from 'react'
import axios from 'axios';
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
            graphList : [],
            tempValidChildren : []
        };
        this.addSelectionRow = this.addSelectionRow.bind(this)
        this.removeSelectionRow = this.removeSelectionRow.bind(this)
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.onBlurHandler = this.onBlurHandler.bind(this)
        this.onConfirmHandler = this.onConfirmHandler.bind(this)
        this.onToggleGraphHandler = this.onToggleGraphHandler.bind(this)
        this.testCb = this.testCb.bind(this)
        this.fetchGraph = this.fetchGraph.bind(this)
        this.validateGraphDevice = this.validateGraphDevice.bind(this)
        this.onAutoCompleteSelectionHandler = this.onAutoCompleteSelectionHandler.bind(this)
        this.collector = this.collector.bind(this)
        this.prepareVisualizer = this.prepareVisualizer.bind(this)
    }

    addSelectionRow(){
        let rows = [...this.props.selectionRows];
        rows.push(new NetworkPlannerSelectorRow())
        this.props.updateRowsHandler(rows)
    }

    removeSelectionRow(indexKey:number){
        let rows = [...this.props.selectionRows];
        const rowIndex = rows.map(r => r.indexKey).indexOf(indexKey);
        rows.splice(rowIndex, 1);
        let graphList = [...this.state.graphList]
        var elem:any = document.getElementById(`vg_${this.props.selectionRows[rowIndex].indexKey}`);
        var domElem:HTMLElement = elem;
        var exist:number = graphList.map(r => r.elemId).indexOf(`vg_${this.props.selectionRows[rowIndex].indexKey}`)
        var childExist:number = graphList.map(r => r.elemId).indexOf(`cg_${this.props.selectionRows[rowIndex].indexKey}`)
        var childElem:any = document.getElementById(`cg_${this.props.selectionRows[rowIndex].indexKey}`);
        var childDomElem:HTMLElement = childElem;
        if(exist !== -1 || childExist !== -1){
            domElem.innerHTML = "";
            graphList.splice(exist, 1)
            childDomElem.innerHTML = "";
            graphList.splice(childExist, 1)
        }
        this.setState({
            graphList : graphList
        }, () => this.props.updateRowsHandler(rows))
        
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
        this.props.updateRowsHandler(rows, rowIndex, this.validateGraphDevice)
    }

    onToggleGraphHandler(indexKey:number){
        let rows = [...this.props.selectionRows];
        const rowIndex = rows.map(r => r.indexKey).indexOf(indexKey);
        rows[rowIndex].showGraph = !rows[rowIndex].showGraph;
        this.props.updateRowsHandler(rows)
    }

    testCb(timestampArr:number[]){
        if(this.state.graphList.length > 0){
            this.state.graphList.forEach((graph:any) =>{
                console.log(graph)
                graph.graph.updateDatewinow(timestampArr)
            })
        }
    }

    prepareVisualizer(data:{substationId : string, rowIndex : number, data : [], timeWindow:number[], deviceType:string}){
        
        let lineCollection:NetworkPlannerDataLineCollection = {
            id : data.substationId,
            type : data.deviceType,
            isParent : this.props.config.parent.deviceType === data.deviceType ? true : false,
            originLines : data.data,
            planningLines: data.data,
        }
        this.props.dataLineUpdateHandler(lineCollection)

    }

    validateGraphDevice(rowIndex:number){
        // let validDevices:any[] = [];
        let found:boolean = false;
        axios.get(`${this.props.baseUrl}${this.props.config.parent.deviceType}/${this.props.selectionRows[rowIndex].name}/relation/${this.props.config.parent.relationName}?isParent=false`)
        .then((resp:any) =>{
            console.log("STARTING", resp.data)
            resp.data.forEach(async (device:any, index:number)=>{
                console.log('start one')
                if(found === false){
                    await axios.get(`${this.props.baseUrl}${this.props.config.child.deviceType}/${this.props.config.child.intervalName}/${device.name}/first-last`)
                    .then(()=>{
                        found = true
                        console.log('done one - p')
                        this.collector(rowIndex, device.name, index, resp.data.length, true)
                    }).catch(()=>{
                        console.log('done one - f')
                        this.collector(rowIndex, device.name, index, resp.data.length, false)
                    })
                }
            })
        }).catch(()=>{
            this.fetchGraph(rowIndex)
        })
    }

    collector(rowIndex:number, incomingName:string, iteratorIndex:number, total:number, foundFlag:boolean){
        let temp = [...this.state.tempValidChildren];
        foundFlag === true ? temp.push(incomingName) : null;
        if(iteratorIndex === total - 1 ){
            this.setState({
                tempValidChildren : temp
            }, ()=> {
                this.fetchGraph(rowIndex)
            })
        }else{
            this.setState({
                tempValidChildren : temp
            })
        }
    }

    // takes the row index, grabs data related top the row index's selected field
    fetchGraph(rowIndex:number){
        var dataService = new NwpDataSelectorService(this.props.baseUrl, this.props.selectionRows[rowIndex].id, rowIndex, this.props.config.parent.deviceType, this.prepareVisualizer);
        var dataService_child = new NwpDataSelectorService(this.props.baseUrl, this.props.selectionRows[rowIndex].id, rowIndex, this.props.config.child.deviceType, this.prepareVisualizer);
        var elem:any = document.getElementById(`vg_${this.props.selectionRows[rowIndex].indexKey}`);
        var domElem:HTMLElement = elem;
        var childElem:any = document.getElementById(`cg_${this.props.selectionRows[rowIndex].indexKey}`);
        var childDomElem:HTMLElement = childElem;
        var formatter = new Formatters('Australia/Melbourne');
        // http://localhost:8081/sapn/transformer/GA01-97/relation/nmi_transformer?isParent=false
        var fgpGraphConfig = {
        name: `${this.props.config.parent.deviceType} ${this.props.config.parent.planningField}`,
        connectSeparatedPoints: true,
        graphConfig: {
            hideHeader: {views: true, intervals: true, toolbar: true, series: true},
            features: { 
                rangeLocked : true,
                zoom: true,
                scroll: true,
                rangeBar: false,
                legend: formatter.legendForSingleSeries,
            },
            entities: [{id: this.props.selectionRows[rowIndex].id, type:this.props.config.parent.deviceType, name: this.props.selectionRows[rowIndex].name}],
            rangeEntity: {id: this.props.selectionRows[rowIndex].id, type:this.props.config.parent.deviceType, name: this.props.selectionRows[rowIndex].name},
            rangeCollection : {
                label : `${this.props.config.parent.intervalName}`,
                name : `${this.props.config.parent.intervalName}`,
                interval : this.props.config.parent.interval,
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
                    interval : this.props.config.parent.interval,
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
                    fill: false,
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
                    // highlightCallback: (datetime:any, series:any, points:any) => {
                    //     console.log(datetime, series, points)
                    //     return [];
                    // },
                    // selectCallback: (series:any) => {
                    //     console.log(series)
                    // },
                    syncDateWindow : (dateWindow:number[]) => {                                                        
                        this.props.dateWindowHandler([new Date(dateWindow[0]), new Date(dateWindow[1])], ()=>{})
                    }
                }
            },
            timezone: 'Australia/Melbourne'
        }
        // now for children
        var childDevices:any[] = [];
        var graphList = [...this.state.graphList];
        var exist:number = graphList.map(r => r.elemId).indexOf(`vg_${this.props.selectionRows[rowIndex].indexKey}`)
        var childExist:number = graphList.map(r => r.elemId).indexOf(`cg_${this.props.selectionRows[rowIndex].indexKey}`)
        var rows=[...this.props.selectionRows]
        if(exist !== -1 || childExist !== -1){
            domElem.innerHTML = "";
            graphList.splice(exist, 1)
            childDomElem.innerHTML = "";
            graphList.splice(childExist, 1)
            console.log("graphList", graphList)
        }

        // before we make any calls lets make sure we have a valid child to plan with, if not set false flags
        if(this.state.tempValidChildren.length < 1){
            rows[rowIndex].confirmed = false;
            rows[rowIndex].showGraph = false;
            rows[rowIndex].showCheck = true;
            rows[rowIndex].graphCannotBeRendered = true;
            this.props.updateRowsHandler(rows, rowIndex, ()=>{})
        }else{
            axios.get(`${this.props.baseUrl}${this.props.config.parent.deviceType}/${this.props.selectionRows[rowIndex].name}/relation/${this.props.config.parent.relationName}?isParent=false`)
                .then((resp:any) =>{
                    resp.data.forEach((device:any)=>{
                        childDevices.push({name:device.name, id:device.name, type:this.props.config.child.deviceType})
                    })
    
                    let fgpGraphConfig_child = {
                        name: `${this.props.config.child.deviceType} ${this.props.config.child.planningField}`,
                        connectSeparatedPoints: true,
                        graphConfig: {
                            hideHeader: {views: true, intervals: true, toolbar: true, series: true},
                            features: { 
                                rangeLocked : true,
                                zoom: true,
                                scroll: true,
                                rangeBar: false,
                                legend: formatter.legendForSingleSeries,
                            },
                            entities: childDevices,
                            rangeEntity: {id:this.state.tempValidChildren[0], name: this.state.tempValidChildren[0], type:this.props.config.child.deviceType},
                            rangeCollection : {
                                label : `${this.props.config.child.intervalName}`,
                                name : `${this.props.config.child.intervalName}`,
                                interval : this.props.config.child.interval,
                                series: [
                                    {
                                        label: `${this.props.config.child.planningField}`,
                                        type: 'line',
                                        exp: `(data.${this.props.config.child.planningField})`,
                                        yIndex: 'left',
                                        color: '#d89d08'
                                    }
                                ]
                            },
                            collections: [
                                {
                                    label : `${this.props.config.child.intervalName}`,
                                    name : `${this.props.config.child.intervalName}`,
                                    interval : this.props.config.child.interval,
                                    series: [
                                        {
                                            label: `${this.props.config.child.planningField}`,
                                            type: 'line',
                                            exp: `(data.${this.props.config.child.planningField})`,
                                            yIndex: 'left',
                                            color: '#d89d08'
                                        }
                                    ],
                                    threshold: this.props.config.parent.threshold,
                                    yLabel: `${this.props.config.child.planningField}`,
                                    fill: false,
                                }
                            ],
                        },
                        dataService: dataService_child,
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
                                // highlightCallback: (datetime:any, series:any, points:any) => {
                                //     console.log(datetime, series, points)
                                //     return [];
                                // },
                                // selectCallback: (series:any) => {
                                //     console.log(series)
                                // },
                                syncDateWindow : (dateWindow:number[]) => {                                                        
                                    this.props.dateWindowHandler([new Date(dateWindow[0]), new Date(dateWindow[1])], ()=>{})
                                }
                            }
                        },
                        timezone: 'Australia/Melbourne'
                    }
    
                    
    
                    var selectorGraph = new FgpGraph(domElem, [fgpGraphConfig])
                    var selectorGraph_child = new FgpGraph(childDomElem, [fgpGraphConfig_child])
    
                    rows[rowIndex].confirmed = true;
                    rows[rowIndex].showGraph = true;
                    rows[rowIndex].showCheck = true;
                    rows[rowIndex].allowedToGo = true;
                    rows[0].allowedToGo = true;
                    rows[rowIndex].graphCannotBeRendered = false;
                    graphList.push(
                        {graph:selectorGraph, elemId: `vg_${this.props.selectionRows[rowIndex].indexKey}`},
                        {graph:selectorGraph, elemId: `cg_${this.props.selectionRows[rowIndex].indexKey}`}
                    );
                    this.props.updateRowsHandler(rows, rowIndex, ()=>{
                        this.setState({
                            graphList : graphList,
                            tempValidChildren : []
                        },()=>{
                            // init graphs
                            selectorGraph.initGraph() 
                            selectorGraph_child.initGraph() 
                            selectorGraph.setChildren([selectorGraph_child])
    
                        })
    
                    })
                })
                .catch((err:any)=>{
                    this.setState({
                        graphList : graphList,
                        tempValidChildren : []
                    },() => {
                        console.log(err)
                        rows[rowIndex].confirmed = false;
                        rows[rowIndex].showGraph = false;
                        rows[rowIndex].showCheck = true;
                        rows[rowIndex].graphCannotBeRendered = true;
                        this.props.updateRowsHandler(rows, rowIndex, ()=>{})
                    })
                })       
        }
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
                                        {this.props.selectionRows.every((row)=>row.confirmed) && this.props.selectionRows[0].allowedToGo === true && this.props.selectionRows.length >= 2 ? (
                                            <button className={"btn-primary btn"}
                                                onMouseDown={()=>{this.props.confirmHandler()}}
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
