import React from "react";
import OpcodesContext from "../../contexts/opcodes/OpcodesContext";
import OpcodeGrid from "./OpcodeGrid";

export const GridContainer = () => {
    const {
        opcodes,
        prefixed,
        unprefixed,
        state,
        actions:{
            getOpcodes
        }
    } = React.useContext(OpcodesContext);

    const [codeType, setCodeType] = React.useState(unprefixed);
    const [prefixedFlag, setPrefixedFlag] = React.useState(false);

    React.useEffect(() => {
        if(!opcodes || opcodes.length === 0){
            getOpcodes();
        }
        
    }, []);

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

    return(
        <div>
            <div>
                <button onClick={handleUnprefixedClick}>Unprefixed</button>
                <button onClick={handlePrefixedClick}>Prefixed</button>
            </div>
            <OpcodeGrid codesToDisplay={codeType} prefixed={prefixedFlag} />
        </div>

    )


}