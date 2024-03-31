import Chapter from "../pages/chapter/Chapter";
export const chapterLayoutRoutes = [
  {
    id: 1,
    index: true,
    path: ":subject_id/chapter/:chapter_id",
    element: <Chapter />,
  },
];
