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
import Users from "../pages/admin/Users";
import MySubjects from "../pages/user/MySubjects";
import SubjectDetails from "../pages/default/SubjectDetails";
import MyRequests from "../pages/user/MyRequests";
import Requests from "../pages/teacher/Requests";

export const mainLayoutRoutes = [
  {
    id: 1,
    index: true,
    element: <Home />,
  },
  {
    id: 2,
    path: "/subjects",
    element: <Subjects />,
  },
  {
    id: 3,
    path: "/my-subjects",
    element: (
      <RequireAuth>
        <MySubjects />
      </RequireAuth>
    ),
  },
  {
    id: 4,
    path: "/signin",
    element: (
      <RequireNoAuth>
        <SignIn />
      </RequireNoAuth>
    ),
  },
  {
    id: 5,
    path: "/signup",
    element: (
      <RequireNoAuth>
        <SignUp />
      </RequireNoAuth>
    ),
  },
  {
    id: 6,
    path: "/subject/:subject_id",
    element: <SubjectDetails />,
  },
  {
    id: 7,
    path: "/subjects/search",
    element: <SearchedSubjects />,
  },
  {
    id: 8,
    path: "/subjects/category",
    element: <CategorySubjects />,
  },
  {
    id: 9,
    path: "/users",
    element: (
      <RequireRole roles={[1, 2]}>
        <Users />
      </RequireRole>
    ),
  },
  {
    id: 10,
    path: "/accesses",
    element: (
      <RequireRole roleId={1}>
        <Accesses />
      </RequireRole>
    ),
  },
  {
    id: 11,
    path: "/my-requests",
    element: (
      <RequireAuth>
        <MyRequests />
      </RequireAuth>
    ),
  },
  {
    id: 12,
    path: "requests",
    element: (
      <RequireRole roles={[1, 2]}>
        <Requests />
      </RequireRole>
    ),
  },
];
