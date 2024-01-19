import React from "react";
import Section from "../../components/UI/Section";
import SubjectList from "../../components/subject/SubjectList";
import CategoryList from "../../components/category/CategoryList";
import { useAuth } from "../../context/authContext";
import { useGetSubjectsByStatusQuery } from "../../api/endpoints/subjectsEndpoints";
import { useGetCategoriesListQuery } from "../../api/endpoints/categoriesEndpoints";
import { useGetUsersSubjectsByStatusQuery } from "../../api/endpoints/accessesEndpoints";

const Home = () => {
  const { authenticated } = useAuth();
  const { data: publicSubjects } = useGetSubjectsByStatusQuery(1);
  const { data: privateSubjects } = useGetSubjectsByStatusQuery(0);
  const { data: categories } = useGetCategoriesListQuery();
  const { data: usersSubjects } = useGetUsersSubjectsByStatusQuery("accepted");
  return (
    <Section>
      <CategoryList categories={categories} />
      {authenticated && usersSubjects?.length > 0 && (
        <div>
          <SubjectList subjects={usersSubjects} text={"moje predmety"} />
        </div>
      )}
      <SubjectList subjects={publicSubjects} text={"verejné predmety"} />
      <SubjectList subjects={privateSubjects} text={"súkromné predmety"} />
    </Section>
  );
};

export default Home;
