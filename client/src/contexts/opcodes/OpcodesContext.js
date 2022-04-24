import React, {useState, createContext, useContext, useReducer} from "react";
export const OpcodesContext = createContext();

const initialState = {
    opcodes: [],
    status: 'waiting'
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'loading-data':{
            return {
                ...state, 
                status:'waiting'
            };
        }

        case 'got-data': {
            return {
                ...state,
                status:'idle',
                opcodes: action.data,
            }
        }

        case 'error': {
            return {
                ...state,
                status: 'error'
            }
        }
        
        default:{
            throw new Error(`Action ${action.type} is not recognized!`);
        }
    }
};

export const OpcodesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getOpcodes = async () => {
        try{
            dispatch({type:'loading-data'});
            const resp = await fetch('/opcodes');
            const parsedResp = await resp.json();
            if(parsedResp.status < 400){
                dispatch({type: 'got-data', data: parsedResp.data});
            }

            else{
                dispatch({type: 'error'});
            }
        }

        catch (err){
            console.log(err);
            dispatch({type:'error'});
        }
    };

    return (
        <OpcodesContext.Provider
            value={{
                ...state,
                actions: {
                    getOpcodes,
                }
            }}
        >

        </OpcodesContext.Provider>
    );
};

export default OpcodesContext;