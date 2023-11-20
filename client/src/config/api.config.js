const subjectRoutes = {
  getSubjectsList: "/subjects",
  getSubjectsListByStatus: (is_public) =>
    `/subjects/status?is_public=${is_public}`,

  getSubjectById: (subject_id) => `/subjects/${subject_id}`,
  getSubjectByName: "/subjects/name",
  getSubjectByCreator: (user_id, subject_id) =>
    `/subjects/creator?user_id=${user_id}&subject_id=${subject_id}`,
  getSubjectsByCategory: (category_name) =>
    `/subjects/category?category_name=${category_name}`,
  getRecommendedSubjects: (category_name, subject_id) =>
    `/subjects/recommended?category_name=${category_name}&subject_id=${subject_id}`,
  getSubjectsByString: (str) => `/subjects/search?q=${str}`,
  addSubject: "/subjects/add-subject",
  updateSubject: (subject_id) => `/subjects/update-subject/${subject_id}`,
  removeSubject: (subject_id) => `/subjects/delete-subject/${subject_id}`,
};

const userRoutes = {
  getUserList: "/users",
  getUsersSubjects: "/accesses/users-subjects",
};

const categoryRoutes = {
  getCategoryList: "/categories",
};

const chapterRoutes = {
  getSubjectChapters: (subject_id) => `/chapters/${subject_id}`,
  getChaptersContent: (subject_id, chapter_id) =>
    `/chapters/${subject_id}/chapter/${chapter_id}`,
};

const accessRoutes = {
  getAccessList: "/accesses",
  getAccessStatus: (subject_id) => `/accesses/access-status/${subject_id}`,
  acceptStatus: (access_id) => `/accesses/accept-status/${access_id}`,
  rejectStatus: (access_id) => `/accesses/reject-status/${access_id}`,
};

const images = {
  subjectImage: (imagePath) => `http://localhost:8080/images/${imagePath}`,
};

const apiConfig = {
  images,
  userRoutes,
  subjectRoutes,
  categoryRoutes,
  chapterRoutes,
  accessRoutes,
};

export default apiConfig;
