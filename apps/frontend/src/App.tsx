import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Landing from "./pages/Landing/Landing";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route index element={<Landing />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
