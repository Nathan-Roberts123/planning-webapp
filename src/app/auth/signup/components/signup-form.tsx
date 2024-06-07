"use client";
import React, { useContext } from "react";
import BaseForm from "../../components/base-form";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { TSignupFormState } from "@/lib/types";
import { createUser } from "../../action";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { ToastContext } from "@/components/providers/toast-provider";

const SignupForm = () => {
  const router = useRouter();
  const toast = useContext(ToastContext);
  const [state, formAction] = useFormState(createUser, {
    success: null,
    errors: null,
  });

  const defaultValues = {
    email: "",
    password: "",
    confirm_password: "",
  };

  if (state.success) {
    if (toast.current) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Successfully Create Account",
        life: 3000,
      });
      router.push("/auth/signin");
    }
  }

  if (state.success === false) {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error While Creating An Account",
      life: 3000,
    });
  }

  const { control } = useForm<TSignupFormState>({ defaultValues });

  return (
    <>
      <BaseForm action={formAction} control={control} errors={state.errors}>
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="confirm_password"
              control={control}
              render={({ field }) => (
                <Password
                  id={field.name}
                  {...field}
                  feedback={false}
                  className={classNames({
                    "p-invalid": state.errors
                      ? state.errors.confirm_password
                      : false,
                  })}
                />
              )}
            />
            <label
              htmlFor="password"
              className={classNames({
                "p-error": state.errors?.confirm_password,
              })}
            >
              Confirm Password
            </label>
          </span>
        </div>
      </BaseForm>
    </>
  );
};

export default SignupForm;
