import React, { Component } from 'react'
import { MonitorAPIPropsInterface, MonitorAPIStateInterface } from '../FGPMonitoringInterfaces';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MonitorApi.css'
export class MonitorApi extends Component<MonitorAPIPropsInterface, MonitorAPIStateInterface> {
    constructor(props:MonitorAPIPropsInterface){
        super(props);
        this.state = {
            refreshRate : this.props.refreshRate !== undefined ? this.props.refreshRate : 20000,
            isUp : "loading"
        };
        this.checkApiHealth = this.checkApiHealth.bind(this);
    }

    checkApiHealth():void{
        axios.get(`${this.props.baseUrl}${this.props.apiGetUrl}`)
        .then(() => {
            this.setState({
                isUp : "Up"
            })
        })
        .catch(() => {
            this.setState({
                isUp : "Down"
            })
        })
    }

    componentDidMount(){
        this.checkApiHealth();
        window.setInterval(
            () => {this.checkApiHealth()}, this.state.refreshRate
        )
    }

    render() {

        return (
            <div className={""}>
                {this.state.isUp === 'loading' ? (
                    <FontAwesomeIcon spin icon="spinner"/>
                ) : this.state.isUp === "Up" ? (
                    <FontAwesomeIcon icon="wifi" className={this.props.pulse ? "pulser-green" : "c-fgReact_V0_boldGreen"}/>
                ) : (
                    <FontAwesomeIcon icon="wifi" className={this.props.pulse ? "pulser-red" : "c-fgReact_V0_dangerRed"}/>
                )}
            </div>
        )
    }
}

export default MonitorApi
