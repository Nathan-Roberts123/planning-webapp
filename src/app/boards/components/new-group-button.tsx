"use client";
import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Modal from "./modal";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { createGroup } from "../actions";
import { FaPlus } from "react-icons/fa6";

const NewGroupButton = () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, formAction] = useFormState(createGroup, { status: "" });

  useEffect(() => {
    if (state.status === "success") {
      setVisible(false);
    }
  }, [state]);

  return (
    <>
      <Modal
        header="Create Group"
        visible={visible}
        onHide={() => setVisible(false)}
        onSave={() => {
          if (formRef.current) {
            formRef.current.requestSubmit();
          }
        }}
      >
        <h5 className="font-bold mb-2">Group Name</h5>
        <form ref={formRef} action={formAction}>
          <InputText className="w-full" name="group_name" />
        </form>
      </Modal>
      <button
        onClick={() => setVisible(true)}
        className="hover:bg-gray-200 text-gray-800 font-bold px-2 rounded w-[317px] h-24 flex justify-center items-center border-4 border-dashed"
      >
        <FaPlus />
      </button>
    </>
  );
};

export default NewGroupButton;
