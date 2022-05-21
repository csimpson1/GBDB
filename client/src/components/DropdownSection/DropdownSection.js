import React from "react";
import styled from "styled-components";
import { Collapse } from 'react-collapse';
import {CgChevronRightO, CgChevronDownO} from 'react-icons/cg';


const DropdownSection = ({children, title}) => {


    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = (evt) => {
        evt.preventDefault();
        setIsOpen(!isOpen);
    }



    return(
        <DropdownContainer>
            <div>
                <button onClick={toggleOpen}>{isOpen && <CgChevronDownO/>}{!isOpen && <CgChevronRightO/>}</button>
            </div>
            <Container>
                {!isOpen && <Title>{title}</Title>}
                <Collapse isOpened={isOpen}>
                    {children}
                </Collapse>
            </Container>
        </DropdownContainer>

    );
};

const DropdownContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`

const Title = styled.div`
`

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    margin-left: 30px;
`;



export default DropdownSection;