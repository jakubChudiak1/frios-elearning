import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage";
import Label from "../UI/Label";
import { useSigninMutation } from "../../api/endpoints/authEndpoints";
import { useTranslation } from "react-i18next";

const SignInForm = () => {
  const [signin, { error }] = useSigninMutation();
  const { lang } = useParams();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const signinForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t("signIn.requiredEmail")),
      password: Yup.string().required(t("signIn.requiredPassword")),
    }),
    onSubmit: async (values) => {
      const result = await signin(values);
      if (result.error) {
        setErrorMessage(t("signIn.errorMessage"));
      } else {
        navigate(`/${lang}`);
      }
    },
  });

  return (
    <div className="mx-auto flex w-[40rem] max-w-full flex-col items-center px-[2.4rem] py-[2rem] sm:py-[4.5rem]">
      <h2 className="capitalize">{t("headers.signIn")}</h2>
      {errorMessage && (
        <div className=" min-w-[18rem] max-w-[60rem] border border-red-500 capitalize">
          <p className="px-1 py-2 font-medium text-red-500">{errorMessage}</p>
        </div>
      )}
      <form
        className="mt-3 flex flex-col gap-2"
        onSubmit={signinForm.handleSubmit}
      >
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <Label text={t("signIn.emailLabel")} required={false} />
          <Input
            type="text"
            name="email"
            value={signinForm.values.email}
            className={`border border-black px-1 py-3 outline-none ${
              signinForm.touched.email && signinForm.errors.email
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={t("signIn.emailPlaceholder")}
            onBlur={signinForm.handleBlur}
            onChange={signinForm.handleChange}
          />
          <ErrorMessage
            message={
              signinForm.errors.email &&
              signinForm.touched.email &&
              signinForm.errors.email
            }
          />
        </div>
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <Label text={t("signIn.passwordLabel")} required={false} />
          <Input
            type="password"
            name="password"
            value={signinForm.values.password}
            className={`border border-black px-1 py-3 outline-none ${
              signinForm.touched.password && signinForm.errors.password
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={t("signIn.passwordPlaceholder")}
            onBlur={signinForm.handleBlur}
            onChange={signinForm.handleChange}
          />
          <ErrorMessage
            message={
              signinForm.errors.password &&
              signinForm.touched.password &&
              signinForm.errors.password
            }
          />
        </div>
        <Button
          type="submit"
          className="mt-2 bg-purple-500 p-3 font-medium capitalize text-white"
        >
          {t("signIn.submit")}
        </Button>
      </form>
      <div className="w-max pt-4">
        <p>
          {t("signIn.ldapText")}{" "}
          <Link
            to={`/${lang}/ldap-signin`}
            className="font-semibold text-purple-500"
          >
            {t("signIn.account")}
          </Link>
          ?
        </p>
        <p>
          {t("signIn.signUpText")}{" "}
          <Link
            to={`/${lang}/signup`}
            className="font-semibold text-purple-500"
          >
            {t("signIn.register")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
