import React from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";

const CardForm = ({
  formAction,
  formRef,
}: {
  formAction: (payload: FormData) => void;
  formRef: React.MutableRefObject<HTMLFormElement | null>;
}) => {
  return (
    <form action={formAction} ref={formRef}>
      <div>
        <span className="">Title</span>
        <InputText className="w-full" name="title" />
      </div>
      <div className="mt-3">
        <span className="">Description</span>
        <InputTextarea
          rows={3}
          cols={30}
          className="w-full"
          name="description"
          autoResize
        />
      </div>
    </form>
  );
};

export default CardForm;
