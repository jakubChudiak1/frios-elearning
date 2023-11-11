import React from "react";
import apiConfig from "../../config/api.config";
import useFetchData from "../../hooks/useFetchData";
import Section from "../../components/UI/Section";
import AccessList from "../../components/access/AccessList";
import axios from "axios";

function Accesses() {
  const accesses = useFetchData(apiConfig.accessRoutes.getAccessList);

  const acceptAccessHandler = async (access_id) => {
    try {
      const response = await axios.patch(
        apiConfig.accessRoutes.acceptStatus(access_id),
      );
      await accesses.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectAccessHandler = async (access_id) => {
    try {
      const response = await axios.patch(
        apiConfig.accessRoutes.rejectStatus(access_id),
      );
      await accesses.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Section>
      <AccessList
        accessesList={accesses.data}
        text={"Prístupy"}
        acceptAccessHandler={acceptAccessHandler}
        rejectAccessHandler={rejectAccessHandler}
      />
    </Section>
  );
}

export default Accesses;
