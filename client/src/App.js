import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./components/globalstyles/GlobalStyles"
import { OpcodesProvider } from "./contexts/opcodes/OpcodesContext";
// import { FilterContextProvider } from './contexts/filter-context/FilterContext';
import TestOpcodeCardSmall from "./components/opcodeCard/opcodeCardSmall/TestOpcodeCardSmall";
import OpcodeGrid from "./components/opcodeGrid/OpcodeGrid";
// import Filter from "./components/filter/Filter";
import FilterOption from "./components/filter_v2/FilterOption";
import {FilterProvider} from "./contexts/filter-v2-context/FilterContext";
import { ViewsProvider } from "./contexts/saved-views/ViewContext";
import FilterOptions from "./components/filter_v2/FilterOptions";
import { GridContainer } from "./components/opcodeGrid/GridContainer";
import {TestOpcodeLarge} from "./components/opcodeCard/opcodeCardLarge/TestOpcodeLarge"
import Loader from "./components/Loader/Loader";

function App() {
  return (
      <OpcodesProvider>
          <Router>
            <GlobalStyles />
            <FilterProvider>
              <ViewsProvider>
                <FilterOptions/>
              </ViewsProvider>
            </FilterProvider>
              <Routes>
                <Route path="/" element={<GridContainer/>}/>
                <Route path="/help" element={<Loader/>}/>
                <Route path="/ops"/>
                <Route path="/ops/:id"/>
                <Route path="/cbops"/>
                <Route path="cbops/:id/"/>
              </Routes>
          </Router>
      </OpcodesProvider>
  );
}

export default App;
