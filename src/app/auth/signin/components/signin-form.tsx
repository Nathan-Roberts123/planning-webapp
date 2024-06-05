"use client";
import BaseForm from "../../components/base-form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TSignupFormState } from "@/lib/types";

const SigninForm = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TSignupFormState>({ defaultValues });

  return <BaseForm control={control} errors={errors} />;
};

export default SigninForm;
