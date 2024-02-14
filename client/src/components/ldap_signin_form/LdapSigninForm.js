import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLdapSignInMutation } from "../../api/endpoints/ldapEndpoints";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Label from "../UI/Label";
import ErrorMessage from "../UI/ErrorMessage";

const LdapSigninForm = () => {
  const [ldapSignIn] = useLdapSignInMutation();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const signInForm = useFormik({
    initialValues: {
      ldap_login: "",
      password: "",
    },
    validationSchema: Yup.object({
      ldap_login: Yup.string().required("ldap is required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: async (values) => {
      const result = await ldapSignIn(values);
      if (result.error) {
        setErrorMessage("incorrect credentials");
      } else {
        navigate(from, { replace: true });
      }
    },
  });

  return (
    <div className="mx-auto flex w-[40rem] max-w-full flex-col items-center px-[2.4rem] py-[2rem] sm:py-[4.5rem]">
      <h2>Prihlásenie</h2>
      {errorMessage && (
        <div className=" min-w-[18rem] max-w-[60rem] border border-red-500">
          <p className="px-1 py-2 font-medium text-red-500">{errorMessage}</p>
        </div>
      )}
      <form
        className="mt-3 flex flex-col gap-2"
        onSubmit={signInForm.handleSubmit}
      >
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <Label text="ldap" required={false} />
          <Input
            type="text"
            name="ldap_login"
            value={signInForm.values.ldap_login}
            className={`border border-black px-1 py-3 outline-none ${
              signInForm.touched.ldap_login && signInForm.errors.ldap_login
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={"váš ldap"}
            onBlur={signInForm.handleBlur}
            onChange={signInForm.handleChange}
          />
          <ErrorMessage
            message={
              signInForm.errors.ldap_login &&
              signInForm.touched.ldap_login &&
              signInForm.errors.ldap_login
            }
          />
        </div>
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <Label text="heslo" required={false} />
          <Input
            type="password"
            name="password"
            value={signInForm.values.password}
            className={`border border-black px-1 py-3 outline-none ${
              signInForm.touched.password && signInForm.errors.password
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={"vaše heslo"}
            onBlur={signInForm.handleBlur}
            onChange={signInForm.handleChange}
          />
          <ErrorMessage
            message={
              signInForm.errors.password &&
              signInForm.touched.password &&
              signInForm.errors.password
            }
          />
        </div>
        <Button
          type="submit"
          className="mt-2 bg-purple-500 p-3 font-medium capitalize text-white"
        >
          prihlásiť
        </Button>
      </form>
    </div>
  );
};

export default LdapSigninForm;
