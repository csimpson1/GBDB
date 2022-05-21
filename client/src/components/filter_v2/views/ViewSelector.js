import React from 'react';
import ViewsContext from '../../../contexts/saved-views/ViewContext';
import FilterContext from '../../../contexts/filter-v2-context/FilterContext';
import OpcodesContext from '../../../contexts/opcodes/OpcodesContext';
import styled from 'styled-components'
import Select from 'react-select';

export const ViewSelector = () => {
    const {
        views,
        status,
        reqStatus,
        actions: {
            getViews,
            saveView,
            deleteView
        }
    } = React.useContext(ViewsContext);

    const {
        filterCriteria,
        actions:{
            setView, 
            makeOpcodeCall,
            createPayload,
        }
    } = React.useContext(FilterContext);

    const {
        actions:{
            getSpecificOpcodes
        }
    } = React.useContext(OpcodesContext)

    const viewSelectRef = React.useRef(null)

    const [selectedView, setSelectedView] = React.useState(null);
    const [waitingForUpdate, setWaitingForUpdate] = React.useState(false);
    const [localViews, setLocalViews] = React.useState([{value: '', label: 'Loading...'}]);

    const handleChooseView = (evt) => {
        if(evt){
            setSelectedView(evt.value);
        }
        
    }

    const handleSelectView = (evt) => {
        console.log(evt.value);
        if(selectedView){
            setView(selectedView.view);
            setWaitingForUpdate(true);

        }
    };

    const handleDeleteView = (evt) => {
        if(selectedView){
            deleteView(selectedView._id);
            viewSelectRef.current.clearValue();
            getViews();
        }
    };

    const handleCancel = (evt) => {
        evt.preventDefault();
        setSelectedView(null);
    }

    //let localViews = [{value: '', label: 'Loading...'}];

    // On initialization, call to get view options 
    React.useEffect(() => {
        getViews();
    }, []);

    // When the views change, update our local copy of them
    React.useEffect(() => {
        setLocalViews(views.map(elt => {
            return {
                label: elt.name,
                value: elt.values
            }
        }))
    }, [views])

    /*Idea: if we made an update to the filter from 
      this component, we set the flag waitingForUpdate to true.
      When we see the filterCriteria has been updated in the parent component,
      then trigger the call to get the new opcodes
    */
    React.useEffect(() => {
        if(waitingForUpdate){
            makeOpcodeCall();
            setWaitingForUpdate(false);
        }
    }, [filterCriteria])

    return(
        <ViewContainer>
            <div>Select View</div>
            <InputContainer>
                <Select id='views' name={views} options={localViews} ref={viewSelectRef} onChange={handleChooseView}></Select>
                <ButtonContainer>
                    <button onClick={handleSelectView}>Select View</button>
                    <button onClick={handleDeleteView}>Delete View</button>
                    <button onClick={handleDeleteView}>Cancel</button>
                </ButtonContainer>
            </InputContainer>
            
        </ViewContainer>
    );

};


const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export default ViewSelector;