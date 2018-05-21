import React from 'react';
import { Flex } from './Flex';
import { TextCell } from './TextCell';
import InputCell from './InputCell';

function getValue(resp) {
  if (resp === 1) {
    return '1';
  }
  if (resp === 0) {
    return '0';
  }
  return '';
}

export const TableColumn = ({
  problem,
  columnTotal,
  submissions,
  onChange,
  handleKeyDown,
  inputs,
}) => (
  <Flex col>
    <TextCell
      col
      link
      topborder
      accessibilityRole="link"
      href={'https://next.ardentlabs.io/problem/'.concat(problem.id)}
      target="_blank"
    >
      {problem.order}
    </TextCell>
    <TextCell col altcolor>
      {columnTotal}
    </TextCell>
    {submissions.map((submissionData, index) => (
      <InputCell
        key={`${index}, ${problem.order}`}
        defaultValue={getValue(submissionData.responses[problem.order])}
        problemNum={problem.order}
        rowNum={index}
        studentId={submissionData.student.id}
        onChange={onChange}
        handleKeyDown={handleKeyDown}
        altcolor={index % 2 === 1}
        inputRef={
          inputs[index * submissionData.responses.length + (problem.order - 1)]
        }
      />
    ))}
  </Flex>
);
