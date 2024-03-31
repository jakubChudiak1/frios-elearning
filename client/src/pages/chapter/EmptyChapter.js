import React from "react";
import Section from "../../components/UI/Section";
import ArrowBack from "../../components/UI/ArrowBack";
import { useParams } from "react-router-dom";
const EmptyChapter = () => {
  const { lang, subject_id } = useParams();
  return (
    <Section>
      <ArrowBack link={`/${lang}/subject/${subject_id}`} showed={"block"} />
    </Section>
  );
};

export default EmptyChapter;
