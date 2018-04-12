import React from 'react'
import styled from 'styled-components'
import { View } from 'react-native-web'

export const Flex = styled(({ col, ...rest}) => <View {...rest} />)`
    flex: 1;
    flex-direction: ${props => props.col ? 'column' : 'row'}
`