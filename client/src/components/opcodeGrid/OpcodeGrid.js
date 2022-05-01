import React from 'react';
import styled from 'styled-components';
import OpcodesContext from '../../contexts/opcodes/OpcodesContext'
import OpcodeCardSmall from '../opcodeCard/opcodeCardSmall/OpcodeCardSmall';

const data = [
    {
        "_id": "625b22853323612bb4f1f467",
        "mnemonic": "NOP",
        "bytes": 1,
        "cycles": [
            4
        ],
        "operands": [],
        "immediate": true,
        "flags": {
            "Z": "-",
            "N": "-",
            "H": "-",
            "C": "-"
        },
        "hexCode": "0x00"
    },
    {
        "_id": "625b22853323612bb4f1f468",
        "mnemonic": "LD",
        "bytes": 3,
        "cycles": [
            12
        ],
        "operands": [
            {
                "name": "BC",
                "immediate": true
            },
            {
                "name": "d16",
                "bytes": 2,
                "immediate": true
            }
        ],
        "immediate": true,
        "flags": {
            "Z": "-",
            "N": "-",
            "H": "-",
            "C": "-"
        },
        "hexCode": "0x01"
    },
    {
        "_id": "625b22853323612bb4f1f469",
        "mnemonic": "LD",
        "bytes": 1,
        "cycles": [
            8
        ],
        "operands": [
            {
                "name": "BC",
                "immediate": false
            },
            {
                "name": "A",
                "immediate": true
            }
        ],
        "immediate": false,
        "flags": {
            "Z": "-",
            "N": "-",
            "H": "-",
            "C": "-"
        },
        "hexCode": "0x02"
    },
    {
        "_id": "625b22853323612bb4f1f46a",
        "mnemonic": "INC",
        "bytes": 1,
        "cycles": [
            8
        ],
        "operands": [
            {
                "name": "BC",
                "immediate": true
            }
        ],
        "immediate": true,
        "flags": {
            "Z": "-",
            "N": "-",
            "H": "-",
            "C": "-"
        },
        "hexCode": "0x03"
    },
];

const OpcodeGrid = () => {
    const {
        opcodes,
        state,
        actions:{
            getOpcodes
        }
    } = React.useContext(OpcodesContext);

    React.useEffect(() => {
        if(!opcodes || opcodes.length === 0){
            getOpcodes();
        }
        
    }, []);

    return(
        <>
            {opcodes && 
                <Container>
                    {opcodes.map(opcode => {
                        return (
                        <OpcodeCardSmall
                            mnemonic={opcode.mnemonic}
                            cycles={opcode.cycles}
                            operands={opcode.operands}
                            flags={opcode.flags}
                            hexCode={opcode.hexCode}
                            key={opcode.hexCode}
                        />)
                    })}
                </Container>
            }
        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88%;
    grid-template-rows: 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88% 5.88%;
    column-gap: calc(5px);
    row-gap: calc(5px+ 1rem);
`;

export default OpcodeGrid;