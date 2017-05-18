import React, { Component } from 'react'

import Parking from "../../Model/Parking.class"

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            parkingSystem: {
                A: new Parking()
            }
        };
        //window.parkingSystem = this.state.parkingSystem
    }

    render() {
        return (
            <div className='container'>
                <h1>Parking status</h1>
                {JSON.stringify(this.state.parkingSystem)}
            </div>
        )
    }
}
