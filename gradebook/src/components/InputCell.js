import styled from 'styled-components'
import { TextInput } from 'react-native-web'

export const InputCell = styled(TextInput)`
    height: 2em;
    width: 2em;
    border-top: 0px;
    border-left: 0px;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    text-align: center;
`

export const InputCellTop = styled(TextInput)`
    height: 2em;
    width: 2em;
    border-top: 1px solid black;
    border-left: 0px;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    text-align: center;
`

export const InputCellLeft = styled(TextInput)`
    height: 2em;
    width: 2em;
    border-top: 0px;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    text-align: center;
`

export const InputCellTopLeft = styled(TextInput)`
    height: 2em;
    width: 2em;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    text-align: center;
`