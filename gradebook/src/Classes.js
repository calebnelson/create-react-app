import React, { Component } from 'react';
import {query} from './graphql'


const classQuery = `
    query{
        classrooms {
            code
            endDate
        }
    }`

class Classes extends Component{
    constructor(props){
        super(props);
        this.state = {
            classes: []
        };
        this.getOptions();
    }

    setStateAsync(state){
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async getOptions(){
        const res = await query(classQuery);
        const queryRes = await res.json();
        this.setStateAsync({classes: queryRes.data.classrooms});
    }

    render() {
        var classes = this.state.classes;
        return(
            <div><select id="classSelector" key="classSelector">
            {classes.map((data) => <option value={data.code} key={data.code}>{data.code}</option>)}
            </select></div>
        );
    }
}

export default Classes;