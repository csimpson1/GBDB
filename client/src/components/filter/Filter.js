import React from 'react';
import styled from 'styled-components';
import {Collapse} from 'react-collapse';
import Select from 'react-select';
import GeneralSection from './GeneralSection';


const Filter = () => {
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

    const [isGenOptionsOpened, setIsGenOptionsOpened] = React.useState(true)


    return(
        //<FilterContextProvider>
            <div>
                <form>
                    <GeneralSection/>
                </form>
            </div>
        //</FilterContextProvider>
    );

};

export default Filter;