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
import { useTranslation } from "react-i18next";

const Home = () => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const { authenticated } = useAuth();
  const { data: publicSubjects } = useGetSubjectsByStatusQuery(1);
  const { data: privateSubjects } = useGetSubjectsByStatusQuery(0);
  const { data: categories } = useGetCategoriesListQuery();
  const { data: usersSubjects } = useGetUsersSubjectsByStatusQuery("accepted", {
    skip: !authenticated,
  });
  const { data: editableSubjects } = useGetEditableSubjectsQuery(undefined, {
    skip: !editModeState,
  });
  const { t } = useTranslation();
  return (
    <Section>
      {editModeState && <AddSubjectButton />}
      <CategoryList categories={categories} />
      {editModeState && editableSubjects?.length > 0 && (
        <SubjectList
          subjects={editableSubjects}
          text={t("headers.editableSubjects")}
          editable={true}
        />
      )}

      {authenticated && usersSubjects?.length > 0 && (
        <SubjectList subjects={usersSubjects} text={t("headers.mySubjects")} />
      )}
      {publicSubjects?.length > 0 && (
        <SubjectList
          subjects={publicSubjects}
          text={t("headers.publicSubjects")}
        />
      )}
      {privateSubjects?.length > 0 && (
        <SubjectList
          subjects={privateSubjects}
          text={t("headers.privateSubjects")}
        />
      )}
    </Section>
  );
};

export default Home;
