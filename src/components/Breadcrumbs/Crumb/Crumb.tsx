import React, { Component } from 'react'
import { CrumbsPropsInterface, CrumbsStateInterface } from './CrumbInterfaces';
import './Crumb.css';
import IcpImage from "../../../images/icp.png"
import LvcImage from "../../../images/circuit.png"
import TransformerImage from "../../../images/transformer.png"
import SubstationImage from "../../../images/substation.png"
import FeederImage from "../../../images/feeder.png"
import GxpImage from "../../../images/gxp.png"
export class Crumb extends Component<CrumbsPropsInterface, CrumbsStateInterface> {
    constructor(props:CrumbsPropsInterface){
        super(props);
        this.state = {
            crumb : this.props.crumbInfo !== undefined ? this.props.crumbInfo : {
                deviceType : "Transformer",
                deviceTypeShortName : "TX",
                deviceName : "tx_00293841dddde2",
                deviceDescription : "Tx_sample_01",
                linkTo : "/Transformer/tx_00293841",
                image : "icp"
            }
        };
    }

    assignImage(imageString:string){
        if(imageString === "icp"){
            return(IcpImage);
        }else if(imageString === "circuit"){
            return(LvcImage);
        }else if(imageString === "transformer"){
            return(TransformerImage);
        }else if(imageString === "substation"){
            return(SubstationImage);
        }else if(imageString === "feeder"){
            return(FeederImage);
        }else if(imageString === "gxp"){
            return(GxpImage);
        }else{
            return(IcpImage);
        }
    }

    assignStyle(imageString:string){
        if(imageString === "icp"){
            return("Breadcrumb-crumb-deviceImg-icp Breadcrumb-crumb-deviceImg");
        }else if(imageString === "circuit"){
            return("Breadcrumb-crumb-deviceImg-circuit Breadcrumb-crumb-deviceImg");
        }else if(imageString === "transformer"){
            return("Breadcrumb-crumb-deviceImg-transformer Breadcrumb-crumb-deviceImg");
        }else if(imageString === "substation"){
            return("Breadcrumb-crumb-deviceImg-substation Breadcrumb-crumb-deviceImg");
        }else if(imageString === "feeder"){
            return("Breadcrumb-crumb-deviceImg-feeder Breadcrumb-crumb-deviceImg");
        }else if(imageString === "gxp"){
            return("Breadcrumb-crumb-deviceImg-gxp Breadcrumb-crumb-deviceImg");
        }else{
            return("Breadcrumb-crumb-deviceImg-icp Breadcrumb-crumb-deviceImg");
        }
    }

    render() {
        return (
            <div className={"w-100 d-flex Breadcrumb-crumb-container"}>
            {this.props.isExtended === true ? (
                <div className={"w-100 d-flex Breadcrumb-crumb-container-height"}>
                    <div className={"Breadcrumb-crumb-container-image"}>
                        <img 
                            src={this.state.crumb.image !== undefined ? this.assignImage(this.state.crumb.image) : this.assignImage("icp")}
                            className={this.state.crumb.image !== undefined ? this.assignStyle(this.state.crumb.image) : this.assignStyle("icp")}
                        />
                    </div>
                    <div className={"Breadcrumb-crumb-container-text"} title={this.state.crumb.deviceDescription}>
                        {this.state.crumb.deviceType}: {this.state.crumb.deviceDescription}
                    </div>
                    
                </div>
            ):(
                <div className={"text-center w-100 Breadcrumb-crumb-collapsed"} title={this.state.crumb.linkTo}>
                    {this.state.crumb.deviceTypeShortName}
                </div>
            )}
                
            </div>
        )
    }
}

export default Crumb
