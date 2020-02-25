import React, { Component } from 'react'
import { AutoCompleteItemPropsInterface } from '../AutoCompleteInterfaces';

export class AutoCompleteItem extends Component<AutoCompleteItemPropsInterface> {
    constructor(props:AutoCompleteItemPropsInterface){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <li
                className={"autoCompleteDropDownItem"}
                onMouseDown={(e) => this.props.onClick(e, this.props.searchRow.indexKey, this.props.item)}
            >
                {this.props.item.description}
            </li>
        )
    }
}

export default AutoCompleteItem
