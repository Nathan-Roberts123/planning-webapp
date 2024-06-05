"use client";
import React from "react";
import { Card } from "primereact/card";
import Link from "next/link";
import { Button } from "primereact/button";
import { signIn } from "next-auth/react";

const FormWrapper = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "sign-up" | "sign-in";
}) => {
  return (
    <div className="flex h-full justify-center items-center">
      <Card className="form-demo">
        <div className="flex justify-content-center">
          <div className="card">
            <div className="flex gap-3">
              <Button
                className="w-full py-2 mb-2"
                label="Google"
                icon="pi pi-google"
                onClick={() => signIn("google", { callbackUrl: "/boards" })}
              />
              <Button
                className="w-full py-2 mb-2 p-button-secondary"
                label="Github"
                icon="pi pi-github"
                onClick={() => signIn("github", { callbackUrl: "/boards" })}
              />
            </div>
            <h5 className="text-center mt-2">
              {type === "sign-in"
                ? "Login To Your Account"
                : "Create A New Account"}
            </h5>
            {children}
            <Link
              href={type === "sign-in" ? "/auth/signup" : "/auth/signin"}
              className="flex justify-center text-center mt-4"
            >
              {type === "sign-up" ? "Login" : "Signup"}
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FormWrapper;
