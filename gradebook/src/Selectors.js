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

const lessonQuery = `

`


function Classes(props){
    return(
        <select id="classSelector" key="classSelectorField" onChange={props.onChange}>
            <option value="" selected disabled hidden>Select Class</option>
            {props.classes.map((data) => <option value={data.code} key={data.code}>{data.code}</option>)}
        </select>
    );
}

class Selectors extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedClass: undefined,
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
        var classCode = newClassEvent.target.value;
        var index = this.state.classes.findIndex(x => x.code === classCode);
        this.setState({
            selectedClass: this.state.classes[index]
        });
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