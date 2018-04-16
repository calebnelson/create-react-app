import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native-web';

export const TextCell = styled(({ col, ...rest }) => <Text {...rest} />)`
  height: 2em;
  width: ${props => (props.col ? '2em' : '100%')};
  text-align: center;
`;
