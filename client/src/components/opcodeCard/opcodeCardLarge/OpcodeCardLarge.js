import React from "react";
// import Popup from 'reactjs-popup';
import ReactTooltip from 'react-tooltip';

import styled, { ThemeProvider } from "styled-components";
import { getCardColor } from '../CardThemes';

const catText = 'The operation category.';
const hexText = 'The hexadecimal value of this opcode.';
const mnemText = 'A mnemomic version of the operand name.';
const tBytesText = 'The total number of bytes taken by this operation and any arguments.';
const cycText = ' The number of machine cycles taken by this operation to run. If this operation branches, this is denoted (cycles taken if true)/(cycles taken if false).';
const opIdxText = 'The index of this operand. Operands are 0 -indexed.';
const oppImmText = 'An operand is considered immediate if we are not interpreting its value to be a memory address.';
const oppBytes = 'The total number of bytes taken by this operand.';
const oppName = 'The shorthand name of this operand.'
const immText = 'An operation is considered immediate if all of its operands run on immediate data. ' + oppImmText;
const zText = 'The Z flag denotes whether an operation returns 0 or not.'
const nText = 'The N flag denotes if an operation performs a subtraction or not.';
const cText = 'The C flag denotes if an an operation caused an overflow, i.e. a carry from bit 7 to bit 8 (assuming 0 indexing of bits)';
const hText = 'The H flag denotes if an operation caused a carry from bit 3 to bit 4';
const noChangeText = '- : The flag is unchanged by this operation.';
const setZeroText = '0: The flag is always set to 0 by this operation.';
const setOneText = '1: The flag is always set to 1 by this operation.';
const setEffectText = ': The flag is set conditionally based on the outcome of the operation.';

/*

    switch(theme){
        case eightBitLdTheme:{
            return 'eightBitLd';
        }

        case sixteenBitLdTheme:{
            return 'sixteenBitLd';
        }

        case eightBitAluTheme: {
            return 'eightBitAlu';
        }

        case sixteenBitAluTheme: {
            return 'sixteenBitAlu';
        }

        case jpTheme: {
            return 'jp';
        }

        case regTheme: {
            return 'reg';
        }

        case controlTheme: {
            return 'control';
        }

        case defaultTheme: {
            return 'illegal';
        }

        default:{
            return '';
        }

*/
const getCategoryFormatted = (category) => {
    switch(category) {
        case 'eightBitLd':{
            return '8 Bit Load Operation';
        }
        
        case 'sixteenBitLd':{
            return '16 Bit Load Operation';
        }

        case 'eightBitAlu':{
            return '8 Bit ALU Operation';
        }

        case 'sixteenBitAlu':{
            return '16 Bit ALU Operation';
        }

        case 'jp':{
            return 'Jump Operation';
        }

        case 'reg':{
            return 'Register Bitwise Operation';
        }

        case 'control': {
            return 'Control Operation';
        }

        case 'illegal': {
            return 'Illegal Operation';
        }

        default:
            return '';
        
    }
}


export const OpcodeCardLarge = ({
    mnemonic,
    bytes,
    cycles,
    hexCode,
    operands,
    immediate,
    flags,
    category
}) => {

    const theme = getCardColor(mnemonic, operands);

    console.log('bytes ', bytes);
    console.log('immediate ', immediate);
    console.log('bytes ', operands[1].bytes);

    // TT -> Tool Tip
    // States to keep track of all the tooltips
    const [toolTip, setToolTip] = React.useState(true);

    const [catTT, setCatTT] = React.useState(true);
    const [hexTT, setHexTT] = React.useState(true);
    const [mnemTT, setMnemTT] = React.useState(true);
    const [tBytesTT, setTBytesTT] = React.useState(true);
    const [tImmTT, setTImmTT] = React.useState(true);
    const [cycTT, setCycTT] = React.useState(true);
    const [opIdxTT, setOpIdxTT] = React.useState(true);
    const [opNameTT, setOpNameTT] = React.useState(true);
    const [opImmTT, setOpImmTT] = React.useState(true);
    const [opBytesTT, setOpBytesTT] = React.useState(true);
    const [zTT, setZTT] = React.useState(true);
    const [nTT, setNTT] = React.useState(true);
    const [hTT, setHTT] = React.useState(true);
    const [cTT, setCTT] = React.useState(true);

    // Mouse enter handlers for triggering tooltip handlers
    

    const handleMouseEnter = (stateFn) => stateFn(true);
    const handleMouseLeave = (stateFn) => {
        stateFn(false);
        setTimeout(() => stateFn(true), 25);
    };

    const handleTTEnter = (evt) => {
        evt.preventDefault();
        handleMouseEnter(setToolTip);
    };

    const handleTTExit = (evt) => {

        evt.preventDefault();
        handleMouseLeave(setToolTip);
    };

    const handleCatTTEnter = (evt) => {
        // console.log("mouse enter");
        evt.preventDefault();
        handleMouseEnter(setCatTT);
    };
    const handleCatTTExit = (evt) => {
        // console.log("mouse exit");
        evt.preventDefault();
        handleMouseLeave(setCatTT);
    };

    const computeFlagText = (flag) => {
        switch(flag){
            case '0':{
                return setZeroText;
            }

            case '1':{
                return setOneText;
            }

            case '-':{
                return noChangeText;
            }

            case 'Z':{
                return zText;
            }

            case 'N':{
                return hText;
            }

            case 'H':{
                return hText;
            }

            case 'C':{
                return cText;
            }

            default:{
                return '';
            }
        }
    };

    const constructName = () => {
        let name = `${mnemonic} `;
        if(operands.length >= 1){
            name += `${operands[0].name} ` ;
        }

        if(operands.length >= 2){
            name += operands[1].name;
        }

        return name;
    }

    const handleHexTTEnter = (evt) => handleMouseEnter(setHexTT);
    const handleHexTTExit = (evt) => handleMouseLeave(setHexTT);

    const handleMnemTTEnter = (evt) => handleMouseEnter(setMnemTT);
    const handlMnemTTExit = (evt) => handleMouseLeave(setMnemTT);

    const handleTBytesTTEnter = (evt) => handleMouseEnter(setTBytesTT);
    const handleTBytesTTExit = (evt) => handleMouseLeave(setTBytesTT);

    const handleTImmTTEnter = (evt) => handleMouseEnter(setTImmTT);
    const handleTImmTTExit = (evt) => handleMouseLeave(setTImmTT);

    const handleCycTTEnter = (evt) => handleMouseEnter(setCycTT);
    const handleCycTTExit = (evt) => handleMouseLeave(setCycTT);

    const handleOpIdxTTEnter = (evt) => handleMouseEnter(setOpIdxTT);
    const handleOpIdxTTExit = (evt) => handleMouseLeave(setOpIdxTT);

    const handleOpNameTTEnter = (evt) => handleMouseEnter(setOpNameTT);
    const handleOpNameTTExit = (evt) => handleMouseLeave(setOpNameTT);

    const handleOpImTTEnter = (evt) => handleMouseEnter(setOpImmTT);
    const handleOpImTTExit = (evt) => handleMouseLeave(setOpImmTT);

    const handleOpBytesTTEnter = (evt) => handleMouseEnter(setOpBytesTT);
    const handleOpBytesTTExit = (evt) => handleMouseLeave(setOpBytesTT);

    const handleZTTEnter = (evt) => handleMouseEnter(setZTT);
    const handleZTTExit = (evt) => handleMouseLeave(setZTT);

    const handleNTTEnter = (evt) => handleMouseEnter(setNTT);
    const handleNTTExit = (evt) => handleMouseLeave(setNTT);

    const handleHTTEnter = (evt) => handleMouseEnter(setHTT);
    const handleHTTExit = (evt) => handleMouseLeave(setHTT);

    const handleCTTEnter = (evt) => handleMouseEnter(setCTT);
    const handleCTTExit = (evt) => handleMouseLeave(setCTT);


    return (
        <ThemeProvider theme={theme}>
            <Container>
                {/* Category */}
                    {toolTip &&
                        <StyledReactTooltip
                            id="tt"
                            place="bottom"
                            type="warning"
                            effect="float"
                            multiline={true}
                            showToolTip={false}
                        >
                        </StyledReactTooltip>

                    }
                    <div>{constructName()}</div>
                    
                    <div >
                        <a 
                        data-tip={catText} 
                        data-for="tt"
                        onMouseEnter={handleTTEnter}
                        onMouseLeave={handleTTExit}
                        >
                            {getCategoryFormatted(category)}
                        </a>
                    </div>
                {/* Hex & Mnemonic */}
                <Row>

                    <Item>
                        <a
                            data-tip={hexText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                            >
                        Hex Code</a>
                        <div>{hexCode}</div>
                    </Item>
                    
                    <Item>
                        <a
                            data-tip={mnemText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >Mnemonic</a>
                        <div>{mnemonic}</div>
                    </Item>
                    <div>
                        <a
                            data-tip={tBytesText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >Total Size in Bytes</a>
                        <div>{bytes}</div>
                    </div>
                </Row>
                {/* Immediate & cycles */}
                <Row>
                    <Item>
                        <a
                            data-tip={immText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >Immediate</a>
                        <div>{immediate ? 'True' : 'False'}</div>
                    </Item>
                    <Item>
                        <a
                            data-tip={cycText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >Cycles</a>
                        {
                            (cycles.length === 1) ? 
                            (<div>{cycles[0]}</div>) : (<div><div></div>On True/On False<div>{cycles[0]}/{cycles[1]}</div></div>)
                        }
                    </Item>
                </Row>
                {/* Operands */}
                <div>
                    {operands.length > 0 && operands.map((operand, idx) => <Row><Operand name={operand.name} index={idx} immediate={operand.immediate} bytes={operand.bytes}/></Row>)}
                </div>
                {/* Flags */}
                <Row>
                {toolTip &&
                        <StyledReactTooltip
                            id="zflag"
                            place="bottom"
                            type="warning"
                            effect="float"
                            multiline={true}
                            showToolTip={false}
                            getContent={() => computeFlagText(flags.Z)}
                        >
                        </StyledReactTooltip>
                    }
                    {toolTip &&
                        <StyledReactTooltip
                            id="nflag"
                            place="bottom"
                            type="warning"
                            effect="float"
                            multiline={true}
                            showToolTip={false}
                            getContent={() => computeFlagText(flags.N)}
                        >
                        </StyledReactTooltip>
                    }
                    {toolTip &&
                        <StyledReactTooltip
                            id="hflag"
                            place="bottom"
                            type="warning"
                            effect="float"
                            multiline={true}
                            showToolTip={false}
                            getContent={() => computeFlagText(flags.H)}
                        >
                        </StyledReactTooltip>
                    }
                    {toolTip &&
                        <StyledReactTooltip
                            id="cflag"
                            place="bottom"
                            type="warning"
                            effect="float"
                            multiline={true}
                            showToolTip={false}
                            getContent={() => computeFlagText(flags.H)}
                        >
                        </StyledReactTooltip>
                    }
                    <Item>
                        <a
                            data-tip={zText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >Z</a>
                        <div>
                            <a
                                data-tip
                                data-for='zflag'
                                onMouseEnter={handleTTEnter}
                                onMouseLeave={handleTTExit}
                            >{flags.Z}</a>
                        </div>
                        
                    </Item>
                    <Item>
                        <a
                            data-tip={nText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >N</a>
                        <div>
                            <a
                            data-tip
                            data-for='nflag'
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                            >
                                {flags.N}
                            </a>
                            
                        </div>
                    </Item>
                    <Item>
                        <a
                            data-tip={hText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >H</a>
                        <div>
                            <a
                            data-tip
                            data-for='hflag'
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                            >
                                {flags.H}
                            </a>
                            
                        </div>
                    </Item>
                    <Item>
                        <a
                            data-tip={cText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >C</a>
                        <div>
                            <a
                                data-tip
                                data-for='cflag'
                                
                            >
                                {flags.C}
                            </a>
                            
                        </div>
                    </Item>
                </Row>
            </Container>

        </ThemeProvider>
    );

};

const Operand = ({name, immediate, bytes, index }) => {
    
    const [toolTipOp, setToolTipOp] = React.useState(true);

    const handleMouseEnter = (stateFn) => stateFn(true);
    const handleMouseLeave = (stateFn) => {
        stateFn(false);
        setTimeout(() => stateFn(true), 25);
    };

    const handleTTEnter = (evt) => {
        evt.preventDefault();
        handleMouseEnter(setToolTipOp);
    };

    const handleTTExit = (evt) => {

        evt.preventDefault();
        handleMouseLeave(setToolTipOp);
    };

    return(
        <OperandContainer>
            {toolTipOp &&
                <StyledReactTooltip
                    id={`ttOp${index}`}
                    place="bottom"
                    type="warning"
                    effect="float"
                    multiline={true}
                    showToolTip={false}
                >
                </StyledReactTooltip>

            }
            <Item>
                <a
                    data-tip={opIdxText} 
                    data-for={`ttOp${index}`}
                    onMouseEnter={handleTTEnter}
                    onMouseLeave={handleTTExit}
                >Index</a>
                <div>{index}</div>
            </Item>
            <Item>
                <a
                    data-tip={oppName} 
                    data-for={`ttOp${index}`}
                    onMouseEnter={handleTTEnter}
                    onMouseLeave={handleTTExit}
                >Name</a>
                <div>{name}</div>
            </Item>
            {immediate &&
            <Item>
                <a
                    data-tip={oppImmText} 
                    data-for={`ttOp${index}`}
                    onMouseEnter={handleTTEnter}
                    onMouseLeave={handleTTExit}
                >Immediate</a>
                <div>{immediate? 'True': 'False'}</div>
            </Item>}
            {bytes && 
            <Item>
                <a
                    data-tip={oppBytes} 
                    data-for={`ttOp${index}`}
                    onMouseEnter={handleTTEnter}
                    onMouseLeave={handleTTExit}
                >Size in Bytes</a>
                <div>{bytes}</div>
            </Item>}
        </OperandContainer>
    )
};

const FlagInfo = ({flag}) => {

};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.secondary};
    border: 10px solid;
    border-radius: 5px;
    border-color: ${props => props.theme.primary};
    padding: 10px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
`;

const OperandContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Item = styled.div`
    padding-right: 10px;
`;

const StyledReactTooltip = styled(ReactTooltip)`
    max-width: 250px !important;
`


export default OpcodeCardLarge;