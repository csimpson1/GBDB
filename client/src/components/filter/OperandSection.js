import React from "react";
import styled from "styled-components";
import FilterSection, {InputContainer} from "./FilterSection";

const OperandSection = () => {
    const [hasSecondOperand, setHasSecondOperand] = React.useState(false);

    // Operands -> name, bytes, immediate, index
    // Also have the ability to add a second set of inputs for a second operand if needed

    const addOperand = (evt) => {
        // The user has added another operand, so toggle state so it is displayed 
        evt.preventDefault();
        evt.stopPropagation();
        setHasSecondOperand(!hasSecondOperand);
    }

    

}

export default OperandSection;