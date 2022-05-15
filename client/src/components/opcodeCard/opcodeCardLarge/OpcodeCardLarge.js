import React from "react";
import Popup from 'reactjs-popup';
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
const imText = 'An operation is considered immediate if all of its operands run on immediate data. ' + oppImmText;
const zText = 'The Z flag denotes whether an operation returns 0 or not.'
const nText = 'The N flag denotes if an operation performs a subtraction or not.';
const cText = 'The C flag denotes if an an operation caused an overflow, i.e. a carry from bit 7 to bit 8 (assuming 0 indexing of bits)';
const hText = 'The H flag denots if an operation caused a carry from bit 3 to bit 4';
const noChangeText = '- : The flag is unchanged by this operation.';
const setZeroText = '0: The flag is always set to 0 by this operation.';
const setOneText = '1: The flag is always set to 1 by this operation.';
const setEffectText = ': The flag is set conditionally based on the outcome of the operation.';


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
    const [catTT, setCatTT] = React.useState(false);
    const [hexTT, setHexTT] = React.useState(false);
    const [mnemTT, setMnemTT] = React.useState(false);
    const [tBytesTT, setTBytesTT] = React.useState(false);
    const [tImmTT, setTImmTT] = React.useState(false);
    const [cycTT, setCycTT] = React.useState(false);
    const [opIdxTT, setOpIdxTT] = React.useState(false);
    const [opNameTT, setOpNameTT] = React.useState(false);
    const [opImmTT, setOpImmTT] = React.useState(false);
    const [opBytesTT, setOpBytesTT] = React.useState(false);
    const [zTT, setZTT] = React.useState(false);
    const [nTT, setNTT] = React.useState(false);
    const [hTT, setHTT] = React.useState(false);
    const [cTT, setCTT] = React.useState(false);

    // Mouse enter handlers for triggering tool handlers

    const handleMouseEnter = (stateFn) => stateFn(true);
    const handleMouseLeave = (stateFn) => stateFn(false);

    const handleCatTTEnter = (evt) => handleMouseEnter(setCatTT);
    const handleCatTTExit = (ext) => handleMouseLeave(setCatTT);

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
                <Popup open={catTT}>
                    {catText}
                </Popup>
                <div>{category}</div>
                {/* Hex & Mnemonic */}
                <Row>
                    <Item>
                        <div>Hex Code</div>
                        <div>{hexCode}</div>
                    </Item>
                        
                    <Item>
                        <div>Mnemonic</div>
                        <div>{mnemonic}</div>
                    </Item>
                    <div>
                        <div>Total Size in Bytes</div>
                        <div>{bytes}</div>
                    </div>
                </Row>
                {/* Immediate & cycles */}
                <Row>
                    <Item>
                        <div>Immediate</div>
                        <div>{immediate ? 'True' : 'False'}</div>
                    </Item>
                    <Item>
                        <div>Cycles</div>
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
                    <Item>
                        <div>Z</div>
                        <div>{flags.Z}</div>
                    </Item>
                    <Item>
                        <div>N</div>
                        <div>{flags.N}</div>
                    </Item>
                    <Item>
                        <div>H</div>
                        <div>{flags.H}</div>
                    </Item>
                    <Item>
                        <div>C</div>
                        <div>{flags.C}</div>
                    </Item>
                </Row>
            </Container>
        </ThemeProvider>
    );

};

const Operand = ({name, immediate, bytes, index }) => {
    console.log('in operand bytes ', bytes);
    return(
        <OperandContainer>
            <Item>
                <div>Index</div>
                <div>{index}</div>
            </Item>
            <Item>
                <div>Name</div>
                <div>{name}</div>
            </Item>
            {immediate &&
            <Item>
                <div>Immediate</div>
                <div>{immediate? 'True': 'False'}</div>
            </Item>}
            {bytes && 
            <Item>
                <div>Size in Bytes</div>
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
    border: 5px solid;
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
`
export default OpcodeCardLarge;