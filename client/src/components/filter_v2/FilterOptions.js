import React from "react";
import styled from "styled-components";
import FilterOption from "./FilterOption";
import FilterContext from "../../contexts/filter-v2-context/FilterContext";

const FilterOptions = () => {
    const {
        filterCriteria,
        actions:{
            addRow,
            removeRow
        }
    } = React.useContext(FilterContext);

    const handleAddRow = (evt) => {
        evt.stopPropagation();
        addRow({filter: {}});
    }

    const handleRemoveRow = (evt) => {
        evt.stopPropagation();
        removeRow({rowNum: (filterCriteria.length - 1)})
    }

    return(
        <Container>
            <ButtonContainer>
                <button onClick={handleAddRow}>+</button>
                <button onClick={handleRemoveRow}>-</button>
                
            </ButtonContainer>
            <div>
                {filterCriteria.map((elt, idx) => <FilterOption index={idx} data={elt} isFirst={false}/>)}
                <FilterOption index={filterCriteria.length} isFirst={false}/>
            </div>
            
        </Container>

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