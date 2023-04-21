import Signup from "./components/authentication/Signup";
import Profile from "./components/authentication/Profile";
import ForgotPassword from "./components/authentication/ForgotPassword";
import UpdateProfile from "./components/authentication/UpdateProfile";
import Login from "./components/authentication/Login";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/google-drive/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Drive clone */}
          <Route exact path="/" Component={Dashboard}/>
          <Route path="/folder/:folderId" Component={Dashboard}/>

          {/* Profile */}
          <Route path="/user" Component={Profile} />
          <Route path="/update-profile" Component={UpdateProfile} />
          {/* Authentication */}
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
          <Route path="/forgot-password" Component={ForgotPassword} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
