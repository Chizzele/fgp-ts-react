import React, { Component } from 'react'
import { AutoCompleteItemPropsInterface } from '../AutoCompleteInterfaces';
import { configureDisplayField } from '../AutoCompleteHelpers';

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
                onMouseDown={() => this.props.onClick(this.props.item)}
            >
                {
                    this.props.displayField !== undefined ? (
                        configureDisplayField(this.props.displayField, this.props.item)
                    ) : (
                        this.props.item.description
                    )
                }
                
            </li>
        )
    }
}

export default AutoCompleteItem
