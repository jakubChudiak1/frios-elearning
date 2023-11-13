import React, { useState } from "react";
import axios from "axios";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const SignInForm = () => {
  const { setAuthenticated } = useAuth();
  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const signInHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/signin", userSignIn);
      console.log(response);
      if (response.status === 200) {
        setAuthenticated(true);
        setUserSignIn({ email: "", password: "" });
        setErrorMessage(null);
        navigate(from, { replace: true });
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="mx-auto flex w-[40rem] max-w-full flex-col items-center px-[2.4rem] py-[4.5rem]">
      <h2>Prihlásenie</h2>
      {errorMessage && (
        <div className=" min-w-[18rem] max-w-[60rem] border border-red-500">
          <p className="px-1 py-2 font-medium text-red-500">{errorMessage}</p>
        </div>
      )}
      <form className="mt-3 flex flex-col gap-2" onSubmit={signInHandler}>
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <label className="font-semibold capitalize">email</label>
          <Input
            type="email"
            value={userSignIn.email}
            className="border border-black px-1 py-3 outline-none"
            placeholder={"váš email"}
            onChange={(event) => {
              setUserSignIn({ ...userSignIn, email: event.target.value });
            }}
          />
        </div>
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <label className="font-semibold capitalize">heslo</label>
          <Input
            type="password"
            value={userSignIn.password}
            className="border border-black px-1 py-3 outline-none"
            placeholder={"vaše heslo"}
            onChange={(event) => {
              setUserSignIn({ ...userSignIn, password: event.target.value });
            }}
          />
        </div>
        <Button className="mt-2 bg-purple-500 p-3 font-semibold capitalize text-white">
          prihlásiť
        </Button>
      </form>
      <div className="pt-4">
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
