import styled from 'styled-components'
import { Text } from 'react-native-web'

export const TextCell = styled(Text)`
    height: 2em;
    width: ${props => props.col ? '2em' : '100%'};
`