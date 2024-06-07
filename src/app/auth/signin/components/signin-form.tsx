"use client";
import BaseForm from "../../components/base-form";
import { useForm } from "react-hook-form";
import { TSignupFormState } from "@/lib/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ToastContext } from "@/components/providers/toast-provider";

const SigninForm = () => {
  const toast = useContext(ToastContext);
  const router = useRouter();
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TSignupFormState>({ defaultValues });

  const onSubmit = async (data: TSignupFormState) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/boards");
      return;
    }

    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Failed to signin this user",
      life: 3000,
    });
  };

  return (
    <BaseForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default SigninForm;
