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
    
    getOptions = async() =>{
        const res = await query(classQuery);
        const queryRes = await res.json();
        return queryRes.data.classrooms;
    }

    render() {
        const classes = this.getOptions();
        console.log(classes);
        return(
            <div>
            {classes.map((data) => <option value={data.code}>{data.code}</option>)}
            </div>
        );
    }
}

export default Classes;