import React, { Component } from 'react'
import { AutoCompleteItem } from './AutoCompleteItem/AutoCompleteItem' 
import { AutoCompletePropsInterface } from '../../interfaces';

export class AutoComplete extends Component<AutoCompletePropsInterface> {
    constructor(props:AutoCompletePropsInterface){
        super(props);
        this.state={
        };
    }

    componentDidMount(){
    }
    render() {
        return (
            <div className={"col-12 col-md-9"}>
                <input 
                    placeholder={"start typing substation name..."}
                    className={"w-100 form-control"}
                    type="text" 
                    onChange={this.props.onChange.bind(this, 'value', this.props.searchRow.indexKey)}
                    value={this.props.searchRow.value}
                    onBlurCapture={this.props.onBlur.bind(this, 'value', this.props.searchRow.indexKey)}
                />
                <div 
                    className={ this.props.searchRow.showOptions === true && 
                    this.props.searchRow.value != ""
                        ? "NwpAutoCompleteDropDown" : "d-none"}
                    style={{'zIndex' : (999999 - this.props.index)}}

                > 
                    <ul className={""} 
                        style={{'zIndex' : (999999 - this.props.index)}}
                    >
                        {
                            // filter only the first 30
                            this.props.searchRow.filteredItems.map( (filteredItem, index) => {
                                if(index < 30){
                                    return(
                                        <AutoCompleteItem 
                                            key={index}
                                            item={filteredItem}
                                            onClick={this.props.onClick}
                                            searchRow={this.props.searchRow}
                                        />
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
                

            </div>
        )
    }
}

export default AutoComplete
