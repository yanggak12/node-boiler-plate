import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">랜딩페이지</Link>
          </li>
          <li>
            <Link to="/login">로긴페이지</Link>
          </li>
          <li>
            <Link to="/register">등록페이지</Link>
          </li>
        </ul>
        <hr />

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
