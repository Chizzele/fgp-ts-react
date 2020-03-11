import { Component } from 'react';
import { CrumbsPropsInterface, CrumbsStateInterface } from './CrumbInterfaces';
import './Crumb.css';
export declare class Crumb extends Component<CrumbsPropsInterface, CrumbsStateInterface> {
    constructor(props: CrumbsPropsInterface);
    forceMount(url: string): void;
    assignImage(imageString: string): any;
    assignStyle(imageString: string): "Breadcrumb-crumb-deviceImg-icp Breadcrumb-crumb-deviceImg" | "Breadcrumb-crumb-deviceImg-circuit Breadcrumb-crumb-deviceImg" | "Breadcrumb-crumb-deviceImg-transformer Breadcrumb-crumb-deviceImg" | "Breadcrumb-crumb-deviceImg-substation Breadcrumb-crumb-deviceImg" | "Breadcrumb-crumb-deviceImg-feeder Breadcrumb-crumb-deviceImg" | "Breadcrumb-crumb-deviceImg-gxp Breadcrumb-crumb-deviceImg";
    render(): JSX.Element;
}
export default Crumb;
