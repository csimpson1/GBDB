import React from 'react';
import styled from 'styled-components';
import { getCardColor } from '../CardThemes';

/*
    _id
    :625b22853323612bb4f1f469
    mnemonic:"LD"
    bytes:1
    cycles:
    Array
        0:8
    operands:Array
        0:Object
            name
            :"BC"
            immediate
            :false
        1:Object
            name
            :"A"
            immediate
            :true
    immediate:false
    flags:Object
        Z:"-"
        N:"-"
        H:"-"
        C:"-"
    hexCode:"0x02"
*/

const OpcodeCardSmall = ({mnemonic, cycles, operands, flags, hexcode}) => {
    const theme = getCardColor(mnemonic, operands);
    
    const getTitleString = (mnemonic, operands) => {
        let titleString = '';
        switch(operands.length){
            case 1:{
                titleString = `${mnemonic} ${operands[0].name}`;
                break;
            }

            case 2:{
                titleString = `${mnemonic} ${operands[0].name}, ${operands[1].name}`;
                break;
            }

            case 3:{
                titleString = `${mnemonic} ${operands[0].name}, ${operands[1].name}+${operands[2].name}`;
                break;
            }

            default:{
                titleString = 'ERROR';

            }
        }

        return titleString;
    };

    const getCycleString = (cycles) => {
        let cyclesString = '';

        switch(cycles.length){
            case 1:{
                cyclesString = `${cycles[0]}`;
                break;
            }

            case 2:{
                cyclesString = `${cycles[0]}/${cycles[1]}`;
                break;
            }

            default:{
                cyclesString = 'ERROR';
            }
        }

        return cyclesString;
    };

    const getFlagString = (flags) => {
        return `${flags.Z} ${flags.N} ${flags.H} ${flags.C}`
    }
    console.log('here!');
    return(
        <div>
            <div>
                {getTitleString(mnemonic, operands)}
            </div>
            <div>
                {getCycleString(cycles)}
            </div>
            <div>
                {getFlagString(flags)}
            </div>
        </div>    
    );
};

export default OpcodeCardSmall;