import React, { Component } from 'react'
import {BreadCrumbsPropsInterface, BreadCrumbsStateInterface} from './BreadcrumbsInterfaces';
import {Crumb} from './Crumb/Crumb'
export class Breadcrumbs extends Component<BreadCrumbsPropsInterface, BreadCrumbsStateInterface> {
    constructor(props:BreadCrumbsPropsInterface){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div>

                {this.props.crumbs.map((crumb, index) => {
                    return(
                        <Crumb 
                            key={index}
                            isExtended={this.props.isExtended}
                            crumbInfo={crumb}
                        />                    
                    )
                })}
            </div>
        )
    }
}

export default Breadcrumbs
