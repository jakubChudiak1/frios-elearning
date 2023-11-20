import React from "react";
import Section from "../components/UI/Section";
import apiConfig from "../config/api.config";
import SubjectList from "../components/subject/SubjectList";
import useFetchData from "../hooks/useFetchData";
import CategoryList from "../components/category/CategoryList";
import { useAuth } from "../context/authContext";
import { useGetSubjectsByStatusQuery } from "../api/endpoints/subjectsEndpoints";
import { useGetCategoriesListQuery } from "../api/endpoints/categoriesEndpoints";
import { useGetUsersSubjectsQuery } from "../api/endpoints/usersEndpoints";

const Home = () => {
  const { authenticated } = useAuth();
  const { data: publicSubjects } = useGetSubjectsByStatusQuery(1);
  const { data: privateSubjects } = useGetSubjectsByStatusQuery(0);
  const { data: categories } = useGetCategoriesListQuery();
  const { data: usersSubjects } = useGetUsersSubjectsQuery();

  return (
    <Section>
      <CategoryList categories={categories} />
      {authenticated && (
        <SubjectList subjects={usersSubjects} text={"moje predmety"} />
      )}
      <SubjectList subjects={publicSubjects} text={"verejné predmety"} />
      <SubjectList subjects={privateSubjects} text={"súkromné predmety"} />
    </Section>
  );
};

export default Home;
