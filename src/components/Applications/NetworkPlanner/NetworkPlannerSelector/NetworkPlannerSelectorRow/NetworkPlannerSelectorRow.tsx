import React, { Component } from 'react'
import { NetworkPlannerSelectorRowCmpPropsInterface, NetworkPlannerSelectorRowCmpStateInterface } from './NetworkPlannerSelectorRowInterfaces';
import '../../NetworkPlanner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AutoComplete } from '../../../../AutoComplete/AutoComplete';
export class NetworkPlannerSelectorRowCmp extends Component<NetworkPlannerSelectorRowCmpPropsInterface, NetworkPlannerSelectorRowCmpStateInterface> {
    constructor(props:NetworkPlannerSelectorRowCmpPropsInterface){
        super(props);
        this.state =  {

        };
    }
 
    componentDidMount(){
        console.log('hello world')
    }

    render() {
        return (
            <div className={
                this.props.row.showOptions === true ? (
                    "col-12 row fgReact_componentContainer nwpSection rowFix"
                ) : (
                    "col-12 row fgReact_componentContainer nwpSection rowFix zInZ"
                )
                }
            >   
                {this.props.row.graphCannotBeRendered === true ? (
                    <div className={"errorMessageDiv"}>
                        Error: Cannot find channels for the meters on this substation
                    </div>
                ) : (
                    null
                )}
               
                <div className={"w-100 nwpSectionRow d-md-inline-flex align-items-center"}>

                    {/* Autocomplete */}
                    {/* <NetworkPlanningAutoComplete
                        onChange={this.props.onChange}
                        onClick={this.props.onClick}
                        index={this.props.index}
                        row={this.props.row}
                        // onKeyDown={this.onKeyDownHandler}
                        onBlur={this.props.onBlur}
                        // onDelete={this.props.onDelete}
                        options={this.props.onDelete}
                    /> */}
                    <AutoComplete 
                        className={"pos-relative"}
                        items={this.props.autoCompleteItems}
                        threshold={20}
                        index={this.props.row.indexKey}
                        searchRow={this.props.row}
                    />

                    {/* Buttons */}
                    <div className={"d-inline-flex align-items-center justify-content-md-right col-12 col-md-3 order-last "}> 
                        <button 
                            title={"confirm substation (render graphs)"}
                            className={
                                this.props.row.graphCannotBeRendered === true ? 
                                (" btn btn-danger") :
                                this.props.row.confirmed === true ? 
                                "btn btn-success" :
                                    this.props.row.indexKey === 0 ? (
                                        this.props.row.allowConfirm === true ? (
                                            " btn btn-secondary"
                                        ) : (
                                            " btn btn-secondary nwpGoButton-disabled"
                                        )
                                    ) : (
                                        this.props.row.allowConfirm === true ?(
                                            " btn btn-secondary") : (
                                            " btn btn-secondary nwpGoButton-disabled"
                                        ) 
                                    )
                            } 

                            style={{"marginRight" : "20px"}}
                            disabled={
                                this.props.row.indexKey === 0 ? (
                                    !this.props.row.allowConfirm 
                                ) : (
                                    this.props.row.allowConfirm === true ? (
                                        !this.props.row.allowConfirm
                                    ) : (
                                        false
                                    )
                                )
                                
                            }
                            onMouseDown={ this.props.row.allowConfirm === true ? 
                                (this.props.onConfirmHandler.bind(this, this.props.row.indexKey)) : (null)}
                        >    
                            {
                                this.props.row.showCheck === true ? (
                                    <FontAwesomeIcon className="" icon={["fas", "check"]}/>
                                ) : (
                                    <FontAwesomeIcon icon={faSpinner} spin />
                                )
                            }
                            
                        </button>
                        {
                            this.props.row.indexKey === 0 ? (
                                <button className={this.props.row.confirmed === true && this.props.totalRows < 5  ? (" btn btn-secondary") : ("btn btn-secondary nwpGoButton-disabled")} style={{"marginRight" : "20px"}} 
                                    onMouseDown={ this.props.row.confirmed === true && this.props.totalRows < 5 ? (this.props.addRowHandler.bind(this, this.props.row.indexKey)) : (null)}
                                    disabled={ this.props.totalRows < 5 ? !this.props.row.confirmed : true}
                                    title={"add substation"}
                                >
                                    <FontAwesomeIcon className="" icon={["fas", "plus"]}/>
                                </button>
                            ) : (
                                <button className={"btn btn-secondary"} style={{"marginRight" : "20px"}}
                                    title={"remove substation"}
                                    onMouseDown={this.props.removeRowHandler.bind(this, this.props.row.indexKey)}
                                >
                                    <FontAwesomeIcon className="" icon={["fas", "minus"]}/>
                                </button>
                            )
                        }
                        <button 
                            title={"show/hide graphs"}
                            className={this.props.row.confirmed === true && this.props.row.showGraph === true ? "btn btn-primary" :  this.props.row.confirmed === true && this.props.row.showGraph === false ? (" btn btn-secondary") : ("btn btn-secondary nwpGoButton-disabled") } style={{"marginRight" : "20px"}}
                            disabled={!this.props.row.confirmed}
                            onMouseDown={ this.props.row.confirmed === true ? (this.props.onToggleGraphHandler.bind(this, this.props.row.indexKey)) : (null)}
                        >    
                            <FontAwesomeIcon className="" icon={["fas", "eye-slash"]}/>
                        </button>
                    </div>
                </div>
                {/* Graph Area */}
                <div className={this.props.row.showCheck === true && this.props.row.confirmed === true && this.props.row.showGraph === true ? "nwpSelectionGraphs" : this.props.row.showCheck === true && this.props.row.confirmed === true && this.props.row.showGraph === false ? "nwpSelectionGraphs-closed" : "nwpSelectionGraphs-closed"}>
                    <div className={"nwpSelectionGraphsInner"} id={`vg_${this.props.row.id}`}>
                            
                    </div>
                    <div className={"nwpSelectionGraphsInner"} id={`cg_${this.props.row.id}`}>
                            
                    </div>
                </div>
            </div>
        )
    }
}

export default NetworkPlannerSelectorRowCmp
