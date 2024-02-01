import React from "react";
import Section from "../../components/UI/Section";
import SubjectList from "../../components/subject/SubjectList";
import CategoryList from "../../components/category/CategoryList";
import { useAuth } from "../../context/authContext";
import { useGetSubjectsByStatusQuery } from "../../api/endpoints/subjectsEndpoints";
import { useGetCategoriesListQuery } from "../../api/endpoints/categoriesEndpoints";
import {
  useGetEditableSubjectsQuery,
  useGetUsersSubjectsByStatusQuery,
} from "../../api/endpoints/accessesEndpoints";
import AddSubjectButton from "../../components/subject/AddSubjectButton";
import { useSelector } from "react-redux";

const Home = () => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const { authenticated } = useAuth();
  const { data: publicSubjects } = useGetSubjectsByStatusQuery(1);
  const { data: privateSubjects } = useGetSubjectsByStatusQuery(0);
  const { data: categories } = useGetCategoriesListQuery();
  const { data: usersSubjects } = useGetUsersSubjectsByStatusQuery("accepted");
  const { data: editableSubjects } = useGetEditableSubjectsQuery(undefined, {
    skip: !editModeState,
  });

  return (
    <Section>
      {editModeState && <AddSubjectButton />}
      <CategoryList categories={categories} />
      {editModeState && editableSubjects?.length > 0 && (
        <SubjectList
          subjects={editableSubjects}
          text={"upravitelné predmety"}
          editable={true}
        />
      )}

      {authenticated && usersSubjects?.length > 0 && (
        <SubjectList subjects={usersSubjects} text={"moje predmety"} />
      )}
      {publicSubjects?.length > 0 && (
        <SubjectList subjects={publicSubjects} text={"verejné predmety"} />
      )}
      {privateSubjects?.length > 0 && (
        <SubjectList subjects={privateSubjects} text={"súkromné predmety"} />
      )}
    </Section>
  );
};

export default Home;
