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

export const OperandFilterOptions = ({index, selectedValues}) => {

    const {
        filterCriteria,
        actions: {
            addRow,
            deleteRow
        }
    } = React.useContext(FilterContext);

    const [opName, setOpName] = React.useState('');
    const [opBytes, setOpBytes] = React.useState('');
    const [opImm, setOpImm] = React.useState('');
    const [opIdx, setOpIdx] = React.useState('');

    const handleChange = (evt, param) => {
        // console.log(evt);
        let rowData = {};
        if(filterCriteria[index]){
            rowData = clone(filterCriteria[index]);
        };

        // Set the parameter triggered by this event, and update the row in the context
        rowData[param] = evt.value;
        addRow({rowNum: index, filter: rowData});
    };

    const handleNameChange = (evt) => {
        setOpName(evt.value);
    };

    const handleBytesChange = (evt) => {
        setOpBytes(evt.value);
    };

    const handleImmChange = (evt) => {
        setOpImm(evt.value);
    };

    const handleIdxChange = (evt) => {
        setOpIdx(evt.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(opName||opBytes||opImm||opIdx){
            let payload={};
            if(opName) payload.name = opName;
            if(opBytes) payload.bytes = opBytes;
            if(opImm) payload.immediate = opImm;
            if(opIdx) payload.index = opIdx;

            addRow({rowNum: index, filter:{operand:payload}});
        }
    }


    const operandName = React.useRef(null);
    const operandBytes = React.useRef(null);
    const operandImmediate = React.useRef(null);
    const operandIndex = React.useRef(null);

    React.useEffect(() => {
        if(selectedValues && Object.keys(selectedValues).length > 0){
            console.log(selectedValues);
            if(selectedValues.name){
                console.log('name ', selectedValues.name);
                setOpName(selectedValues.name);
                operandName.current.setValue(operandNameOptions.filter(elt => elt.value === selectedValues.name));
            }

            if(selectedValues.bytes){
                setOpBytes(selectedValues.bytes);
                operandBytes.current.setValue(operandBytesOptions.filter(elt => elt.value === selectedValues.bytes));
            }

            if(selectedValues.immediate){
                setOpImm(selectedValues.immediate);
                operandImmediate.current.setValue(immediateOptions.filter(elt => elt.value === selectedValues.immediate));
            }

            if(selectedValues.index){
                setOpIdx(selectedValues.index);
                operandIndex.current.setValue(operandIndexOptions.filter(elt => elt.value === selectedValues.index));
            }
        }
    }, [selectedValues]);

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
            <button onClick={handleSubmit}>Submit Operand Options</button>
        </InputGroupWrapper>
    )
};

export default OperandFilterOptions