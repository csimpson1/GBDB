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
import FilterOptions from "./components/filter_v2/FilterOptions";

function App() {
  return (
      <OpcodesProvider>
          <Router>
            <GlobalStyles />
            <FilterProvider>
              <FilterOptions/>
            </FilterProvider>
              <Routes>
                <Route path="/" element={<OpcodeGrid/>}/>
                <Route path="/help"/>
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
