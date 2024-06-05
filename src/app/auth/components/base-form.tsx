import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { TSignupFormState } from "@/lib/types";

const BaseForm = ({
  children,
  control,
  errors,
}: {
  children?: React.ReactNode;
  control: Control<TSignupFormState>;
  errors: FieldErrors<TSignupFormState>;
}) => {
  return (
    <form className="p-fluid">
      <div className="field">
        <span className="p-float-label p-input-icon-right">
          <i className="pi pi-envelope" />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <InputText
                id={field.name}
                {...field}
                className={classNames({
                  "p-invalid": fieldState.invalid,
                })}
              />
            )}
          />
          <label
            htmlFor="email"
            className={classNames({ "p-error": !!errors.email })}
          >
            Email*
          </label>
        </span>
      </div>
      <div className="field">
        <span className="p-float-label">
          <Controller
            name="password"
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
            Password*
          </label>
        </span>
      </div>
      {children}
      <Button type="submit" label="Continue With Email" className="mt-2" />
    </form>
  );
};

export default BaseForm;
