import React from 'react'
import styled from 'styled-components'
import { View } from 'react-native-web'

export const Flex = styled(({ col, grow, ...rest}) => <View {...rest} />)`
    display: flex;
    flex-grow: ${props => props.grow ? '1' : '0'};
    flex-direction: ${props => props.col ? 'column' : 'row'};
`