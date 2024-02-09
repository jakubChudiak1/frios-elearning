import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage";
import Label from "../UI/Label";
import { useSigninMutation } from "../../api/endpoints/authEndpoints";

const SignInForm = () => {
  const [signin, { error }] = useSigninMutation();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const signinForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("email is required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: async (values) => {
      const result = await signin(values);
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
        onSubmit={signinForm.handleSubmit}
      >
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <Label text="email" required={false} />
          <Input
            type="text"
            name="email"
            value={signinForm.values.email}
            className={`border border-black px-1 py-3 outline-none ${
              signinForm.touched.email && signinForm.errors.email
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={"váš email"}
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
          <Label text="heslo" required={false} />
          <Input
            type="password"
            name="password"
            value={signinForm.values.password}
            className={`border border-black px-1 py-3 outline-none ${
              signinForm.touched.password && signinForm.errors.password
                ? "border-red-500"
                : "border-black"
            }`}
            placeholder={"vaše heslo"}
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
          prihlásiť
        </Button>
      </form>
      <div className="w-max pt-4">
        <p>
          Nemáte ešte vytvorený úcet?{" "}
          <Link to={"/signup"} className="font-semibold text-purple-500">
            Registrovať
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
