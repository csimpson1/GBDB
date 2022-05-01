import React from 'react';
import styled from 'styled-components';
import {Collapse} from 'react-collapse';
import Select from 'react-select';
import FilterSection, {InputContainer} from './FilterSection';
import FilterContext  from '../../contexts/filter-context/FilterContext';

const GeneralSection = ({submit}) => {
    /*
        Things that we will allow the user to filter by
        Categories as displayed on the ui -> colored multiselect
        mnemonic, bytes, immediate, hexCode 
        prefixed vs non prefixed
        cycles -> has a comparator and a value which is a number
        flags -> expands to show each flag and their options
        Operands -> name, bytes, immediate, index
        Also have the ability to add a second set of inputs for a second operand if needed
    */

    const {
        actions:{
            updateFilters
        }
    } = React.useContext(FilterContext);

    const categoryOptions = [
        {value:'eightBitLd', label:'8 Bit Loads'},
        {value:'sixteenBitLd', label:'16 Bit Loads'},
        {value:'eightBitAlu', label:'8 Bit ALU Operations'},
        {value:'sixteenBitAlu', label:'16 Bit ALU Operations'},
        {value:'jp', label:'Jump & Call Operations'},
        {value:'ctrl', label:'Control Operations'},
        {value:'reg', label:'Shift, Rotate, & Bitwise Operations'},
        {value:'illegal', label: 'Illegal Operations'}
    ];

    const bytesOptions = [
        {value:1, label:1},
        {value:2, label:2},
        {value:3, label:3},
    ];
    const cyclesOptions = [
        {value:4, label: 4},
        {value:8, label: 8},
        {value:12, label:12},
        {value:16, label: 16},
        {value:20, label:20},
        {value:24, label:24},
    ];

    const operationOptions = [
        {value: 'lt', label: 'Less Than'},
        {value: 'eq', label: 'Equal To'},
        {value: 'gt', label: 'Greater Than'}
    ];

    const categories = React.useRef(null);
    const hexCode = React.useRef(null);
    const bytes= React.useRef(null);
    const cycles = React.useRef(null);
    const operation = React.useRef(null);

    const handleClick = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        console.log(categories.current);
        console.log(categories.current.getValue());
        console.log(hexCode.current.value);
        console.log(bytes.current.getValue());
        console.log(cycles.current.getValue());
    }

    const updateSearchVal = (evt, key,) => {
        const payload = {};
        let choices = evt;
        console.log('event ', evt);
        if(choices.value){
            choices = choices.value;
        }
        else if(choices[0] && choices[0].value){
            console.log(choices);
            choices = choices.map(choice => choice.value);
        }
        console.log(choices);
        payload[key] = choices;
        updateFilters(payload);

    };

    const updateCategories = (evt) => {
        console.log(evt);
        updateSearchVal(evt, 'category');
    };

    const updateHexCode = (evt) => {
        updateSearchVal(evt, 'hexCode');
    };

    const updateBytes = (evt) => {
        console.log('event ', evt);
        updateSearchVal(evt, 'bytes');
    };

    const updateCycles = (evt) => {
        updateSearchVal(evt, 'cycles');
    };

    const updateCyclesOperand = (evt) => {
        updateSearchVal(evt, 'cyclesOperation');
    }

    return(
        <FilterSection label="General Options">
            
            <InputContainer>
                <label htmlFor="categories">Operation Categories</label>
                <Select
                    isMulti
                    options={categoryOptions}
                    id='categories'
                    ref={categories}
                    onChange={updateCategories}
                />
            </InputContainer>
            <InputContainer>
                <label htmlFor="hexCode">Hex Code</label>
                <input id='hexCode' name="hexCode" type='text' ref={hexCode} onInput={updateHexCode}></input>
            </InputContainer>
            <InputContainer>
                <label htmlFor="bytes">Bytes</label>
                <Select id ="bytes" name="bytes" options={bytesOptions} ref={bytes} onChange={updateBytes}/>
            </InputContainer>
            <InputContainer>
                <label htmlFor="cycles">Cycles</label>
                <Select id="cycles" name="cycles" options={cyclesOptions} ref={cycles} onChange={updateCycles}/>
                <Select id="operation" name="operations" options={operationOptions} ref={operation} onChange={updateCyclesOperand}/>
            </InputContainer>
            <button onClick={handleClick}>TEST</button>
        </FilterSection>
);

};

export default GeneralSection;