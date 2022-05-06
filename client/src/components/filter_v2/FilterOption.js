import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import SimpleFilterOption from './SimpleFilterOption';

import {
    logicalOptions,
    searchTypeOptions,
    mnemonicOptions,
    categoryOptions,
    bytesOptions,
    cyclesOptions,
    operationOptions,
    flagOptions,
    operandNameOptions,
    operandBytesOptions,
    immediateOptions,
    operandIndexOptions
} from './FilterConstants';

export const FilterOption = ({isFirst, index}) => {
    


    // Refs
    const logicOperator = React.useRef(null);
    const searchField = React.useRef(null);
    const category = React.useRef(null);
    const mnemonic = React.useRef(null);
    const bytes = React.useRef(null);
    const immediate = React.useRef(null);
    const hexCode = React.useRef(null);
    const cyclesNum = React.useRef(null);
    const cyclesOperation = React.useRef(null);
    const zFlag = React.useRef(null);
    const nFlag = React.useRef(null);
    const hFlag = React.useRef(null);
    const cFlag = React.useRef(null);
    const operandName = React.useRef(null);
    const operandBytes = React.useRef(null);
    const operandImmediate = React.useRef(null);
    const operandIndex= React.useRef(null);


    // states
    const [currentSearchField, setCurrentSearchField] = React.useState('');

    // helper functions
    const handleSearchFieldChange = (evt) => {
        setCurrentSearchField(evt.value);
    }



    return(
        <InputContainer>
            {
                isFirst && 
                <InputGroupWrapper>
                    <InputWrapper>
                        <label htmlFor='logic-operator'></label>
                        <Select id='logic-operator' name='logic-operator' ref={logicOperator} options={logicalOptions}/>
                    </InputWrapper>
                    
                </InputGroupWrapper>
            }
            <InputGroupWrapper>
                <InputWrapper>
                    <label htmlFor='search-field'>Search Field</label>
                    <Select ref={searchField} options={searchTypeOptions} onChange={handleSearchFieldChange}/>
                </InputWrapper>
            </InputGroupWrapper>
            {
                (['category', 'mnemonic', 'immediate', 'hexcode'].includes(currentSearchField)) &&
                <SimpleFilterOption index={index} searchType={currentSearchField}/>
            }

            {
                (currentSearchField === 'bytes') &&
                <InputGroupWrapper>
                    <InputWrapper>
                        <label htmlFor='bytes'>Total Bytes</label>
                        <Select id='bytes' name='bytes' ref={bytes} options={bytesOptions} isMulti={true} />
                    </InputWrapper>
                    
                </InputGroupWrapper>
            }

            {
                (currentSearchField === 'cycles') &&
                <InputGroupWrapper>
                    <InputWrapper>
                        <label htmlFor="cycles-op">Operation</label>
                        <Select label="cycles-op" id="cycles-op" ref={cyclesOperation} options={operationOptions}/>
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor='cycles-num'># of Cycles</label>
                        <Select id='cycles-num' name='cycles-num' ref={cyclesNum} options={cyclesOptions}/>
                    </InputWrapper>
                    
                    
                </InputGroupWrapper>
            }

            {
                (currentSearchField === 'flags') &&
                <InputGroupWrapper>
                    <InputWrapper>
                        <label htmlFor='zflag'>Z</label>
                        <Select id='zflag' name='zflag' ref={zFlag} options={[...flagOptions, {value:'Z', label:'Z'}]}/>
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor='nflag'>N</label>
                        <Select id='nflag' name='nflag' ref={nFlag} options={[...flagOptions, {value:'N', label:'N'}]}/>
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor='hflag'>H</label>
                        <Select id='hflag' name='hflag' ref={hFlag} options={[...flagOptions, {value:'H', label:'H'}]}/>
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor='cflag'>C</label>
                        <Select id='cflag' name='cflag' ref={cFlag} options={[...flagOptions, {value:'C', label:'C'}]}/>
                    </InputWrapper>
                </InputGroupWrapper>
            }

            {
                (currentSearchField === 'operand') && 
                    <InputGroupWrapper>
                        <InputWrapper>
                            <label htmlFor="operand-name">Operand Name</label>
                            <Select id='operand-name' name='operand-name' options={operandNameOptions} ref={operandName}/>
                        </InputWrapper>
                        <InputWrapper>
                            <label htmlFor="operand-bytes"># of Bytes</label>
                            <Select id='operand-bytes' name='operand-bytes' options={operandBytesOptions} ref={operandBytes}/>
                        </InputWrapper>
                        <InputWrapper>
                            <label htmlFor="operand-immediate">Immediate</label>
                            <Select id='operand-immediate' name='operand-immediate' options={immediateOptions} ref={operandImmediate}/>
                        </InputWrapper>
                        <InputWrapper>
                            <label htmlFor="operand-index">Index</label>
                            <Select id='operand-index' name='operand-index' options={operandIndexOptions} ref={operandIndex}/>
                        </InputWrapper>
                    </InputGroupWrapper>
                
            }

        </InputContainer>
    );
};

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputGroupWrapper = styled.div`
    display: flex;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: flex-end
`;

/*
<InputWrapper>
</InputWrapper>
*/
export default FilterOption