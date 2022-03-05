import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Film from "./pages/Film";
import Production from "./pages/Production";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='App'>
      <ToastContainer theme='colored' />
      <Router>
        <Routes>
          <Route path='/' element={<Film />} />
          <Route path='/Production' element={<Production />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
