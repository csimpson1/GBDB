import React from 'react';
import styled from 'styled-components';
import FilterOption from './FilterOption';
import FilterContext from '../../contexts/filter-v2-context/FilterContext';

export const ExistingRow = ({index, data}) => {
    const [rowPayload, setRowPayload] = React.useState({});
    const [validated, setValidated] = React.useState(false);

    const {
            actions:{ 
            removeRow,
            addRow,
        }
    } = React.useContext(FilterContext);

    const handleClick = (evt) => {
        evt.preventDefault();
        removeRow(rowPayload);
    };

    // React.useEffect(() => {
    //     setValidated(true);
    // }, []);

    React.useEffect(() => {
        console.log('Row Payload');
        console.log(rowPayload);
        console.log('Data ', data);
        if(rowPayload.filter && validated){
            console.log('change in payload');
            addRow(rowPayload);
        }

        // else if(!validated){
        //     setValidated(true);
        // }
        
    }, [rowPayload]);

    // The isInactive here is a gross hack for now. This skirts around the problems being had with the existing rows being edited
    // by disabling editing on these. 
    return (
        <Container>
            <ButtonContainer>
                <button onClick={handleClick}>-</button>
            </ButtonContainer>
            <FilterOption index={index} isFirst={false} data={data} setRowPayload={setRowPayload} setValidated={setValidated} isInactive={true}/>
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