
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import RoleList from "./components/RoleList";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/users">Users</Link> | <Link to="/roles">Roles</Link>
        </nav>
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/roles" element={<RoleList />} />
        </Routes>
      </div>
    </Router>
  );
}
