import React from 'react';
import { Flex } from './Flex';
import { TextCell } from './TextCell';
import Cell from './Cell';

function getValue(resp){
    if (resp === 1){
        return "1";
    }
    if (resp === 0){
        return "0";
    }
    return "";
}

export const TableColumn = ({problemNum, columnTotal, submissions, onChange, handleKeyDown, inputs}) => (
    <Flex col>
    <TextCell col>{problemNum + 1}</TextCell>
    <TextCell col>{columnTotal}</TextCell>
    {submissions.map((submissionData, index) => (
        <Cell
            key={`${index}, ${problemNum}`}
            defaultValue={getValue(submissionData.responses[problemNum])}
            problemNum={problemNum}
            rowNum={index}
            studentId={submissionData.student.id}
            onChange={onChange}
            handleKeyDown={handleKeyDown}
            inputRef={inputs[index * submissionData.responses.length + problemNum]}
        />
    ))}
    </Flex>
);