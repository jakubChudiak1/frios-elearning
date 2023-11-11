import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Input from "../UI/Input";
import Button from "../UI/Button";

const SignUpForm = () => {
  const [userSignUp, setUserSignUp] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const signUpHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/signup", userSignUp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex w-[40rem] max-w-full flex-col items-center px-[2.4rem] py-[4.5rem]">
      <h2>Registrácia</h2>
      <form className="mt-3 flex flex-col gap-2" onSubmit={signUpHandler}>
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <label className="font-semibold capitalize">meno</label>
          <Input
            type="text"
            className="border border-black px-1 py-3 outline-none"
            placeholder={"vaše meno"}
            onChange={(event) => {
              setUserSignUp({ ...userSignUp, name: event.target.value });
            }}
          />
        </div>
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <label className="font-semibold capitalize">priezvisko</label>
          <Input
            type="text"
            className="border border-black px-1 py-3 outline-none"
            placeholder={"vaše priezvisko"}
            onChange={(event) => {
              setUserSignUp({ ...userSignUp, surname: event.target.value });
            }}
          />
        </div>
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <label className="font-semibold capitalize">email</label>
          <Input
            type="email"
            className="border border-black px-1 py-3 outline-none"
            placeholder={"váš email"}
            onChange={(event) => {
              setUserSignUp({ ...userSignUp, email: event.target.value });
            }}
          />
        </div>
        <div className="flex w-full min-w-[18rem] max-w-[60rem] flex-col gap-1">
          <label className="font-semibold capitalize">heslo</label>
          <Input
            type="password"
            className="border border-black px-1 py-3 outline-none"
            placeholder={"vaše heslo"}
            onChange={(event) => {
              setUserSignUp({ ...userSignUp, password: event.target.value });
            }}
          />
        </div>
        <Button className="mt-2 bg-purple-500 p-3 font-semibold capitalize text-white">
          registrovať
        </Button>
      </form>
      <div className="pt-4">
        <p>
          Už máte vytvorený úcet?{" "}
          <Link to={"/signin"} className="font-semibold text-purple-500">
            Prihlásiť
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
