import React from "react";
import styled from "styled-components";
import FilterOption from "./FilterOption";
import FilterContext from "../../contexts/filter-v2-context/FilterContext";
import NewRow from "./NewRow";
import ExistingRow from "./ExistingRow";
import { Collapse } from 'react-collapse'; 

const FilterOptions = () => {
    const {
        filterCriteria,
        actions:{
            addRow,
            removeRow,
            createPayload,
        }
    } = React.useContext(FilterContext);

    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = (evt) => {
        evt.preventDefault();
        setIsOpen(!isOpen);
    }

    const handleAddRow = (evt) => {
        evt.stopPropagation();
        addRow({filter: {}});
    }

    const handleRemoveRow = (evt) => {
        evt.stopPropagation();
        removeRow({rowNum: (filterCriteria.length - 1)})
    }

    const handleTestPayload = (evt) => {
        evt.preventDefault();
        console.log(createPayload());
    }

    return(
        <div>
            <button onClick={toggleOpen}>Show Filters</button>
            <Container >
                
                <Collapse isOpened={isOpen}>
                    {filterCriteria.map((elt, idx) => <ExistingRow index={idx} data={elt} isFirst={false}/>)}
                    <NewRow index={filterCriteria.length}/>
                </Collapse>
                <button onClick={handleTestPayload}>test payload</button>
            </Container>
        </div>

    );
};

const Container = styled.div`
    display: flex;
    align-items: flex-end;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default FilterOptions;