import React from 'react';
import Select from 'react-select'
import styled from 'styled-components';
import FilterContext from '../../contexts/filter-v2-context/FilterContext';

import {
    cyclesOptions,
    operationOptions
} from './FilterConstants';

import {
    InputWrapper,
    InputGroupWrapper
} from './FilterStyles';

export const CyclesFilterOption = ({index}) => {
    const {
        actions: {
            addRow,
            deleteRow
        }
    } = React.useContext(FilterContext);

    const handleChange = (evt) => {
        console.log(evt);
    };

    const inputRef = React.useRef(null);
    const cyclesOperation = React.useRef(null);

    return(
        <InputGroupWrapper>
            <InputWrapper>
                <label htmlFor="cycles-op">Operation</label>
                <Select label="cycles-op" id="cycles-op" ref={cyclesOperation} options={operationOptions}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor={`simple-input-cycles`}>Cycles</label>
                <Select id={`simple-input-cycles`} name={`simple-input-cycles`} ref={inputRef} options={cyclesOptions} onChange={handleChange}/>
            </InputWrapper>
        </InputGroupWrapper>
    )
}

export default CyclesFilterOption;