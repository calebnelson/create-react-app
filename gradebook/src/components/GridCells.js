import styled from 'styled-components'
import { TextInput } from 'react-native-web'

const GridCell = styled(TextInput)`
    height: 2em;
    width: 2em;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    text-align: center;
    background: #AFD2E9;
`

export const GridCellDefault = GridCell.extend`
    border-top: 0px;
    border-left: 0px;
`

export const GridCellTop = GridCell.extend`
    border-top: 1px solid black;
    border-left: 0px;
`

export const GridCellLeft = GridCell.extend`
    border-top: 0px;
    border-left: 1px solid black;
`

export const GridCellTopLeft = GridCell.extend`
    border-top: 1px solid black;
    border-left: 1px solid black;
`

export const GridCellAltColor = GridCellDefault.extend`
    background: #F1FFFA;
`

export const GridCellAltColorLeft = GridCellLeft.extend`
    background: #F1FFFA;
`