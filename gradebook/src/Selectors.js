import React, { Component } from 'react';
import {query} from './graphql'


const classQuery = `
    query{
        classrooms {
            id
            code
            endDate
        }
    }`


function Classes(props){
    return(
        <select id="classSelector" key="classSelectorField" onChange={props.onChange}>
            <option value="Select Class">Select Class</option>
            {props.classes.map((data) => <option value={data.code} key={data.code}>{data.code}</option>)}
        </select>
    );
}

class Selectors extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedClass: "Select Class",
            classes: ["Getting Classes..."]
        };
        this.runClassQuery();
    }

    async runClassQuery(){
        const res = await query(classQuery);
        const queryRes = await res.json();
        this.setStateAsync({classes: queryRes.data.classrooms});
    }

    setStateAsync(state){
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    onClassChange(newClassEvent){
        this.setState({
            selectedClass: newClassEvent.target.value
        });
        console.log(newClassEvent.target.value);
    }

    render() {
        return(
            <div className="classes">
                <Classes key="classSelector"
                    classes={this.state.classes}
                    onChange={i => this.onClassChange(i)}
                />
            </div>
        );
    }
}

export default Selectors;