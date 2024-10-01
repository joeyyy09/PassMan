import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import AddPassword from "./pages/addPassword";
import PrivateKey from "./pages/privateKey";
import Signin from "./pages/signin";
import SignUp from "./pages/signup";
import AllPasswords from "./pages/allPassword";
import { useEffect, useState } from "react";
// import ProtectedRoute from "./utils/ProtectedRoutes";
import EditPassword from "./pages/editPassword";
import LandingPage from "./pages/landingPage";

function App() {
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setLoading(false);
    }, 3000);
  }

  const [accessToken, setAccessToken] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  useEffect(() => {
    setAccessToken(sessionStorage.getItem("access"));
  }, []);
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route
            path="/signin"
            element={<Signin setAccessToken={setAccessToken} />}
          />
          <Route
            path="/signup"
            element={
              <SignUp
                setAccessToken={setAccessToken}
                setPrivateKey={setPrivateKey}
                privateKey={privateKey}
              />
            }
          />
          <Route
            path="/home"
            element={
              // <ProtectedRoute>
                <Home />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/privateKey"
            element={
              // <ProtectedRoute>
                <PrivateKey
                  setPrivateKey={setPrivateKey}
                  privateKey={privateKey}
                />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/addPassword"
            element={
              // <ProtectedRoute>
                <AddPassword />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/editPassword"
            element={
              // <ProtectedRoute>
                <EditPassword privateKey={privateKey} />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/allPasswords"
            element={
              // <ProtectedRoute>
                <AllPasswords privateKey={privateKey} />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
