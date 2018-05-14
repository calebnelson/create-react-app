import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native-web';

export const TextCell = styled(({ col, left, border, ...rest }) => <Text {...rest} />)`
  height: 2.1em;
  width: ${props => (props.col ? '2em' : '100%')};
  text-align: ${props => (props.left ? 'left' : 'center')};
  borderWidth: ${props => (props.border ? '2px' : '1px')};
  borderColor: black;
`;
