import React from "react";
import Section from "../../components/UI/Section";
import LdapSigninForm from "../../components/ldap_signin_form/LdapSigninForm";

const LdapSignIn = () => {
  return (
    <Section>
      <LdapSigninForm />
    </Section>
  );
};

export default LdapSignIn;
