import React from 'react';
import Select from 'react-select';
import clone from 'just-clone';

import FilterContext from '../../contexts/filter-v2-context/FilterContext';

import {
    operandBytesOptions,
    operandIndexOptions,
    operandNameOptions,
    immediateOptions
} from './FilterConstants';

import {
    InputWrapper,
    InputGroupWrapper
} from './FilterStyles';

export const OperandFilterOptions = ({index}) => {

    const {
        filterCriteria,
        actions: {
            addRow,
            deleteRow
        }
    } = React.useContext(FilterContext);

    // const [opName, setOpName] = React.useState('');
    // const [opBytes, setOpBytes] = React.useState('');
    // const [opImm, setOpImm] = React.useState('');
    // const [opIdx, setOpIdx] = React.useState('');

    const handleChange = (evt, param) => {
        console.log(evt);
        let rowData = {};
        if(filterCriteria[index]){
            rowData = clone(filterCriteria[index]);
        };

        // Set the parameter triggered by this event, and update the row in the context
        rowData[param] = evt.value;
        addRow({rowNum: index, filter: rowData});
    };

    const handleNameChange = (evt) => {
        handleChange(evt, '');
    };

    const handleBytesChange = (evt) => {
        // setOpBytes(evt.value);
    };

    const handleImmChange = (evt) => {
        // setOpImm(evt.value);
    };

    const handleIdxChange = (evt) => {
        // setOpIdx(evt.value);
    };

    const operandName = React.useRef(null);
    const operandBytes = React.useRef(null);
    const operandImmediate = React.useRef(null);
    const operandIndex = React.useRef(null);

    return (
        <InputGroupWrapper>
            <InputWrapper>
                <label htmlFor="operand-name">Operand Name</label>
                <Select id='operand-name' name='operand-name' options={operandNameOptions} ref={operandName} onChange={handleNameChange}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="operand-bytes"># of Bytes</label>
                <Select id='operand-bytes' name='operand-bytes' options={operandBytesOptions} ref={operandBytes} onChange={handleBytesChange}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="operand-immediate">Immediate</label>
                <Select id='operand-immediate' name='operand-immediate' options={immediateOptions} ref={operandImmediate} onChange={handleImmChange}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="operand-index">Index</label>
                <Select id='operand-index' name='operand-index' options={operandIndexOptions} ref={operandIndex} onChange={handleIdxChange}/>
            </InputWrapper>
        </InputGroupWrapper>
    )
};

export default OperandFilterOptions