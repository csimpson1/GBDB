import React from "react";
import styled from "styled-components";
import FilterContext from "../../contexts/filter-v2-context/FilterContext";
import ViewsContext from "../../contexts/saved-views/ViewContext";
import NewRow from "./NewRow";
import ExistingRow from "./ExistingRow";


const FilterOptions = ({setValidated}) => {
    const {
        filterCriteria,
        actions:{
            addRow,
            removeRow,
            createPayload,
            makeOpcodeCall,
        }
    } = React.useContext(FilterContext);

    const {
        actions: {
            saveView
        }
    } = React.useContext(ViewsContext);

    const viewNameRef = React.useRef(null)

    const [isOpen, setIsOpen] = React.useState(false);
    const [viewOpen, setViewOpen] = React.useState(false);


    const handleSubmitFilter = (evt) => {
        evt.preventDefault();
        console.log(createPayload());
        makeOpcodeCall();
    }

    const handleOpenView = (evt) => {
        setViewOpen(true);
    }

    const handleClose = () => {
        setViewOpen(false);
    }

    const handleSaveView = () => {
        const name=viewNameRef.current.value;
        console.log(filterCriteria);
        const view=filterCriteria;
        saveView(name, view);
        handleClose(); 
    }

    return(

            <Container >

                {filterCriteria.map((elt, idx) => <ExistingRow index={idx} data={elt} isFirst={false} setValidate={setValidated}/>)}
                <hline></hline>
                <NewRow index={filterCriteria.length} setValidated={setValidated}/>

                    <InputContainer>
                        { !viewOpen &&
                            <div>
                                <button onClick={handleSubmitFilter}>Set Filter</button>
                                <button onClick={handleOpenView}>Save as View</button>
                            </div>
                            
                        }
                        { viewOpen &&
                            <div>
                                <label htmlFor='view-name'>View Name</label>
                                <input id='view-name' name='view-name' type='text' ref={viewNameRef}/>
                                <button onClick={handleSaveView}>Save View</button>
                                <button onClick={handleClose}>Cancel</button>
                            </div>
                            
                        }

                    </InputContainer>
            </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const InputContainer = styled.div`
    align-self: flex-end;
`;

export default FilterOptions;