import React from 'react';
import styled from 'styled-components';
import FilterOption from './FilterOption';
import FilterContext from '../../contexts/filter-v2-context/FilterContext';

export const ExistingRow = ({index, data}) => {
    const [rowPayload, setRowPayload] = React.useState({});

    const {
        actions: {removeRow}
    } = React.useContext(FilterContext);

    const handleClick = (evt) => {
        evt.preventDefault();
        removeRow(rowPayload);
    };

    return (
        <Container>
            <ButtonContainer>
                <button onClick={handleClick}>-</button>
            </ButtonContainer>
            <FilterOption index={index} isFirst={false} data={data} setRowPayload={setRowPayload}/>
        </Container>
    )


};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default ExistingRow;