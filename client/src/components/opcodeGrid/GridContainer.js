import React from "react";
import OpcodesContext from "../../contexts/opcodes/OpcodesContext";
import OpcodeGrid from "./OpcodeGrid";

export const GridContainer = () => {
    const {
        opcodes,
        prefixed,
        unprefixed,
        status,
        actions:{
            getOpcodes
        }
    } = React.useContext(OpcodesContext);

    const [codeType, setCodeType] = React.useState(unprefixed);
    const [prefixedFlag, setPrefixedFlag] = React.useState(false);

    const callOpcodeService = async () => {
            await getOpcodes();
    }

    React.useEffect(() => {
        callOpcodeService();
    }, []);

    React.useEffect(() => {
        if(prefixedFlag){
            setCodeType(prefixed);
        }
        else{
            setCodeType(unprefixed);
        }
    }, [opcodes, prefixedFlag])

    const handlePrefixedClick = (evt) => {
        evt.preventDefault();
        setCodeType(prefixed);
        setPrefixedFlag(true);
    } 

    const handleUnprefixedClick = (evt) => {
        evt.preventDefault();
        setCodeType(unprefixed);
        setPrefixedFlag(false);
    }

    return(<>
            {status === 'idle' && 
                <div>
                    <div>
                        <button onClick={handleUnprefixedClick}>Unprefixed</button>
                        <button onClick={handlePrefixedClick}>Prefixed</button>
                    </div>
                    <OpcodeGrid codesToDisplay={codeType} prefixed={prefixedFlag} />
                </div>
            }</>
    )



}