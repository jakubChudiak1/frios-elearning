import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import Label from "../UI/Label";
import { useSignupMutation } from "../../api/endpoints/authEndpoints";
import { useTranslation } from "react-i18next";

const SignUpForm = () => {
  const [signup] = useSignupMutation();
  const [errorMessage, setErrorMessage] = useState();
  const { lang } = useParams();
  const { t } = useTranslation();
  const signupForm = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("signup.requiredName")),
      surname: Yup.string().required(t("signup.requiredSurname")),
      email: Yup.string()
        .email("enter valid email")
        .required(t("signup.requiredEmail")),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required(t("signup.requiredPassword")),
    }),
    onSubmit: async (values) => {
      try {
        const result = await signup(values);
        if (result.error) {
          setErrorMessage(t("signIn.errorMessage"));
        } else {
          signupForm.resetForm();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="mx-auto flex w-[40rem] max-w-full flex-col items-center px-[2.4rem] py-[1rem] sm:py-[4.5rem]">
      <h2 className="capitalize">{t("headers.signUp")}</h2>
      {errorMessage && (
        <div className=" min-w-[18rem] max-w-[60rem] border border-red-500 capitalize">
          <p className="px-1 py-2 font-medium text-red-500">{errorMessage}</p>
        </div>
      )}
      <form
        className="mt-3 flex flex-col gap-2"
        onSubmit={signupForm.handleSubmit}
      >
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <Label text={t("signup.nameLable")} required={true} />
          <Input
            type="text"
            name="name"
            className={`border border-black px-1 py-3 outline-none ${
              signupForm.touched.name && signupForm.errors.name
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={t("signup.namePlaceholder")}
            value={signupForm.values.name}
            onBlur={signupForm.handleBlur}
            onChange={signupForm.handleChange}
          />
          <ErrorMessage
            message={
              signupForm.errors.name &&
              signupForm.touched.name &&
              signupForm.errors.name
            }
          />
        </div>
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <Label text={t("signup.surnameLable")} required={true} />
          <Input
            type="text"
            name="surname"
            className={`border border-black px-1 py-3 outline-none ${
              signupForm.touched.surname && signupForm.errors.surname
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={t("signup.surnamePlaceholder")}
            value={signupForm.values.surname}
            onBlur={signupForm.handleBlur}
            onChange={signupForm.handleChange}
          />
          <ErrorMessage
            message={
              signupForm.errors.surname &&
              signupForm.touched.surname &&
              signupForm.errors.surname
            }
          />
        </div>
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <Label
            htmlFor="email"
            text={t("signup.emailLable")}
            required={true}
          />
          <Input
            id="email"
            type="text"
            name="email"
            className={`border border-black px-1 py-3 outline-none ${
              signupForm.touched.email && signupForm.errors.email
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={t("signup.emailPlaceholder")}
            value={signupForm.values.email}
            onBlur={signupForm.handleBlur}
            onChange={signupForm.handleChange}
          />
          <ErrorMessage
            message={
              signupForm.errors.email &&
              signupForm.touched.email &&
              signupForm.errors.email
            }
          />
        </div>
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <Label
            htmlFor="password"
            text={t("signup.passwordLable")}
            required={true}
          />
          <Input
            id="password"
            type="password"
            name="password"
            className={`border border-black px-1 py-3 outline-none ${
              signupForm.touched.password && signupForm.errors.password
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={t("signup.passwordPlaceholder")}
            value={signupForm.values.password}
            onBlur={signupForm.handleBlur}
            onChange={signupForm.handleChange}
          />
          <ErrorMessage
            message={
              signupForm.errors.password &&
              signupForm.touched.password &&
              signupForm.errors.password
            }
          />
        </div>
        <Button
          type="submit"
          className="mt-2 bg-purple-500 p-3 font-semibold capitalize text-white"
        >
          {t("signup.submit")}
        </Button>
      </form>
      <div className="w-max pt-4">
        <p>
          {t("signup.existsAccount")}{" "}
          <Link to={`/${lang}/signin`} className="font-medium text-purple-500">
            {t("signup.signIn")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
