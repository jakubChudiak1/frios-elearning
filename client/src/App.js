import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "./context/authContext";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/main_layout/MainLayout";
import ChapterLayout from "./layout/chapter_layout/ChapterLayout";
import { useLocation } from "react-router-dom";
import WebFont from "webfontloader";
import { useAddSubjectMutation } from "./api/endpoints/subjectsEndpoints";
import RequireAccess from "./components/protected_routes/RequireAccess";
import { mainLayoutRoutes } from "./routes/mainLayoutRoutes";
import "react-toastify/dist/ReactToastify.min.css";
import "./assets/css/style.css";
import "./assets/js/script";
import { chapterLayoutRoutes } from "./routes/chapterLayoutRoutes";

const App = () => {
  const [addSubject] = useAddSubjectMutation();
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
    addSubject(formData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins:400"],
      },
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {mainLayoutRoutes.map((route) =>
            route.index ? (
              <Route index key={route.id} element={route.element} />
            ) : (
              <Route path={route.path} key={route.id} element={route.element} />
            ),
          )}
        </Route>

        <Route element={<RequireAccess />}>
          <Route
            path="/:subject_id/chapter/:chapter_id"
            element={<ChapterLayout />}
          >
            {chapterLayoutRoutes.map((route) => (
              <Route index key={route.id} element={route.element} />
            ))}
          </Route>
        </Route>
      </Routes>

      {/*   <div>
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
