import React, { Component } from 'react'
import { AutoCompleteItem } from './AutoCompleteItem/AutoCompleteItem' 
// importing the required interfaces
import { AutoCompletePropsInterface, AutoCompleteStateInterface } from './AutoCompleteInterfaces';

export class AutoComplete extends Component<AutoCompletePropsInterface, AutoCompleteStateInterface> {
    constructor(props:AutoCompletePropsInterface){
        super(props);
        this.state={
            index : this.props.index,
            searchRow : this.props.searchRow
        };
    }

    componentDidMount(){
    }


    defaultOnBlurCapture () {
        console.log(arguments)
    }

    defaultOnChange (event:React.ChangeEvent<HTMLInputElement>, indexKey:number) {
        let tmpSearchRow = {...this.state.searchRow};
        const userInput = event.target.value;
        var filteredItems = this.props.items.filter(
            (item) => item.description.toLowerCase().indexOf(userInput.toLowerCase()) > 1
        );
        tmpSearchRow.filteredItems = filteredItems;
        filteredItems.length > 0 ? tmpSearchRow.showOptions = true : tmpSearchRow.showOptions = false;
        tmpSearchRow.value = userInput;
        this.setState({searchRow : tmpSearchRow})
    }

    defaultOnClick () {
        console.log(arguments)
    }

    render() {
        return (
            <div className={"col-12 col-md-9 pos-fixed"}>
                <input 
                    placeholder={this.props.placeHolderText ? this.props.placeHolderText :  ""}
                    className={"w-100 form-control"}
                    type="text" 
                    onChange={this.props.onChange ? this.props.onChange.bind(this, 'value', this.state.searchRow.indexKey) : (e) => this.defaultOnChange(e, this.state.searchRow.indexKey)}
                    value={this.state.searchRow.value}
                    onBlurCapture={this.props.onBlur ? this.props.onBlur.bind(this, 'value', this.state.searchRow.indexKey) : this.defaultOnBlurCapture.bind(this, 'value', this.state.searchRow.indexKey)}
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
