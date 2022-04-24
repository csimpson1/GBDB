import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./components/globalstyles/GlobalStyles"
import { OpcodesProvider } from "./contexts/opcodes/OpcodesContext";
import TestOpcodeCardSmall from "./components/opcodeCard/opcodeCardSmall/TestOpcodeCardSmall";
function App() {
  return (
      <div>
        <Router>
            <Routes>
              <Route path="/" element={<TestOpcodeCardSmall/>}/>
              <Route path="/help"/>
              <Route path="/ops"/>
              <Route path="/ops/:id"/>
              <Route path="/cbops"/>
              <Route path="cbops/:id/"/>
            </Routes>
            
        </Router>
      </div>
  );
}

export default App;
