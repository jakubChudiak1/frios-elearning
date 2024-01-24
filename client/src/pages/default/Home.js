import React from "react";
import Section from "../../components/UI/Section";
import SubjectList from "../../components/subject/SubjectList";
import CategoryList from "../../components/category/CategoryList";
import { useAuth } from "../../context/authContext";
import { useGetSubjectsByStatusQuery } from "../../api/endpoints/subjectsEndpoints";
import { useGetCategoriesListQuery } from "../../api/endpoints/categoriesEndpoints";
import { useGetUsersSubjectsByStatusQuery } from "../../api/endpoints/accessesEndpoints";
import AddSubjectModal from "../../components/modals/AddSubjectModal";
import AddSubjectButton from "../../components/subject/AddSubjectButton";
import { useSelector } from "react-redux";

const Home = () => {
  const { editModeState } = useSelector((state) => state.editModeState);
  console.log(editModeState);
  const { authenticated } = useAuth();
  const { data: publicSubjects } = useGetSubjectsByStatusQuery(1);
  const { data: privateSubjects } = useGetSubjectsByStatusQuery(0);
  const { data: categories } = useGetCategoriesListQuery();
  const { data: usersSubjects } = useGetUsersSubjectsByStatusQuery("accepted");

  return (
    <Section>
      {editModeState && <AddSubjectButton />}
      <CategoryList categories={categories} />
      {authenticated && usersSubjects?.length > 0 && (
        <div>
          <SubjectList subjects={usersSubjects} text={"moje predmety"} />
        </div>
      )}
      {publicSubjects && (
        <SubjectList subjects={publicSubjects} text={"verejné predmety"} />
      )}
      {privateSubjects && (
        <SubjectList subjects={privateSubjects} text={"súkromné predmety"} />
      )}
    </Section>
  );
};

export default Home;
