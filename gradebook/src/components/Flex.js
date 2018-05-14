import React from 'react'
import styled from 'styled-components'
import { View } from 'react-native-web'

export const Flex = styled(({ col, grow, max, ...rest}) => <View {...rest} />)`
    display: flex;
    flex-grow: ${props => props.grow ? '1' : '0'};
    ${props => props.max ? 'max-width: 7em' : ''};
    flex-direction: ${props => props.col ? 'column' : 'row'};
`