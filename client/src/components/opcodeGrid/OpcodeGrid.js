import React from 'react';
import styled from 'styled-components';
import clone from 'just-clone';
import OpcodesContext from '../../contexts/opcodes/OpcodesContext'
import OpcodeCardSmall from '../opcodeCard/opcodeCardSmall/OpcodeCardSmallV2';
import OpcodeCardLarge from '../opcodeCard/opcodeCardLarge/OpcodeCardLarge';
import OpcodeCardSmallFiller from '../opcodeCard/OpcodeCardSmallFiller';

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

    const [showDetailCard, setShowDetailCard] = React.useState(false);
    const [selectedOpcode, setSelectedOpcode] = React.useState({});
    const [mousePos, setMousePos] = React.useState({x:0, y:0});

    const gridContainerRef = React.useRef(null);

    const opcodes = codesToDisplay;
    let gridCoords = [];
    let gridRow = Array(16).fill(false);
    for(let i = 0; i < 16; i++){
        gridCoords.push(clone(gridRow));
    }

    const handleMouseMove = (evt) => {
        if(!showDetailCard){
            const bounds = gridContainerRef.current.getBoundingClientRect();
            setMousePos({x:(evt.clientX - bounds.left), y:(evt.clientY-bounds.top)});
        }
        
        console.log(mousePos);
    };

    // Check to see what indices need to be populated
    if(opcodes){
        opcodes.forEach(opcode => {
            const col = Number('0x' + (prefixed? opcode.hexCode[5]:opcode.hexCode[3]));
            const row = Number('0x' + (prefixed? opcode.hexCode[4]:opcode.hexCode[2]));
            
            gridCoords[row][col] = true;
        })
    }

    

    return(
        <>
            {opcodes &&
            <GridContainer ref={gridContainerRef} onMouseMove={handleMouseMove}>
                {
                    showDetailCard && selectedOpcode &&
                    <OpcodeCardLarge
                        mnemonic={selectedOpcode.mnemonic}
                        cycles={selectedOpcode.cycles}
                        operands={selectedOpcode.operands}
                        bytes={selectedOpcode.bytes}
                        flags={selectedOpcode.flags}
                        hexCode={selectedOpcode.hexCode}
                        category={selectedOpcode.category}
                        onClick={() => setShowDetailCard(false)}
                        xPos={mousePos.y}
                        yPos={mousePos.y}
                    />
                }
                <NewGrid>
                    <HeaderItem colStart={0}>0x{'>'}v</HeaderItem>
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
                                        category={opcode.category}
                                        colStart={Number('0x' + (prefixed? opcode.hexCode[5]:opcode.hexCode[3]))}
                                        rowStart={Number('0x' + (prefixed? opcode.hexCode[4]:opcode.hexCode[2]))}
                                        onClick={(evt) => {
                                            evt.preventDefault();
                                            if(!showDetailCard){
                                                setShowDetailCard(true);
                                                setSelectedOpcode(opcode);
                                            }
                                        }}
                                    />
                                // </div>
                                )
                            }
                    )}
                    {
                        gridCoords && gridCoords.map((gridRow, rowIdx) => gridRow.map(
                            (elt, colIdx) => {
                                if(!elt){
                                    return <OpcodeCardSmallFiller rowStart={rowIdx} colStart={colIdx}/>
                                }
                            }
                        ))
                    } 
                </NewGrid>
            </GridContainer>    
            }
        </>
    )
}

const GridContainer = styled.div`
    position: relative;
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
    grid-template-columns: repeat(17, 5.8vh [col-start]);
    grid-template-rows: repeat(17, 5vh [row-start]);
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

    
    grid-column-start:${props => props.colStart};
    grid-column-end: ${props => props.colStart+1};
    grid-row-start:0;
    grid-row-end:1;

    text-align: center;
`;

const SideItem = styled.div`
    /* grid-area: side; */

    display: flex;
    flex-direction: column;
    justify-content: center;

    grid-column-start:0;
    grid-column-end:1;
    grid-row-start:${props => props.rowStart};
    grid-row-end:${props => props.rowStart+1};
    text-align: center;
    background-color: lightblue;
`;


export default OpcodeGrid;