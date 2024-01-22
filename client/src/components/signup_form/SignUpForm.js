import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import Label from "../UI/Label";
import { useSignupMutation } from "../../api/endpoints/authEndpoints";

const SignUpForm = () => {
  const [signup] = useSignupMutation();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      surname: Yup.string().required("surname is required"),
      email: Yup.string()
        .email("enter valid email")
        .required("email is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await signup(values);
        signupForm.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="mx-auto flex w-[40rem] max-w-full flex-col items-center px-[2.4rem] py-[1rem] sm:py-[4.5rem]">
      <h2>Registrácia</h2>
      <form
        className="mt-3 flex flex-col gap-2"
        onSubmit={signupForm.handleSubmit}
      >
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <Label text={"meno"} required={true} />
          <Input
            type="text"
            name="name"
            className={`border border-black px-1 py-3 outline-none ${
              signupForm.touched.name && signupForm.errors.name
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={"vaše meno"}
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
          <Label text={"priezvisko"} required={true} />
          <Input
            type="text"
            name="surname"
            className={`border border-black px-1 py-3 outline-none ${
              signupForm.touched.surname && signupForm.errors.surname
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={"vaše priezvisko"}
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
          <Label htmlFor="email" text={"email"} required={true} />
          <Input
            id="email"
            type="text"
            name="email"
            className={`border border-black px-1 py-3 outline-none ${
              signupForm.touched.email && signupForm.errors.email
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={"váš email"}
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
          <Label htmlFor="password" text={"heslo"} required={true} />
          <Input
            id="password"
            type="password"
            name="password"
            className={`border border-black px-1 py-3 outline-none ${
              signupForm.touched.password && signupForm.errors.password
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={"vaše heslo"}
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
          registrovať
        </Button>
      </form>
      <div className="w-max pt-4">
        <p>
          Už máte vytvorený úcet?{" "}
          <Link to={"/signin"} className="font-medium text-purple-500">
            Prihlásiť
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
