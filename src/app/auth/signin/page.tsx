"use client";
import React from "react";
import FormWrapper from "../components/wrapper";
import SigninForm from "./components/signin-form";

export const Signin = () => {
  return (
    <FormWrapper type="sign-in">
      <SigninForm />
    </FormWrapper>
  );
};

export default Signin;
