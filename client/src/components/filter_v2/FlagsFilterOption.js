import React from 'react';
import Select from 'react-select'
import FilterContext from '../../contexts/filter-v2-context/FilterContext';

import {
    flagOptions
} from './FilterConstants';

import {
    InputWrapper,
    InputGroupWrapper
} from './FilterStyles';

export const FlagsFilterOption = ({index}) => {

    const zFlag = React.useRef(null);
    const nFlag = React.useRef(null);
    const hFlag = React.useRef(null);
    const cFlag = React.useRef(null);

    const {
        actions: {
            addRow,
            deleteRow
        }
    } = React.useContext(FilterContext);

    const handleChange = (evt) => {
        console.log(evt);
    };

    return (
        <InputGroupWrapper>
            <InputWrapper>
                <label htmlFor='zflag'>Z</label>
                <Select id='zflag' name='zflag' ref={zFlag} options={[...flagOptions, {value:'Z', label:'Z'}]} onChange={handleChange}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor='nflag'>N</label>
                <Select id='nflag' name='nflag' ref={nFlag} options={[...flagOptions, {value:'N', label:'N'}]} onChange={handleChange}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor='hflag'>H</label>
                <Select id='hflag' name='hflag' ref={hFlag} options={[...flagOptions, {value:'H', label:'H'}]} onChange={handleChange}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor='cflag'>C</label>
                <Select id='cflag' name='cflag' ref={cFlag} options={[...flagOptions, {value:'C', label:'C'}]} onChange={handleChange}/>
            </InputWrapper>
        </InputGroupWrapper>
    )
}

export default FlagsFilterOption