"use client";
import React from "react";
import FormWrapper from "../components/form-wrapper";
import SignupForm from "./components/signup-form";

const Signup = () => {
  return (
    <FormWrapper type="sign-up">
      <SignupForm />
    </FormWrapper>
  );
};

export default Signup;
