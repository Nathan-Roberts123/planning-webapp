"use client";
import React from "react";
import FormWrapper from "../components/form-wrapper";
import SigninForm from "./components/signin-form";

const Signin = () => {
  return (
    <FormWrapper type="sign-in">
      <SigninForm />
    </FormWrapper>
  );
};

export default Signin;
