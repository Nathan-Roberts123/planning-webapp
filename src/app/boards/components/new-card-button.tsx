"use client";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import Modal from "./modal";
import { useFormState } from "react-dom";
import { createCard } from "../actions";
import { useRef } from "react";
import CardForm from "./forms/card-form";

const NewCardButton = ({ groupId }: { groupId: string }) => {
  const [visible, setVisible] = useState(false);
  const [state, formAction] = useFormState(createCard, { status: "", groupId });
  // const createCardWithId = formAction.bind("groupId", { status: "", groupId });
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.status === "success") {
      setVisible(false);
    }
  }, [state]);

  return (
    <>
      <Modal
        header="Create Card"
        visible={visible}
        onSave={() => {
          if (formRef.current) {
            formRef.current.requestSubmit();
          }
        }}
        onHide={() => setVisible(false)}
      >
        <CardForm formRef={formRef} formAction={formAction} />
      </Modal>
      <button
        onClick={() => setVisible(true)}
        className="hover:bg-gray-200 text-gray-800 font-bold px-2 rounded w-[317px] h-10 flex justify-center items-center border-4 border-dashed mt-4"
      >
        <FaPlus />
      </button>
    </>
  );
};

export default NewCardButton;
