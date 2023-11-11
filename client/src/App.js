import React, { useEffect, useState } from "react";
//a
import "react-quill/dist/quill.snow.css";
import { useAuth } from "./context/authContext";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Subjects from "./pages/admin/Subjects";
import SignIn from "./pages/SignIn";
import MainLayout from "./layout/MainLayout";
import useFetchData from "./hooks/useFetchData";
import apiConfig from "./config/api.config";
import SignUp from "./pages/SignUp";
import "./assets/css/style.css";
import "./assets/js/script";
import SearchedSubjects from "./pages/SearchedSubjects";
import SubjectDetails from "./pages/subject-details/SubjectDetails";
import ChapterLayout from "./layout/chapter_layout/ChapterLayout";
import Chapter from "./pages/chapter/Chapter";
import MySubjects from "./pages/my-subjects/MySubjects";
import CategorySubjects from "./pages/CategorySubjects";
import Users from "./pages/admin/Users";
import RequireAuth from "./components/protected_pages/RequireAuth";
import Accesses from "./pages/admin/Accesses";
import { useLocation } from "react-router-dom";
//https://www.pinterest.com/pin/103723597655113179/visual-search/?x=16&y=16&w=532&h=391
//https://dribbble.com/shots/19871655-Core-Developer-programming-learning-platform
const App = () => {
  const { user, authenticated, setAuthenticated } = useAuth();
  const location = useLocation();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [subjectData, setSubjectData] = useState({
    category_id: "",
    subject_code: "",
    name: "",
    is_public: false,
    image_path: "",
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const refetch = useFetchData(
    apiConfig.subjectRoutes.getSubjectsListByStatus(0),
  );
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_id", subjectData.category_id);
    formData.append("subject_code", subjectData.subject_code);
    formData.append("name", subjectData.name);
    formData.append("is_public", subjectData.is_public ? 1 : 0);

    if (file) {
      formData.append("upload", file);
    }

    try {
      const response = await fetch("/subjects/add-subject", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        await refetch.refetch();
        console.log(refetch);

        console.log("Subject created successfully");
      } else {
        console.error("Subject creation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route element={<Subjects />} path="/subjects" />
          <Route element={<MySubjects />} path="/my-subjects" />
          <Route element={<SignIn />} path="/signin" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<SubjectDetails />} path="/subject/:subject_id" />
          <Route element={<SearchedSubjects />} path="/subjects/search" />
          <Route element={<CategorySubjects />} path="/subjects/category" />
          <Route element={<Users />} path="/users" />
          <Route element={<Accesses />} path="/accesses" />
        </Route>
        <Route element={<RequireAuth />}>
          <Route
            path="/:subject_id/chapter/:chapter_id"
            element={<ChapterLayout />}
          >
            <Route index element={<Chapter />} />
          </Route>
        </Route>
      </Routes>

      {/* <div>
        <h1>Create a Subject</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Category ID:</label>
            <input
              type="number"
              value={subjectData.category_id}
              onChange={(e) =>
                setSubjectData({ ...subjectData, category_id: e.target.value })
              }
            />
          </div>
          <div>
            <label>Subject Code:</label>
            <input
              type="text"
              value={subjectData.subject_code}
              onChange={(e) =>
                setSubjectData({ ...subjectData, subject_code: e.target.value })
              }
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={subjectData.name}
              onChange={(e) =>
                setSubjectData({ ...subjectData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label>Is Public:</label>
            <input
              type="checkbox"
              checked={subjectData.is_public}
              onChange={(e) =>
                setSubjectData({ ...subjectData, is_public: e.target.checked })
              }
            />
          </div>
          <div>
            <label>Upload Image:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div>
            <button type="submit">Create Subject</button>
          </div>
        </form>
      </div> */}
    </>
  );
};

export default App;
