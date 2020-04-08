import { Component } from 'react';
import './DatePickerWrapper.css';
import { DatePickerWrapperPropsInterface, DatePickerWrapperStateInterface } from './DatePickerWrapperInterfaces';
import "react-datepicker/dist/react-datepicker.css";
export declare class DatePickerWrapper extends Component<DatePickerWrapperPropsInterface, DatePickerWrapperStateInterface> {
    constructor(props: DatePickerWrapperPropsInterface);
    render(): JSX.Element;
}
export default DatePickerWrapper;
