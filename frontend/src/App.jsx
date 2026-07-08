import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Public from "./Components/Public";
import Login from "./Features/Auth/Login";
import DashLayout from "./Components/DashLayout";
import Welcome from "./Features/Auth/Welcome";
import NotesList from "./Features/Notes/NotesList";
import UserList from "./Features/Users/UserList";
import EditNote from "./Features/Notes/EditNote";
import EditUser from "./Features/Users/EditUser";
import NewUserForm from "./Features/Users/NewUserForm";
import NewNote from "./Features/Notes/NewNote";
import Prefetch from "./Features/Auth/Prefetch";
import PersistLogin from "./Features/Auth/PersistLogin";
import RequireAuth from "./Features/Auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("TechNotes Repairs");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UserList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>{" "}
              {/* End Routes */}
            </Route>
          </Route>
        </Route>{" "}
        {/* End Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
