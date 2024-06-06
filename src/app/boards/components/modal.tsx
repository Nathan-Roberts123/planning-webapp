import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

type ModalProps = {
  visible: boolean;
  onHide: () => void;
  children: React.ReactNode;
  onSave: () => void;
  header: string;
};

const Modal = ({ visible, onHide, children, onSave, header }: ModalProps) => {
  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide()}
          className="p-button-text"
        />
        <Button
          label="Create"
          icon="pi pi-check"
          onClick={onSave}
          autoFocus
          type="submit"
        />
      </div>
    );
  };
  return (
    <Dialog
      className="w-48"
      visible={visible}
      onHide={onHide}
      breakpoints={{ "960px": "75vw", "640px": "100vw" }}
      style={{ width: "50vw" }}
      header={header}
      footer={renderFooter()}
      draggable={false}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
