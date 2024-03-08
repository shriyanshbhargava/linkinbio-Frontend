import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
              <Main />
            // </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
