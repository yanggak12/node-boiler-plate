import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  // Auth option
  // null -> 누구나 접근 가능
  // true -> 로그인 한 유저만 접근 가능
  // false -> 로그인 한 유저는 접근 불가능
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Auth SpecificComponent={LandingPage} option={null} />}
        />
        <Route
          path="/login"
          element={<Auth SpecificComponent={LoginPage} option={false} />}
        />
        <Route
          path="/register"
          element={<Auth SpecificComponent={RegisterPage} option={false} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
