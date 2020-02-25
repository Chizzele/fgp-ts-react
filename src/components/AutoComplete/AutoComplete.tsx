import React, { Component } from 'react'
import { AutoCompleteItem } from './AutoCompleteItem/AutoCompleteItem' 
// importing the required interfaces
import { AutoCompletePropsInterface, AutoCompleteStateInterface } from './AutoCompleteInterfaces';
import { configureDisplayField } from './AutoCompleteHelpers';

export class AutoComplete extends Component<AutoCompletePropsInterface, AutoCompleteStateInterface> {
    constructor(props:AutoCompletePropsInterface){
        super(props);
        this.state={
            index : this.props.index,
            searchRow : this.props.searchRow
        };
        this.defaultOnClick = this.defaultOnClick.bind(this)
    }

    // default blur Action
    defaultOnBlurCapture () {
        let tmpSearchRow = {...this.state.searchRow};
        tmpSearchRow.showOptions = false
        this.setState({searchRow : tmpSearchRow})
    }

    // the default method for handling the input change event
    defaultOnChange (event:React.ChangeEvent<HTMLInputElement>) {
        // make a copy of the search row
        let tmpSearchRow = {...this.state.searchRow};
        const userInput = event.target.value;
        // if there is not a custom matchOn - match on description
        if(this.props.matchOn !== undefined){
            var matchType = this.props.matchOn
            var filteredItems = this.props.items.filter(
                (item) => item[matchType].toLowerCase().includes(userInput.toLowerCase())
            );
        }else{
            var filteredItems = this.props.items.filter(
                (item) => item.description.toLowerCase().includes(userInput.toLowerCase())
            );
        }
        tmpSearchRow.filteredItems = filteredItems;
        filteredItems.length > 0 ? tmpSearchRow.showOptions = true : tmpSearchRow.showOptions = false;
        tmpSearchRow.value = userInput;
        tmpSearchRow.confirmed = false;
        // setting state
        this.setState({searchRow : tmpSearchRow})
        if(this.props.changeCallBack){
            this.props.changeCallBack(filteredItems, userInput);
        }
    }

    defaultOnClick (item:AutoCompleteDeviceItem) {
        let tmpSearchRow = {...this.state.searchRow};
        if(this.props.displayField !== undefined){
            tmpSearchRow.value = configureDisplayField(this.props.displayField, item)
        }else{
            tmpSearchRow.value = item.description
        }
        tmpSearchRow.confirmed = true;
        tmpSearchRow.showOptions = false;
        tmpSearchRow.id = item.id;
        tmpSearchRow.description = item.description;
        tmpSearchRow.label = item.label;
        tmpSearchRow.name = item.name;
        this.setState({searchRow : tmpSearchRow})
        if(this.props.clickCallBack){
            this.props.clickCallBack(item);
        }
    }

    render() {
        return (
            <div className={"col-12 col-md-9 pos-fixed"}>
                <input 
                    placeholder={this.props.placeHolderText ? this.props.placeHolderText :  ""}
                    className={"w-100 form-control"}
                    type="text" 
                    onChange={this.props.onChange ? this.props.onChange.bind(this, 'value', this.state.searchRow.indexKey) : (e) => this.defaultOnChange(e)}
                    value={this.state.searchRow.value}
                    onBlurCapture={this.props.onBlur ? this.props.onBlur.bind(this, 'value', this.state.searchRow.indexKey) : () => this.defaultOnBlurCapture() }
                />
                <div 
                    className={ this.state.searchRow.showOptions === true && 
                    this.state.searchRow.value != ""
                        ? "autoCompleteDropDown" : "d-none"}
                    style={{'zIndex' : (999999 - this.props.index)}}

                > 
                    <ul className={""} 
                        style={{'zIndex' : (999999 - this.props.index)}}
                    >
                        {
                            // filter only the first 30
                            this.state.searchRow.filteredItems.map( (filteredItem, index) => {
                                if(index < this.props.threshold){
                                    return(
                                        <AutoCompleteItem 
                                            key={index}
                                            item={filteredItem}
                                            onClick={this.props.onClick ? this.props.onClick : this.defaultOnClick}
                                            searchRow={this.state.searchRow}
                                            displayField={this.props.displayField}
                                        />
                                    )
                                }else{
                                    return(null)
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
