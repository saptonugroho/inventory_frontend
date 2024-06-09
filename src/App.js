import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Users from "./components/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/dashboard" element={<><Navbar/> <Home/></>} />
        <Route exact path="/user" element={<><Navbar/> <User/></>} />
        <Route exact path="/home" element={ <Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
