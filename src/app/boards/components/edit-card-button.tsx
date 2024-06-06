"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Modal from "./modal";

const EditCardButton = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Modal
        header="Edit Card"
        visible={visible}
        onHide={() => setVisible(false)}
        onSave={() => console.log("s")}
      >
        This
      </Modal>
      <button className="hover:bg-gray-200 text-gray-800 font-bold py-2 px-2 rounded h-fit">
        <FiEdit />
      </button>
    </>
  );
};

export default EditCardButton;
