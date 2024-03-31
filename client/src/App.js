import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import MainLayout from "./layout/main_layout/MainLayout";
import ChapterLayout from "./layout/chapter_layout/ChapterLayout";
import WebFont from "webfontloader";
import RequireAccess from "./components/protected_routes/RequireAccess";
import { mainLayoutRoutes } from "./routes/mainLayoutRoutes";
import { chapterLayoutRoutes } from "./routes/chapterLayoutRoutes";
import "react-toastify/dist/ReactToastify.min.css";
import "./assets/css/style.css";
import "./assets/js/script";
import "./assets/css/quill.styles.css";
import "highlight.js/styles/default.css";
import EmptyChapter from "./pages/chapter/EmptyChapter";
const App = () => {
  const location = useLocation();

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
        <Route path="/:lang" element={<MainLayout />}>
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
            path="/:lang/:subject_id/chapter/:chapter_id"
            element={<ChapterLayout />}
          >
            {chapterLayoutRoutes.map((route) => (
              <Route index key={route.id} element={route.element} />
            ))}
          </Route>
        </Route>
        <Route path="/:lang/:subject_id/chapter" element={<ChapterLayout />}>
          <Route index element={<EmptyChapter />} />
        </Route>
        <Route path="/" element={<Navigate to={"/sk"} />} />
        <Route path="*" element={<Navigate to={"/sk"} />} />
      </Routes>
    </>
  );
};

export default App;
