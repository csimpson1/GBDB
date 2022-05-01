import React from 'react';
import styled from 'styled-components';
import {Collapse} from 'react-collapse';
import Select from 'react-select';

const FilterSection = ({ children, label, isOpenDefault=false, }) => {
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

    const [isOpened, setIsOpened] = React.useState(isOpenDefault)

    const handleClick = (evt) => {
        // Toggle the filter section open or closed
        evt.preventDefault();
        evt.stopPropagation();
        setIsOpened(!isOpened)
    }

    return(
    <>
        <div onClick={handleClick}>{label}</div>
        <Collapse isOpened={isOpened}>
            {children}
        </Collapse>
    </>            


    );

};

export const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    padding-left: 10px;
    width: 30%;
`;

export default FilterSection;