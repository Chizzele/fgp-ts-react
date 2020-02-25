import React, { Component } from 'react';
import { AutoCompletePropsInterface, AutoCompleteStateInterface } from './AutoCompleteInterfaces';
export declare class AutoComplete extends Component<AutoCompletePropsInterface, AutoCompleteStateInterface> {
    constructor(props: AutoCompletePropsInterface);
    componentDidMount(): void;
    defaultOnBlurCapture(): void;
    defaultOnChange(event: React.ChangeEvent<HTMLInputElement>, indexKey: number): void;
    defaultOnClick(): void;
    render(): JSX.Element;
}
export default AutoComplete;
