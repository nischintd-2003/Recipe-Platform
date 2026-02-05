import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar isLoggedIn={true} />
    </div>
  );
}

export default App;
