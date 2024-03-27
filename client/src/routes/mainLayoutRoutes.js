import RequireAuth from "../components/protected_routes/RequireAuth";
import RequireNoAuth from "../components/protected_routes/RequireNoAuth";
import RequireRole from "../components/protected_routes/RequireRole";
import CategorySubjects from "../pages/default/CategorySubjects";
import Home from "../pages/default/Home";
import SearchedSubjects from "../pages/default/SearchedSubjects";
import SignIn from "../pages/default/SignIn";
import SignUp from "../pages/default/SignUp";
import Accesses from "../pages/admin/Accesses";
import Subjects from "../pages/admin/Subjects";
import MySubjects from "../pages/user/MySubjects";
import SubjectDetails from "../pages/default/SubjectDetails";
import MyRequests from "../pages/user/MyRequests";
import Requests from "../pages/teacher/Requests";
import LdapSignIn from "../pages/default/LdapSignIn";
import Users from "../pages/admin/Users";

export const mainLayoutRoutes = [
  {
    id: 1,
    index: true,
    element: <Home />,
  },
  {
    id: 2,
    path: "subjects",
    element: <Subjects />,
  },
  {
    id: 3,
    path: "my-subjects",
    element: (
      <RequireAuth>
        <MySubjects />
      </RequireAuth>
    ),
  },
  {
    id: 4,
    path: "signin",
    element: (
      <RequireNoAuth>
        <SignIn />
      </RequireNoAuth>
    ),
  },
  {
    id: 5,
    path: "ldap-signin",
    element: (
      <RequireNoAuth>
        <LdapSignIn />
      </RequireNoAuth>
    ),
  },
  {
    id: 6,
    path: "signup",
    element: (
      <RequireNoAuth>
        <SignUp />
      </RequireNoAuth>
    ),
  },
  {
    id: 7,
    path: "subject/:subject_id",
    element: <SubjectDetails />,
  },
  {
    id: 8,
    path: "subjects/search",
    element: <SearchedSubjects />,
  },
  {
    id: 9,
    path: "subjects/category",
    element: <CategorySubjects />,
  },
  {
    id: 10,
    path: "users",
    element: (
      <RequireRole roles={[1, 2]}>
        <Users />
      </RequireRole>
    ),
  },
  {
    id: 11,
    path: "accesses",
    element: (
      <RequireRole roleId={1}>
        <Accesses />
      </RequireRole>
    ),
  },
  {
    id: 12,
    path: "my-requests",
    element: (
      <RequireAuth>
        <MyRequests />
      </RequireAuth>
    ),
  },
  {
    id: 13,
    path: "requests",
    element: (
      <RequireRole roles={[1, 2]}>
        <Requests />
      </RequireRole>
    ),
  },
];
