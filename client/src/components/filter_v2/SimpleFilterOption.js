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

export const SimpleFilterOption = ({ index, searchType }) => {
    const {
        filterCriteria,
        actions: {
            addRow,
            deleteRow,
        }
    } = React.useContext(FilterContext);

    const [label, setLabel] = React.useState('');
    const [options, setOptions] = React.useState({});

    const inputRef = React.useRef(null);

    React.useEffect(() => {
        console.log(searchType);
        switch(searchType){
            case 'category': {
                setLabel('Operation Category');

                inputRef.current.clearValue();
                setOptions(categoryOptions);
                console.log(options);
                break;
            }

            case 'mnemonic':{
                setLabel('Mnemonic');
                // inputRef.current.clearValue();
                setOptions(mnemonicOptions);
                break;
            }

            case 'immediate': {
                setLabel('Immediate');
                inputRef.current.clearValue();
                setOptions(immediateOptions);
                break;
            }

            case 'hexCode': {
                setLabel('Hex Code');
                // inputRef.current.clearValue();
                setOptions(null);
                break;
            }

            case 'bytes': {
                setLabel('Bytes');
                inputRef.current.clearValue();
                setOptions(bytesOptions);
                break;
            }

            default:
                break;
        };

        console.log(options);

    }, [searchType]);


    const handleChange = (evt) => {
        if(evt){
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