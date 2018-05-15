import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native-web';

export const TextCell = styled(({ col, left, link, ...rest }) => <Text {...rest} />)`
  height: 2em;
  width: ${props => (props.col ? '2em' : '100%')};
  justify-content: ${props => (props.left ? 'flex-start' : 'center')};
  display: flex;
  align-items: center;
  text-decoration: ${props => (props.link ? 'underline' : 'none')}
  color: ${props => (props.link ? 'blue' : 'black')}
`;
