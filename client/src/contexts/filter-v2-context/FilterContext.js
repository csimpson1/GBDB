import React, {createContext, useContext, useReducer} from "react";
import clone from 'just-clone';
import OpcodesContext from "../opcodes/OpcodesContext";

export const FilterContext = createContext(null);

const initialState = {
    filterCriteria: []
}

const reducer = (state, action) => {
    const data = action.data;
    let newState = clone(state)
    switch (action.type){
        case 'add-row':{
            // we want to add a row, either to a specific index or to a
            // action = {type: string, rowNum: int, filter: {...} }
            console.log('Updating current row');
            console.log('data ', data.rowNum, ' ', data.filter);
            // debugger;
            if(typeof data.rowNum === 'number'  &&  0 <= data.rowNum && data.rowNum < newState.filterCriteria.length){
                console.log(newState.filterCriteria.splice(data.rowNum, 1, data.filter));
                newState.filterCriteria.splice(data.rowNum, 1, data.filter);
                console.log('newState ', newState);
                return newState;
            }

            else if((typeof data.rowNum === 'number' &&  0 <= data.rowNum && data.rowNum === newState.filterCriteria.length) || !data.rowNum){
                newState.filterCriteria.push(data.filter);
                console.log('newState ', newState)
                return newState
            }

            else{
                console.log('Some issue');
                return state;
            }


        }

        case 'delete-row':{
            // we want to delete a row at a specific index
            console.log('action: ', data);
            console.log(0 <= data.rowNum);
            console.log(data.rowNum < newState.filterCriteria.length);
            if(typeof data.rowNum === 'number' &&  0 <= data.rowNum && data.rowNum < newState.filterCriteria.length){
                newState.filterCriteria = newState.filterCriteria.filter((elt, idx) => idx !== data.rowNum);
                console.log('length ', newState.filterCriteria.length);
                return newState;
            }

            else{
                console.log('no action taken');
                return state
            }
        }
    }
};

export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        actions:{
            getSpecificOpcodes
        }
    } = useContext(OpcodesContext);

    const addRow = (data) => {
        console.log('addRow called');
        console.log('data ', data);
        dispatch({type: 'add-row', data})
    }

    const removeRow = (data) => {
        console.log('data ', data);
        dispatch({type :'delete-row', data});
    }

    const createPayload = () => {
        // Create a payload to be sent to the opcodes service
        // If a user enters multiple rows that will affect the same criteria
        // ie they enter two distinct rows for hexcode, the latter value will be what is passed
        let payload = {};
        state.filterCriteria.forEach(criteria => {
            // criteria has the form  {currentSearchField, data}
            console.log('criteria ', criteria);
            Object.keys(criteria).forEach(key => {
                //payload[criteria.currentSearchField] = criteria.data;
                if(key === 'operand'){
                    // operand expects an array, so we coalesse all instances here
                    payload[key]? (payload[key].append(criteria[key])):(payload[key] = [criteria[key]]);
                }
                else{
                    payload[key] = criteria[key];
                }
                
            })
            
        })

        console.log(payload);
        return JSON.stringify(payload);
    };

    const makeOpcodeCall = () => {
        const payload = createPayload();
        console.log(payload);
        getSpecificOpcodes(payload);
    }

    return(
        <FilterContext.Provider
            value={{
                ...state,
                actions:{
                    addRow,
                    removeRow,
                    createPayload,
                    makeOpcodeCall,
                }
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

export default FilterContext;