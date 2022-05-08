import React from 'react';
import Select from 'react-select'
import clone from 'just-clone'
import FilterContext from '../../contexts/filter-v2-context/FilterContext';

import {
    categoryOptions,
    mnemonicOptions,
    immediateOptions,
    bytesOptions,
} from './FilterConstants';

import {
    InputWrapper,
    InputGroupWrapper
} from './FilterStyles';

export const SimpleFilterOption = ({ index, searchType, selectedVal }) => {
    const {
        filterCriteria,
        actions: {
            addRow,
            deleteRow,
        }
    } = React.useContext(FilterContext);

    const [label, setLabel] = React.useState('');
    const [options, setOptions] = React.useState({});
    /*
    When we are setting values on a row that represents a previous filter choice for the user, 
    we do not want to trigger the onChange event, since that adds another row to the context. 
    This flag tracks if we are currenly firing change events or not.
    */
    const [addingRows, setAddingRows] = React.useState(true);

    const inputRef = React.useRef(null);

    const setUserSelection = (choiceArray, selectedVal) => {
        // If this component represents a filter choice the user had already made,
        // set the value they had chosen
        if(selectedVal){
            setAddingRows(false);
            const userSelectedOption = choiceArray.filter(elt => elt.value === selectedVal);
            inputRef.current.setValue(userSelectedOption, 'select-value');
            setAddingRows(true);
        }
        
    }

    React.useEffect(() => {
        // debugger;
        // console.log('searchType',  searchType);
        switch(searchType){
            case 'category': {
                setLabel('Operation Category');

                inputRef.current.clearValue();
                const opts = categoryOptions;
                setOptions(opts);
                setUserSelection(opts, selectedVal);
                break;
            }

            case 'mnemonic':{
                setLabel('Mnemonic');
                // inputRef.current.clearValue();
                const opts = mnemonicOptions;
                setOptions(opts);
                setUserSelection(opts, selectedVal);
                break;
            }

            case 'immediate': {
                setLabel('Immediate');
                inputRef.current.clearValue();
                const opts = immediateOptions
                setOptions(opts);
                setUserSelection(opts, selectedVal);
                break;
            }

            case 'hexCode': {
                setLabel('Hex Code');
                inputRef.current.clearValue();
                setOptions(null);
                break;
            }

            case 'bytes': {
                setLabel('Bytes');
                inputRef.current.clearValue();
                const opts = bytesOptions;
                setOptions(opts);
                setUserSelection(opts, selectedVal);
                break;
            }

            default:
                break;
        };

    }, [searchType, selectedVal]);


    const handleChange = (evt) => {
        // debugger;
        // console.log('simple filter option index check ', filterCriteria.length === index);
        if(evt && filterCriteria.length === index){
            console.log('inputChangeEvent');
            console.log('evt ', evt);
            let rowData = {};
            if(filterCriteria[index]){
                rowData = clone(filterCriteria[index]);
            };

            // Set the parameter triggered by this event, and update the row in the context
            rowData[searchType] = evt.value;
            addRow({rowNum: index, filter: rowData});
        }
    }

    return(
        <InputGroupWrapper>
            <InputWrapper>
                <label htmlFor={`simple-input-${searchType}`}>{label}</label>
                {
                    searchType === 'hexCode'?
                        <input id={`simple-input-${searchType}`} name={`simple-input-${searchType}`} type='text' ref={inputRef} onInput={handleChange}/>
                        :<Select id={`simple-input-${searchType}`} name={`simple-input-${searchType}`} ref={inputRef} options={options} onChange={handleChange}/>
                }
            </InputWrapper>
        </InputGroupWrapper>
    )
}

export default SimpleFilterOption;