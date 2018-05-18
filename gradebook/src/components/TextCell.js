import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native-web';

export const TextCell = styled(({ col, left, link, altcolor, topborder, leftborder, ...rest }) => <Text {...rest} />)`
  height: 2em;
  width: ${props => (props.col ? '2em' : '100%')};
  justify-content: ${props => (props.left ? 'flex-start' : 'center')};
  display: flex;
  align-items: center;
  text-decoration: ${props => (props.link ? 'underline' : 'none')};
  color: ${props => (props.link ? 'blue' : 'black')};
  border-top: ${props => (props.topborder ? '1px solid black' : '0px')};
  border-left: ${props => (props.leftborder ? '1px solid black' : '0px')};
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  padding-left: .5em;
  padding-right: .5em;
  background: ${props => (props.altcolor ? "#F1FFFA" : "#AFD2E9")};
`;
