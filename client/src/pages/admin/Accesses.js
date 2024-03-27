import React from "react";
import Section from "../../components/UI/Section";
import AccessList from "../../components/access/AccessList";
import { useGetAccessesListQuery } from "../../api/endpoints/accessesEndpoints";
import { useAcceptStatusMutation } from "../../api/endpoints/accessesEndpoints";
import { useRejectStatusMutation } from "../../api/endpoints/accessesEndpoints";
import { useTranslation } from "react-i18next";

function Accesses() {
  const { data: accesses } = useGetAccessesListQuery();
  const [acceptStatus] = useAcceptStatusMutation();
  const [rejectStatus] = useRejectStatusMutation();
  const acceptAccessHandler = async (access_id) => {
    const response = await acceptStatus(access_id);
  };

  const rejectAccessHandler = async (access_id) => {
    const response = await rejectStatus(access_id);
  };
  const { t } = useTranslation();
  return (
    <Section>
      <AccessList
        accessesList={accesses}
        text={"Prístupy"}
        acceptAccessHandler={acceptAccessHandler}
        rejectAccessHandler={rejectAccessHandler}
      />
    </Section>
  );
}

export default Accesses;
