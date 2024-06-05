"use client";
import React, { useState } from "react";
import BaseForm from "../../components/base-form";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { TSignupFormState } from "@/lib/types";

const SignupForm = () => {
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
  } = useForm<TSignupFormState>();
  return (
    <BaseForm control={control} errors={errors}>
      <div className="field">
        <span className="p-float-label">
          <Controller
            name="confirm_password"
            control={control}
            render={({ field, fieldState }) => (
              <Password
                id={field.name}
                {...field}
                feedback={false}
                className={classNames({
                  "p-invalid": fieldState.invalid,
                })}
              />
            )}
          />
          <label
            htmlFor="password"
            className={classNames({ "p-error": errors.password })}
          >
            Confirm Password
          </label>
        </span>
      </div>
    </BaseForm>
  );
};

export default SignupForm;
