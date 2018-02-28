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
    query lessonsFromClass($classID: ID!) {
        classroom(id: $classID) {
            lessons {
                id
                lessonPlan {
                    title
                    description
                    order
                }
            }
        }
    }
`


function Classes(props){
    return(
        <select id="classSelector" key="classSelectorField" onChange={props.onChange}>
            <option value="" selected disabled hidden>Select Class</option>
            {props.classes.map((data) => <option value={data.code} key={data.code}>{data.code}</option>)}
        </select>
    );
}

function Lessons(props){
    return(
        <select id="lessonSelector" key="lessonSelectorField" onChange={props.onChange}>
            <option value="" selected disabled hidden>Select Lesson</option>
            {props.lessons.map((data) => <option value={data.id} key={data.id}>{data.id}</option>)}
        </select>
    );
}

class Selectors extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedClass: undefined,
            classes: ["Getting Classes..."],
            lessons: ["Choose Class to get Lessons"],
        };
        this.runClassQuery();
    }

    async runClassQuery(){
        const res = await query(classQuery);
        const queryRes = await res.json();
        this.setStateAsync({classes: queryRes.data.classrooms});
    }

    async runLessonQuery(classID){
        var variables = "{ \"classID\": \"".concat(classID).concat("\" }");
        const res = await query(lessonQuery, variables);
        const queryRes = await res.json();
        this.setStateAsync({lessons: queryRes.data.classroom.lessons})
    }

    setStateAsync(state){
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    onClassChange(newClassEvent){
        var classCode = newClassEvent.target.value;
        var index = this.state.classes.findIndex(x => x.code === classCode);
        var sc = this.state.classes[index];
        this.setState({
            selectedClass: sc
        });
        this.runLessonQuery(sc.id);
        console.log(this.state.lessons);
    }

    onLessonChange(newLessonEvent){
        var lessonID = newLessonEvent.target.value;
        var index = this.state.lessons.findIndex(x => x.id === lessonID);
        var sl = this.state.lessons[index];
        this.setState({
            selectedLesson: sl
        })
        console.log(sl);
    }

    render() {
        return(
            <div className="classes">
                <Classes key="classSelector"
                    classes={this.state.classes}
                    onChange={i => this.onClassChange(i)}
                />
                <Lessons key="lessonSelector"
                    lessons={this.state.lessons}
                    onChange={i => this.onLessonChange(i)}
                />
            </div>
        );
    }
}

export default Selectors;