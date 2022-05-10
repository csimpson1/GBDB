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

export const CyclesFilterOption = ({index, selectedValues}) => {
    
    const[op, setOp] = React.useState(null);
    const[cycles, setCycles] = React.useState(null);

    const {
        actions: {
            addRow,
            deleteRow
        }
    } = React.useContext(FilterContext);


    const inputRef = React.useRef(null);
    const cyclesOperation = React.useRef(null);

    const handleCycleChange = (evt) => {
        setCycles(evt.value);
    };

    const handleOpChange = (evt) => {
        setOp(evt.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(op || cycles){
            let payload = {};
            if(op) payload.op = op;
            if(cycles) payload.val = cycles;
            addRow({rowNum: index, filter:{cycles:payload}});
        }

    }



    React.useEffect(() => {

        if(selectedValues){
            if(selectedValues.op){
                setOp(selectedValues.op);
                cyclesOperation.current.setValue(operationOptions.filter(elt => elt.value === selectedValues.op));
            }
    
            if(selectedValues.val){
                setCycles(selectedValues.val);
                inputRef.current.setValue(cyclesOptions.filter(elt => elt.value === selectedValues.val));
            }
        }
        
    }, [selectedValues]);

    return(
        <InputGroupWrapper>
            <InputWrapper>
                <label htmlFor="cycles-op">Operation</label>
                <Select label="cycles-op" id="cycles-op" ref={cyclesOperation} options={operationOptions} onChange={handleOpChange}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor={`simple-input-cycles`}>Cycles</label>
                <Select id={`simple-input-cycles`} name={`simple-input-cycles`} ref={inputRef} options={cyclesOptions} onChange={handleCycleChange}/>
            </InputWrapper>
            <button onClick={handleSubmit}>Submit Cycles</button>
        </InputGroupWrapper>
    )
}

export default CyclesFilterOption;