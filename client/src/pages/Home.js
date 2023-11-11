import React from "react";
import Section from "../components/UI/Section";
import apiConfig from "../config/api.config";
import SubjectList from "../components/subject/SubjectList";
import useFetchData from "../hooks/useFetchData";
import CategoryList from "../components/category/CategoryList";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { authenticated } = useAuth();
  const publicSubjects = useFetchData(
    apiConfig.subjectRoutes.getSubjectsListByStatus(1),
  );
  const privateSubjects = useFetchData(
    apiConfig.subjectRoutes.getSubjectsListByStatus(0),
  );

  const usersSubjects = useFetchData(apiConfig.userRoutes.getUsersSubjects);

  const categories = useFetchData(apiConfig.categoryRoutes.getCategoryList);
  return (
    <Section>
      <CategoryList categories={categories.data} />
      {authenticated && usersSubjects.data?.length > 0 && (
        <SubjectList subjects={usersSubjects.data} text={"moje predmety"} />
      )}
      <SubjectList subjects={publicSubjects.data} text={"verejné predmety"} />
      <SubjectList subjects={privateSubjects.data} text={"súkromné predmety"} />
    </Section>
  );
};

export default Home;
