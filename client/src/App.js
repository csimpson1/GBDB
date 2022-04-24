import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./components/globalstyles/GlobalStyles"
import { OpcodesProvider } from "./contexts/opcodes/OpcodesContext";
import TestOpcodeCardSmall from "./components/opcodeCard/opcodeCardSmall/TestOpcodeCardSmall";
import OpcodeGrid from "./components/opcodeGrid/OpcodeGrid";

function App() {
  return (
      <OpcodesProvider>
        <Router>
          <GlobalStyles />
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
