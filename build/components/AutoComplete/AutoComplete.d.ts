import React, { Component } from 'react';
import { AutoCompletePropsInterface, AutoCompleteStateInterface } from './AutoCompleteInterfaces';
export declare class AutoComplete extends Component<AutoCompletePropsInterface, AutoCompleteStateInterface> {
    constructor(props: AutoCompletePropsInterface);
    defaultOnBlurCapture(): void;
    defaultOnChange(event: React.ChangeEvent<HTMLInputElement>): void;
    defaultOnClick(item: AutoCompleteDeviceItem): void;
    render(): JSX.Element;
}
export default AutoComplete;
