import React from 'react';
import styled from 'styled-components';
import OpcodesContext from '../../contexts/opcodes/OpcodesContext'
import OpcodeCardSmall from '../opcodeCard/opcodeCardSmall/OpcodeCardSmallV2';



// Array of strings representing hex numbers
const headerArr = [...Array(16).keys()].map(elt => elt.toString(16));

const OpcodeGrid = ({codesToDisplay, prefixed}) => {
    const {
        // opcodes,
        state,
        actions:{
            getOpcodes
        }
    } = React.useContext(OpcodesContext);

    const opcodes = codesToDisplay;

    return(
        <>
            {opcodes &&
 
                <NewGrid>
                    <HeaderItem colStart={0}>Hexcode</HeaderItem>
                    {headerArr.map((elt, idx) => (<HeaderItem colStart={idx+1}>{elt}</HeaderItem>))}
                    {headerArr.map((elt, idx) => <SideItem rowStart={idx+1}>{elt}</SideItem>)}
                    {opcodes && opcodes.map(opcode => {
                                return (
                                <OpcodeCardSmall
                                    mnemonic={opcode.mnemonic}
                                    cycles={opcode.cycles}
                                    operands={opcode.operands}
                                    flags={opcode.flags}
                                    hexCode={opcode.hexCode}
                                    key={opcode.hexCode}
                                    colStart={Number('0x' + (prefixed? opcode.hexCode[5]:opcode.hexCode[3]))}
                                    rowStart={Number('0x' + (prefixed? opcode.hexCode[4]:opcode.hexCode[2]))}
                                />)
                            }
                    )} 
                </NewGrid>
                
            }
        </>
    )
}

const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88%;
    column-gap: calc(5px + 5em);
`;

const SideContainer = styled.div`
    display: grid;
    grid-template-rows: 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88%;
    row-gap: calc(5px+ 1rem);
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 5.8% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88%;
    grid-template-rows: 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88%;
    column-gap: calc(5px);
    row-gap: calc(5px+ 1rem);
`;

const SideAndGrid = styled.div`
    display: flex;
`

const NewGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(17, 5.8% [col-start]);
    grid-template-rows: repeat(17, 5.8% [row-start]);
    column-gap: calc(5px);
    row-gap: calc(5px);
    /* grid-template-areas:
        "crnr head head head head head head head head head head head head head head head head" 
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        "side item item item item item item item item item item item item item item item item"
        ; */
`;

const HeaderItem = styled.div`
    /* grid-area: head; */
    background-color: green;
    grid-column-start:${props => props.colStart};
    grid-column-end: ${props => props.colStart+1};
    grid-row-start:0;
    grid-row-end:1;
`;

const SideItem = styled.div`
    /* grid-area: side; */
    background-color: pink;
    grid-column-start:0;
    grid-column-end:1;
    grid-row-start:${props => props.rowStart};
    grid-row-end:${props => props.rowStart+1};
`;

const GridItem = styled.div`
    /* grid-area: item; */
`;

export default OpcodeGrid;