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
        <div>
            <div>
                <button onClick={handleAddRow}>+</button>
                <button onClick={handleRemoveRow}>-</button>
                
            </div>
            <div>
                {filterCriteria.map(elt => <FilterOption isFirst={false}/>)}
                <FilterOption isFirst={false}/>
            </div>
            
        </div>

    );
};

export default FilterOptions;