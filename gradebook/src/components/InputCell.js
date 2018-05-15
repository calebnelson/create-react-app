import React from 'react';
import styled from 'styled-components'
import { TextInput } from 'react-native-web'

export const InputCell = styled(({ col, row, ...rest }) => <TextInput {...rest} />)`
    height: 2em;
    width: 2em;
    border-top: ${props => (props.row == 0 ? "1px solid black" : "0px")}
    border-left: ${props => (props.col == 1 ? "1px solid black" : "0px")}
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    text-align: center;
`