"use client";
import BaseForm from "../../components/base-form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";

const SigninForm = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const defaultValues = {
    email: "",
    password: "",
    confirm_password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  return <BaseForm control={control} errors={errors} />;
};

export default SigninForm;
