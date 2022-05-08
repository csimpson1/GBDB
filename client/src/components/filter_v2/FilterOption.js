import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import SimpleFilterOption from './SimpleFilterOption';
import CyclesFilterOption from './CyclesFilterOption';
import FlagsFilterOption from './FlagsFilterOption';
import OperandFilterOptions from './OperandFilterOptions';

import {
    logicalOptions,
    searchTypeOptions,
    bytesOptions,

} from './FilterConstants';
import reactSelect from 'react-select';

export const FilterOption = ({isFirst, index, data}) => {
    


    // Refs
    const logicOperator = React.useRef(null);
    const searchField = React.useRef(null);
    const bytes = React.useRef(null);



    // states
    const [currentSearchField, setCurrentSearchField] = React.useState('');

    // helper functions
    const handleSearchFieldChange = (evt) => {
        console.log('changing search field event to ', evt);
        setCurrentSearchField(evt.value);
    }

    React.useEffect(() => {
        if(data){
            const key = Object.keys(data)[0];
            const valueToSet = searchTypeOptions.filter(elt => elt.value === key);
            searchField.current.setValue(valueToSet, 'select-option');
            setCurrentSearchField(key);
        }
    }, [data]);
    



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
                (['category', 'mnemonic', 'immediate', 'hexCode', 'bytes'].includes(currentSearchField)) &&
                <SimpleFilterOption index={index} searchType={currentSearchField}/>
            }

            {/* {
                (currentSearchField === 'bytes') &&
                <InputGroupWrapper>
                    <InputWrapper>
                        <label htmlFor='bytes'>Total Bytes</label>
                        <Select id='bytes' name='bytes' ref={bytes} options={bytesOptions} isMulti={true} />
                    </InputWrapper>
                    
                </InputGroupWrapper>
            } */}

            {
                (currentSearchField === 'cycles') &&
                <CyclesFilterOption index={index}/>
            }

            {
                (currentSearchField === 'flags') &&
                <FlagsFilterOption index={index}/>
            }

            {
                (currentSearchField === 'operand') && 
                <OperandFilterOptions index={index} />
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